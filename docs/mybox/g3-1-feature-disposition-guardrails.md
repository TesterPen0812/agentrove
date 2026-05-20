# MyBox G3.1 Feature Disposition Guardrails

**Status:** current
**Date:** 2026-05-20
**Authority:** `docs/mybox/product-blueprint.md`,
`docs/mybox/v1-feature-disposition.md`,
`docs/mybox/ui-visual-contract.md`

## Purpose

G3.1 is the taste and feature-disposition gate between the harness registry
foundation and any new UI work. It exists because MyBox should not get another
foreign-looking harness picker, dashboard panel, or generic AI shell bolted onto
Agentrove.

Before G4 or any later UI implementation touches pixels, the implementer must
read this file and state which rows below are affected.

## Non-Goals

- Do not implement UI in this pass.
- Do not redesign Agentrove.
- Do not remove existing Agentrove features.
- Do not add OpenClaw mutation, Workflow OS edits, bridge calls, or external
  runtime changes.
- Do not create a second visual system for MyBox.

## Global Taste Rules

1. New MyBox UI must look like Agentrove gained a native capability.
2. Use existing Agentrove controls before inventing new ones.
3. Keep density calm and desktop-native.
4. Use Codex as an interaction reference only, not as a skin to clone.
5. Every non-live or limited value must carry a truth label.
6. Harness lists must come from `frontend/src/config/mybox-harness-registry.json`
   through typed selectors.
7. Avoid large cards, colorful provider slabs, bright marketing surfaces,
   decorative gradients, or isolated MyBox islands.
8. Keep raw detail in the right panel, bottom drawer, or expanded rows; the main
   chat should stay readable.

## Do-Not-Touch Zones For G4

These surfaces are not implementation targets for the first harness switcher
slice unless a later plan explicitly expands scope:

- OpenClaw runtime, Workflow OS, shared-brain, or any external run state.
- Backend ACP protocol semantics.
- Terminal command execution or git mutation behavior.
- Diff rendering internals.
- Auth/session security boundaries.
- File editor internals.
- Existing provider tool renderers, except for registry-driven labels or
  capability checks.
- The current Agentrove layout shell, beyond the smallest switcher/filter
  placement required.

## Screen And Surface Disposition

| Surface | G3.1 decision | What may change next | What must be preserved | Guardrail for G4 |
| --- | --- | --- | --- | --- |
| Landing/start screen | Change later | Add MyBox workspace/harness entry only after switcher behavior is proven. | Existing Agentrove spacing and workspace choice flow. | Do not make a marketing home page or big dashboard. |
| Login/signup/account recovery | Keep current G2 behavior | Only wording polish if it clarifies local desktop access. | Hosted/web auth boundaries and local desktop access. | Not part of G4. |
| Workspace sidebar | Keep, refine later | Later: group chats by workspace and filter by harness. | Existing sidebar rhythm, row density, hover/selected states. | Do not add a colorful harness rail or duplicate navigation. |
| Chat timeline | Keep, evaluate | Later: completed-turn summary after active stream evaluation. | Existing message, thinking, tool, and permission rendering. | G4 should not rewrite timeline rendering. |
| Composer | Keep | Later: composer default harness may follow selected harness filter. | Existing input density, send affordance, attachment behavior. | Do not add large mode bars or foreign buttons. |
| Model/provider selector | Change carefully | Convert selected provider label and grouping to registry-backed harness concepts. | Existing dropdown/popover anatomy, provider icons, keyboard behavior. | This is the safest first visual seam for G4. |
| Global harness switcher/filter | Add | Add a small native-feeling control backed by the registry. | Agentrove toolbar/header/menu language. | Must read as an Agentrove selector, not a MyBox custom card. |
| Right review panel | Keep | Later: add Inspector/Browser modes using existing panel/tabs style. | Existing review and diff usefulness. | G4 should not remodel this panel. |
| Inspector mode | Add later | Add selected-event/harness capability details after switcher state exists. | Raw details should remain secondary. | Do not show raw registry JSON in the main UI. |
| Browser mode | Add later | Optional preview panel only when a target exists. | Review/Inspector should remain primary. | Do not make Browser permanently visible. |
| Terminal | Keep | Later: bottom-drawer mental model and provenance labels. | Terminal behavior, PTY semantics, workspace safety. | Not part of G4. |
| Diff/review | Keep | Later: harness/edit provenance labels. | Existing diff UX and Git workflow. | Not part of G4. |
| Settings | Keep, extend | Add Harnesses settings area using existing settings tab anatomy. | Existing settings page structure and quiet form styling. | G4 may add a planned settings row only if it uses existing patterns. |
| Harnesses settings | Add after switcher seed | Show registry entries, status, capabilities, setup limits, and actions. | Truth labels and capability boundaries. | Must not imply OpenClaw can mutate. |
| Skills/personas/instructions | Keep with gates | Later: show capability support per harness. | Existing editing flows. | Not part of G4. |
| Secrets/env vars | Keep | Later: clearer provenance and local trust copy. | Redaction and existing secret controls. | Not part of G4. |
| GitHub/PR workflows | Keep optional | Later: harness provenance in generated PR/commit flows. | Optional local-first nature. | Not part of G4. |
| OpenClaw virtual workspace | Add later | Read-only bucket for projectless OpenClaw chats once observation exists. | Truthful `READ-ONLY`/`OBSERVED` labels. | G4 may show OpenClaw in registry state only. |

## Harness Switcher Design Guardrails

G4 may build a harness switcher only if it satisfies these constraints:

- Reads all entries from `MYBOX_HARNESS_REGISTRY`.
- Shows first-class harnesses before secondary adapters.
- Shows status/truth label using existing badge or menu treatments.
- Shows unavailable/planned/read-only state honestly.
- Keeps provider icons in the existing icon style.
- Fits in the current header/sidebar rhythm without pushing content around.
- Uses existing popover/menu/dropdown anatomy where possible.
- Does not duplicate model selection unless the product reason is explicit.
- Does not hide Copilot/Cursor; they are secondary, not deleted.
- Does not expose OpenClaw send/approve/spawn/write controls.

The preferred first G4 slice is:

1. Registry-backed switcher control in the existing selector/header area.
2. Capability/status rows in the same popover or an existing settings-like list.
3. No sidebar restructuring yet.
4. No timeline restructuring yet.
5. No OpenClaw live read calls yet.

## Visual Review Checklist

Every UI PR after G3.1 must answer:

1. Which surface row in this file does the change touch?
2. Which existing Agentrove component anatomy was reused?
3. What screenshot or browser evidence proves it still looks native?
4. What truth labels are visible?
5. How does the change avoid hardcoded harness lists?
6. What was intentionally left untouched?

## Required Verification For UI Work After G3.1

At minimum:

```bash
node scripts/mybox/checks/check-harness-registry.mjs
cd frontend && npm run mybox:harness-registry
cd frontend && npm run typecheck
cd frontend && npm run lint
cd frontend && npm run format:check
cd frontend && npm run build
```

For non-trivial UI changes, also inspect the rendered app at desktop width and
one narrow width. If the UI looks pasted on, the change fails even when tests
pass.

## G3.1 Decision

Proceed to G4 only after the PR description links this file and states the
specific switcher seam it will use. The current approved seam is the existing
model/provider selector and adjacent header controls. The sidebar, timeline,
right panel, terminal, and diff surfaces stay unchanged in the first G4 slice.
