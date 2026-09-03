# AI Collaboration Rules

## Purpose

These rules apply to Copilot, Gemini, Ollama, Grok, Perplexity, and any future AI assistant used on The 0-1 project.

## Before coding

The AI must:
1. Read `docs/03-CURRENT.md`.
2. Read only the relevant sections of architecture/roadmap when needed.
3. Respect the active phase and milestone.
4. First list files to create and files to edit.
5. Explain the plan simply before generating code.

## Coding rules

- Work on one small feature at a time.
- Do not rewrite unrelated working files.
- Do not add features outside the current milestone.
- Prefer small reusable components.
- Use TypeScript.
- Keep components focused.
- Preserve existing working behaviour.
- Explain where every code block should go.
- Provide testing instructions.
- Provide a suggested Git commit message.

## Documentation rules

After a working feature is completed, update:
- `docs/04-CHANGELOG.md`
- `docs/06-FEATURES.md`
- `docs/03-CURRENT.md`

Update `docs/01-ARCHITECTURE.md` only if a major system or data flow changes.
Update `docs/05-DECISIONS.md` only when a meaningful product/architecture decision is made.

## Scope control

Do not add the following unless the active milestone explicitly asks for them:
- Database
- Authentication
- AI API calls
- RSS/news scraping
- Admin editor
- Payments
- Newsletter
- Deployment/domain
- Real magazine content

## Prompting rule for external models

For small tasks, provide:
- A one-sentence project description
- The current task from `03-CURRENT.md`
- The specific relevant code file(s)
- The exact requested change

Do not paste the full project documentation for small tasks.

For major architecture decisions, provide:
- Relevant section of `00-PROJECT-VISION.md`
- Relevant section of `01-ARCHITECTURE.md`
- `03-CURRENT.md`
- The decision/question

## Editorial rules for later phases

- AI assists; human approves.
- Never publish automatically.
- Retain sources.
- Do not invent facts or citations.
- Use original summaries and analysis.
- Respect image/video licences and credits.