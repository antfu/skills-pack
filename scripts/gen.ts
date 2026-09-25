import type { Source } from '../meta'
import { readFile, writeFile } from 'node:fs/promises'
import process from 'node:process'
import { parse as parseYaml } from 'yaml'
import { sources } from '../meta'

const check = process.argv.includes('--check')
const START = '<!-- skills:start -->'
const END = '<!-- skills:end -->'

interface Row {
  category: string
  skill: string
  description: string
  source: string
}

interface UpstreamSkill {
  name: string
  folder: string
  url: string
  description: string
}

function splitSource(source: string) {
  const [owner, repo, ...rest] = source.split('/')
  return { owner, repo, subpath: rest.join('/') }
}

function sourceCell(source: string) {
  const { owner, repo, subpath } = splitSource(source)
  const url = `https://github.com/${owner}/${repo}${subpath ? `/tree/HEAD/${subpath}` : ''}`
  return `[${owner}/${repo}](${url})`
}

function skillName(cell: string) {
  return /\[([^\]]+)\]/.exec(cell)?.[1] ?? cell
}

function escapeCell(text: string) {
  return text.replaceAll('|', '\\|')
}

function summary(text: string) {
  const flat = text.replaceAll(/\s+/g, ' ').replaceAll(' \u2014 ', ' - ').trim()
  let out = ''
  for (const sentence of flat.split(/(?<=[.!?])\s+/)) {
    out += `${sentence} `
    if (out.length >= 40)
      break
  }
  return out.trim()
}

function parseRows(table: string): Row[] {
  return table
    .split('\n')
    .filter(line => line.startsWith('| ') && !line.startsWith('| ---') && !line.startsWith('| Category'))
    .map((line) => {
      const [category, skill, description, source] = line
        .slice(2, -2)
        .split(/(?<!\\) \| /)
      return { category, skill, description, source }
    })
}

function renderTable(rows: Row[]) {
  return [
    '| Category | Skill | Description | Source |',
    '| --- | --- | --- | --- |',
    ...rows.map(r => `| ${r.category} | ${r.skill} | ${r.description} | ${r.source} |`),
  ].join('\n')
}

async function github<T>(path: string): Promise<T> {
  const headers: Record<string, string> = { 'user-agent': 'skills-pack' }
  if (process.env.GITHUB_TOKEN)
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(`https://api.github.com/${path}`, { headers })
  if (!res.ok)
    throw new Error(`GitHub API ${path}: ${res.status} ${res.statusText}`)
  // The GitHub API has no runtime schema here; callers pick only the fields they read.
  return res.json() as Promise<T>
}

/**
 * Mirror how the `skills` CLI discovers skills in a repo: a root `SKILL.md`
 * wins outright; otherwise direct children of the root and anything up to
 * three levels under `skills/`.
 */
function skillPaths(paths: string[], subpath: string) {
  const prefix = subpath ? `${subpath}/` : ''
  if (paths.includes(`${prefix}SKILL.md`))
    return [`${prefix}SKILL.md`]
  const relative = paths
    .filter(p => p.startsWith(prefix) && p.endsWith('/SKILL.md'))
    .map(p => p.slice(prefix.length))
  const depth = (p: string) => p.split('/').length - 1
  return [
    ...relative.filter(p => depth(p) === 1),
    ...relative.filter(p => p.startsWith('skills/') && depth(p) <= 4),
  ].map(p => prefix + p)
}

async function fetchUpstream(source: string): Promise<UpstreamSkill[]> {
  const { owner, repo, subpath } = splitSource(source)
  const tree = await github<{ tree: { path: string }[] }>(`repos/${owner}/${repo}/git/trees/HEAD?recursive=1`)
  const paths = skillPaths(tree.tree.map(e => e.path), subpath)
  const skills = await Promise.all(paths.map(async (path) => {
    const raw = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${path}`).then(r => r.text())
    const frontmatter = /^---\n([\s\S]*?)\n---/.exec(raw)?.[1] ?? ''
    // Frontmatter is free-form YAML; only these two keys matter and both are checked below.
    const { name, description } = parseYaml(frontmatter) as { name?: string, description?: string }
    const folder = path.split('/').at(-2) ?? name ?? ''
    return {
      name: name ?? folder,
      folder,
      url: `https://github.com/${owner}/${repo}/blob/HEAD/${path}`,
      description: summary(description ?? ''),
    }
  }))
  // Same rule as the `skills` CLI: first skill per name wins.
  return [...new Map(skills.toReversed().map(s => [s.name, s])).values()].toReversed()
}

async function rowsFor(source: Source, existing: Map<string, Row>): Promise<Row[]> {
  const sourceCellText = sourceCell(source.source)
  const reuse = (name: string): Row | undefined => {
    const row = existing.get(name)
    return row && { ...row, category: source.category, source: sourceCellText }
  }

  const wanted = source.skills
  const known = wanted
    ? wanted.map(reuse)
    : [...existing.values()].filter(r => r.source === sourceCellText).map(r => reuse(skillName(r.skill)))

  if (check) {
    const missing = wanted?.filter((_, i) => !known[i])
    if (missing?.length)
      throw new Error(`README rows missing for ${source.source}: ${missing.join(', ')}. Run \`pnpm gen\` locally.`)
    return known.filter(r => r !== undefined)
  }

  const upstream = await fetchUpstream(source.source)
  const byName = new Map(upstream.flatMap(s => [[s.name, s], [s.folder, s]] as const))
  const names = wanted ?? upstream.map(s => s.name).sort()
  return names.map((name) => {
    const found = byName.get(name)
    if (!found)
      throw new Error(`Skill "${name}" not found in ${source.source}`)
    return reuse(found.name) ?? reuse(name) ?? {
      category: source.category,
      skill: `[${found.name}](${found.url})`,
      description: escapeCell(found.description),
      source: sourceCellText,
    }
  })
}

async function sync(file: string, next: string) {
  const current = await readFile(file, 'utf8')
  if (current === next)
    return
  if (check)
    throw new Error(`${file} is out of date. Run \`pnpm gen\`.`)
  await writeFile(file, next)
  console.log(`updated ${file}`)
}

const pkgFile = 'package.json'
const pkg = JSON.parse(await readFile(pkgFile, 'utf8'))
pkg.skills = sources.map(s => s.skills ? { source: s.source, skills: s.skills } : s.source)
await sync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`)

const readmeFile = 'README.md'
const readme = await readFile(readmeFile, 'utf8')
const start = readme.indexOf(START) + START.length
const end = readme.indexOf(END)
if (start < START.length || end < 0)
  throw new Error(`${readmeFile} is missing ${START} / ${END} markers`)

const existing = new Map(parseRows(readme.slice(start, end)).map(r => [skillName(r.skill), r]))
const rows: Row[] = []
for (const source of sources)
  rows.push(...await rowsFor(source, existing))

await sync(readmeFile, `${readme.slice(0, start)}\n\n${renderTable(rows)}\n\n${readme.slice(end)}`)
