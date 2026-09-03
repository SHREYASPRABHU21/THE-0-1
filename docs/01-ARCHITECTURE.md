# Architecture

## System overview

```text
Reader
  ↓
Magazine Website
  ├── Magazine Shell
  ├── Page System
  ├── Interaction System
  ├── Content System
  ├── Editorial Studio (later)
  └── AI and Research System (later)
```

## Magazine Shell

Responsible for reading experience:
- Flipbook/page-turn behavior
- Previous/next controls
- Page number and progress
- Contents/thumbnails
- Zoom
- Full screen
- Desktop two-page rendering
- Mobile one-page rendering
- Accessibility and keyboard/touch controls

## Page System

Responsible for displaying pages:
- Template registry
- Page renderer
- Reusable template components
- Layout variants
- Theme settings
- Animation settings
- Desktop and mobile layout rules

## Interaction System

Reusable interactive pieces:
- Image zoom modal
- Video modal
- Link hotspot
- Gallery
- Image slider
- Product variant selector
- Poll
- Quiz
- Timeline
- Interactive chart details

## Content System

Responsible for issue content:
- Issues
- Pages
- Page blocks
- Images/videos/assets
- Sources and credits
- Themes and selected template variants

Phase 0–1:
Content can be static local data.

Later:
Content moves to a database and media storage.

## Editorial Studio — later

Private creator tools:
- Create/duplicate issue
- Add/reorder pages
- Choose template/variant/theme
- Add text/media/interactions
- Preview desktop and mobile
- Save drafts and publish
- Keep version history

## AI and Research System — later

Workflow:
Trusted sources
→ story candidates
→ grouping/tagging/scoring
→ human selection
→ AI draft and template suggestion
→ human review
→ published issue

## Responsive policy

One responsive web application, not separate desktop and mobile apps.

Desktop:
- Two-page book spread when screen space allows.

Mobile:
- One page at a time
- Touch-friendly controls
- Reading-first layouts
- Simplified visual density where necessary

Same content, same project, different layout rules.

## Architecture rule

Separate things that change at different speeds:

- Shell: changes rarely
- Templates: change occasionally
- Interactions: change occasionally
- Content data: changes every issue
- Admin editor: added later
- AI/automation: added later