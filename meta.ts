export interface Source {
  /** Any source the `skills` CLI accepts: `owner/repo`, `owner/repo/sub/path`, ... */
  source: string
  category: string
  /** Skill names to pick; omitted means every skill in the source. */
  skills?: string[]
}

export const sources: Source[] = [
  {
    source: 'mattpocock/skills',
    category: 'Workflow',
    skills: [
      'grill-me',
      'grilling',
      'handoff',
      'to-questionnaire',
      'writing-for-agents',
      'teach',
      'code-review',
      'codebase-design',
      'research',
      'tdd',
    ],
  },
  {
    source: 'shadcn/improve',
    category: 'Workflow',
  },
  {
    source: 'kucherenko/jscpd/skills/dry-refactoring',
    category: 'Workflow',
  },
  {
    source: 'AminBlg/SimpleEnglish',
    category: 'Writing',
  },
  {
    source: 'cursor/plugins/pstack/skills/unslop',
    category: 'Writing',
  },
  {
    source: 'ayghri/i-have-adhd',
    category: 'Writing',
  },
  {
    source: 'antfu/skills',
    category: 'Workflow',
    skills: [
      'antfu',
      'antfu-create-pr',
    ],
  },
  {
    source: 'vuejs-ai/skills',
    category: 'Vue & Nuxt',
    skills: [
      'vue-best-practices',
      'vue-router-best-practices',
      'vue-pinia-best-practices',
      'vue-testing-best-practices',
      'vue-debug-guides',
      'create-adaptable-composable',
    ],
  },
  {
    source: 'onmax/nuxt-skills',
    category: 'Vue & Nuxt',
    skills: [
      'nuxt-modules',
      'nuxt-content',
      'nuxt-i18n',
      'nuxt-seo',
      'comark',
    ],
  },
  {
    source: 'anthropics/skills/skills/frontend-design',
    category: 'Design',
  },
  {
    source: 'vercel-labs/agent-browser',
    category: 'Browser',
  },
]
