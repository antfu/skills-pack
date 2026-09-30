# @antfu/skills

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Anthony's curated agent skills.

A hand-picked set of [agent skills](https://agentskills.io) from across the ecosystem, declared in one npm package so a project gets all of them with a single install. 

Powered by [skills-npm](https://github.com/antfu/skills-npm).

## Setup

Install [skills-npm](https://github.com/antfu/skills-npm) and this pack as dev dependencies, then let skills-npm wire itself into your `prepare` script:

```bash
pnpm i -D skills-npm @antfu/skills
pnpx skills-npm setup
```

`setup` adds `"prepare": "skills-npm"` to your `package.json` and runs the first sync. From then on every `npm install` keeps the skills in sync. It would looks like this

```json
{
  "scripts": {
    "prepare": "skills-npm"
  },
  "devDependencies": {
    "skills-npm": "^4.0.0",
    "@antfu/skills": "^1.0.0"
  }
}
```

What you get:

- Every skill listed below is installed into `.agents/skills/<name>` and linked into the skill directories of the agents detected on your machine (Claude Code, Cursor, OpenCode, Codex, ...). Pass `--agents claude-code,cursor` to choose explicitly.
- `skills-npm-lock.json` and `skills-lock.json` record what came from where. Commit them.
- Removing `@antfu/skills` from your dependencies removes the skills on the next sync.

The pack tracks each upstream's default branch. To pull in the latest upstream changes without waiting for a new pack release:

```bash
pnpx skills update
```

## Skills

<!-- skills:start -->

### Workflow

| Skill | Description | Source |
| --- | --- | --- |
| [grill-me](https://github.com/mattpocock/skills/blob/HEAD/skills/productivity/grill-me/SKILL.md) | A relentless interview to sharpen a plan or design. | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [grilling](https://github.com/mattpocock/skills/blob/HEAD/skills/productivity/grilling/SKILL.md) | Grill the user relentlessly about a plan, decision, or idea. | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [handoff](https://github.com/mattpocock/skills/blob/HEAD/skills/productivity/handoff/SKILL.md) | Compact the current conversation into a handoff document for another agent to pick up. | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [to-questionnaire](https://github.com/mattpocock/skills/blob/HEAD/skills/productivity/to-questionnaire/SKILL.md) | Turn a decision you can't fully answer into a questionnaire for someone else to fill in. | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [writing-for-agents](https://github.com/mattpocock/skills/blob/HEAD/skills/productivity/writing-for-agents/SKILL.md) | Writing documents for agents. Use when creating or editing skills, or modifying AGENTS.md or CLAUDE.md. | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [teach](https://github.com/mattpocock/skills/blob/HEAD/skills/productivity/teach/SKILL.md) | Teach the user a new skill or concept, within this workspace. | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [code-review](https://github.com/mattpocock/skills/blob/HEAD/skills/engineering/code-review/SKILL.md) | Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes: Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/spec asked for?). | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [codebase-design](https://github.com/mattpocock/skills/blob/HEAD/skills/engineering/codebase-design/SKILL.md) | Shared vocabulary for designing deep modules. | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [research](https://github.com/mattpocock/skills/blob/HEAD/skills/engineering/research/SKILL.md) | Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [tdd](https://github.com/mattpocock/skills/blob/HEAD/skills/engineering/tdd/SKILL.md) | Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests. | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [improve](https://github.com/shadcn/improve/blob/HEAD/skills/improve/SKILL.md) | Survey any codebase as a senior advisor and produce prioritized, self-contained implementation plans for OTHER models/agents to execute. | [shadcn/improve](https://github.com/shadcn/improve) |
| [dry-refactoring](https://github.com/kucherenko/jscpd/blob/HEAD/skills/dry-refactoring/SKILL.md) | Guided workflow to eliminate copy-paste duplication detected by jscpd. | [kucherenko/jscpd](https://github.com/kucherenko/jscpd/tree/HEAD/skills/dry-refactoring) |
| [antfu](https://github.com/antfu/skills/blob/HEAD/skills/antfu/SKILL.md) | Anthony Fu's opinionated tooling and conventions for JavaScript/TypeScript projects. | [antfu/skills](https://github.com/antfu/skills) |
| [antfu-create-pr](https://github.com/antfu/skills/blob/HEAD/skills/antfu-create-pr/SKILL.md) | Create a reviewable GitHub pull request from the current branch with a Conventional Commits title, a concise evidence-based body, and before/after screenshots for UI changes. | [antfu/skills](https://github.com/antfu/skills) |

### Writing

| Skill | Description | Source |
| --- | --- | --- |
| [simple-english](https://github.com/AminBlg/SimpleEnglish/blob/HEAD/skills/simple-english/SKILL.md) | Write or rewrite text in plain, layman-readable English in the spirit of ASD-STE100 Simplified Technical English: short sentences, active voice, simple tenses, one word one meaning, condition before command, every technical term defined at first use, no AI slop. | [AminBlg/SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) |
| [unslop](https://github.com/cursor/plugins/blob/HEAD/pstack/skills/unslop/SKILL.md) | Cut AI tells from any writing. Must always apply. | [cursor/plugins](https://github.com/cursor/plugins/tree/HEAD/pstack/skills/unslop) |
| [i-have-adhd](https://github.com/ayghri/i-have-adhd/blob/HEAD/skills/i-have-adhd/SKILL.md) | Shape output for a reader with ADHD: lead with the next action, number multi-step work, restate state across turns, suppress tangents, give specific time estimates, make wins visible. | [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) |

### Vue & Nuxt

| Skill | Description | Source |
| --- | --- | --- |
| [vue-best-practices](https://github.com/vuejs-ai/skills/blob/HEAD/skills/vue-best-practices/SKILL.md) | MUST be used for Vue.js tasks. Strongly recommends Composition API with `<script setup>` and TypeScript as the standard approach. | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [vue-router-best-practices](https://github.com/vuejs-ai/skills/blob/HEAD/skills/vue-router-best-practices/SKILL.md) | Vue Router 4 patterns, navigation guards, route params, and route-component lifecycle interactions. | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [vue-pinia-best-practices](https://github.com/vuejs-ai/skills/blob/HEAD/skills/vue-pinia-best-practices/SKILL.md) | Pinia stores, state management patterns, store setup, and reactivity with stores. | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [vue-testing-best-practices](https://github.com/vuejs-ai/skills/blob/HEAD/skills/vue-testing-best-practices/SKILL.md) | Use for Vue.js testing. Covers Vitest, Vue Test Utils, component testing, mocking, testing patterns, and Playwright for E2E testing. | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [vue-debug-guides](https://github.com/vuejs-ai/skills/blob/HEAD/skills/vue-debug-guides/SKILL.md) | Vue 3 debugging and error handling for runtime errors, warnings, async failures, and SSR/hydration issues. | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [create-adaptable-composable](https://github.com/vuejs-ai/skills/blob/HEAD/skills/create-adaptable-composable/SKILL.md) | Create a library-grade Vue composable that accepts maybe-reactive inputs (MaybeRef / MaybeRefOrGetter) so callers can pass a plain value, ref, or getter. | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [nuxt-modules](https://github.com/onmax/nuxt-skills/blob/HEAD/skills/nuxt-modules/SKILL.md) | Use when creating Nuxt modules: (1) Published npm modules (@nuxtjs/, nuxt-), (2) Local project modules (modules/ directory), (3) Runtime extensions (components, composables, plugins), (4) Server extensions (API routes, middleware), (5) Releasing/publishing modules to npm, (6) Setting up CI/CD workflows for modules. | [onmax/nuxt-skills](https://github.com/onmax/nuxt-skills) |
| [nuxt-content](https://github.com/onmax/nuxt-skills/blob/HEAD/skills/nuxt-content/SKILL.md) | Build typed, content-driven Nuxt applications with @nuxt/content. | [onmax/nuxt-skills](https://github.com/onmax/nuxt-skills) |
| [nuxt-i18n](https://github.com/onmax/nuxt-skills/blob/HEAD/skills/nuxt-i18n/SKILL.md) | Internationalize Nuxt applications with @nuxtjs/i18n. | [onmax/nuxt-skills](https://github.com/onmax/nuxt-skills) |
| [nuxt-seo](https://github.com/onmax/nuxt-skills/blob/HEAD/skills/nuxt-seo/SKILL.md) | Nuxt SEO meta-module with robots, sitemap, og-image, schema-org. | [onmax/nuxt-skills](https://github.com/onmax/nuxt-skills) |
| [comark](https://github.com/onmax/nuxt-skills/blob/HEAD/skills/comark/SKILL.md) | Comark (Components in Markdown) parser: syntax, AST, Vue/React/Svelte/Angular renderers, plugins, and LLM streaming with auto-close. | [onmax/nuxt-skills](https://github.com/onmax/nuxt-skills) |

### Design

| Skill | Description | Source |
| --- | --- | --- |
| [frontend-design](https://github.com/anthropics/skills/blob/HEAD/skills/frontend-design/SKILL.md) | Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. | [anthropics/skills](https://github.com/anthropics/skills/tree/HEAD/skills/frontend-design) |

### Browser

| Skill | Description | Source |
| --- | --- | --- |
| [agent-browser](https://github.com/vercel-labs/agent-browser/blob/HEAD/skills/agent-browser/SKILL.md) | Browser automation CLI for AI agents. Use when the user needs to interact with websites, including navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, testing web apps, or automating any browser task. | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) |

<!-- skills:end -->

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg" alt="Sponsors"/>
  </a>
</p>

## License

[MIT](./LICENSE) License © [Anthony Fu](https://github.com/antfu)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@antfu/skills?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmx.dev/package/@antfu/skills
[npm-downloads-src]: https://img.shields.io/npm/dm/@antfu/skills?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmx.dev/package/@antfu/skills
[license-src]: https://img.shields.io/github/license/antfu/skills-pack.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/skills-pack/blob/main/LICENSE
