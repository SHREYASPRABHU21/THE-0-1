# Decisions

## 2026-09-03 — Build one responsive web application

Decision:
Use one responsive magazine website rather than separate desktop and mobile applications.

Reason:
Desktop and mobile share the same content, templates, and interactions. Only the layout and controls differ.

Consequences:
- Desktop supports two-page spreads.
- Mobile prioritises one-page reading.
- Every template requires desktop and mobile layout rules.
- Static poster pages may later have separate desktop/mobile image exports.

## 2026-09-03 — Validate the reader before building automation

Decision:
Build the blank magazine reader and templates before the database, editor, AI, news automation, domain, or public website.

Reason:
The unique product value is the interactive reading experience. It must feel good before building operational systems around it.

Consequences:
- Phase 0 remains deliberately small.
- No backend features are added until the visual reader prototype works.

## 2026-09-03 — Use reusable templates plus future canvas editing

Decision:
Use reusable templates for most pages, with a future free-position canvas only for selected special pages.

Reason:
Templates make weekly production fast and consistent. A canvas allows creative cover/art pages without forcing every page into fixed layouts.

Consequences:
- Templates are the default.
- Free-layout editing is not a Phase 0 feature.