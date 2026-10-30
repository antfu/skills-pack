import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, readdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'

const readme = await readFile('README.md', 'utf8')
const expected = [
  ...readme.matchAll(/^\| \[([^\]]+)\]\(/gm),
].map(m => m[1])
if (!expected.length)
  throw new Error('No skills found in README table')

const dir = await mkdtemp(join(tmpdir(), 'skills-pack-'))
function run(cmd: string, cwd = dir) {
  console.log(`$ ${cmd}`)
  execSync(cmd, { cwd, stdio: 'inherit' })
}

run(`pnpm pack --pack-destination ${dir}`, process.cwd())
const [tarball] = (await readdir(dir)).filter(f => f.endsWith('.tgz'))
const { version } = JSON.parse(await readFile('node_modules/skills/package.json', 'utf8'))

await writeFile(join(dir, 'package.json'), JSON.stringify({ name: 'consumer', private: true }))
run(`npm i -D ./${tarball} skills@${version}`)
run('npx skills experimental_sync -a opencode -y')

const missing = expected.filter(name => !existsSync(join(dir, '.agents/skills', name, 'SKILL.md')))
if (missing.length) {
  console.error(`Missing after install: ${missing.join(', ')}`)
  process.exit(1)
}
console.log(`All ${expected.length} skills installed`)
