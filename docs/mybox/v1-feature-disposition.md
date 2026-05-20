# MyBox V1 Feature Disposition

**Status:** current
**Date:** 2026-05-20
**Source of truth:** `docs/mybox/product-blueprint.md`

This document applies the MyBox V1 Product Blueprint to the existing Agentrove
feature set. It decides what belongs in V1, what should change, and what should
wait before product-code work starts.

## Decision Rules

- Preserve Agentrove features until reviewed.
- Prefer `change` over replacement when Agentrove already owns the hard
  product primitive.
- Keep UI changes native to Agentrove's current visual language.
- Keep harnesses data-driven; no presentation component should own the final
  harness list.
- Keep OpenClaw read-only until a later safety-scoped plan grants mutation.
- Keep truth labels visible for non-live or limited data.

## V1 Required

| Surface | Disposition | Why | Blueprint requirement |
| --- | --- | --- | --- |
| MyBox product identity | Change | Normal user-facing copy should say MyBox, while Agentrove remains credited base/upstream. | Product Identity |
| Local desktop access | Keep completed, harden | G2 already added local desktop access. Future work should preserve hosted/web auth boundaries. | Product Identity |
| Workspace hub | Change | The first page should resume the last workspace/harness context and remain workspace-first. | Information Architecture |
| Workspace sidebar groups | Keep, refine | Existing workspace/chat grouping is the right navigation spine. | Information Architecture |
| Virtual OpenClaw workspace bucket | Add | OpenClaw may not have local workspace metadata; MyBox must not fake it. | Product Vocabulary |
| Global harness filter/switcher | Add | The switcher controls visible chats and composer default harness across workspace groups. | Information Architecture |
| Data-driven harness registry | Add | Codex, OpenClaw, Claude Code, OpenCode, and future harnesses must come from a registry/adapter layer. | Harness Model |
| Harnesses settings area | Add | One settings area should show connection, capabilities, auth/setup state, limits, and actions. | Settings and Configuration |
| Chat timeline | Keep, evaluate | Chat remains the center. Evaluate Agentrove's native active stream before changing it. | Main Interaction Model |
| Collapsed completed-turn summary | Change | Finished turns should default to final answer plus expandable work summary. | Main Interaction Model |
| Tool-call cards | Keep, refine | Existing provider-specific renderers are valuable; future registry work should not replace them blindly. | Main Interaction Model |
| Permission prompts | Keep, elevate | MyBox needs a consistent approval layer while preserving harness-native permission detail. | Adapter Direction |
| Diff/review panel | Keep | Review/diff is a major reason Agentrove is a good base. | Panels and Tools |
| Inspector panel | Add/refine | Selected tools, events, permissions, child sessions, raw payloads, telemetry, and adapter details need one home. | Panels and Tools |
| Browser panel mode | Add later in V1 | Browser should be an optional right-panel preview mode, not a permanent dashboard panel. | Panels and Tools |
| Terminal bottom drawer | Change | Terminal remains first-class but should move toward a bottom drawer mental model. | Panels and Tools |
| File tree/editor/preview | Keep | Needed for coding-agent supervision and diff context. | Panels and Tools |
| Secrets/env vars | Keep, clarify | Necessary for serious coding work; provenance and redaction must stay obvious. | Settings and Configuration |
| Codex live adapter path | Investigate then change | Codex is the first ambitious live target, but must start by discovering native Codex app/CLI/server/history surfaces. | Adapter Direction |
| OpenClaw read-only observation | Add, read-only | Show only truthfully available chats/runs/workflow/child work/artifacts. | Adapter Direction |

## V1 Optional

| Surface | Disposition | Why |
| --- | --- | --- |
| Split chat/subthreads | Keep | Useful for multi-agent supervision, but should not drive the first harness registry slice. |
| Skills | Keep | Useful for harness/workspace behavior, but capability-gate by harness. |
| Personas/custom instructions | Keep with gates | Useful where supported; not all harnesses share persona semantics. |
| GitHub/PR workflow | Keep optional | Useful for review workflows but must not block local MyBox use. |
| Secondary adapters: Copilot and Cursor | Keep as secondary | Existing Agentrove support remains available under secondary/other adapters. |
| Claude Code live adapter | Adapter-ready placeholder | Show truthful setup/capability state first; live control follows after core registry architecture. |
| OpenCode live adapter | Adapter-ready placeholder | Existing OpenCode support is useful, but it should not distract from Codex/OpenClaw proof points. |

## Later / Deferred

| Surface | Disposition | Why |
| --- | --- | --- |
| OpenClaw mutation | Defer | Requires separate safety plan; V1 read-only only. |
| Hosted admin/backend management | Defer | Hosted concern, not desktop-first V1. |
| Email verification/reset polish | Defer | Keep hosted behavior, but do not let it drive local desktop V1. |
| iPhone companion | Defer | Architecture constraint only for V1. |
| Voice/wake word | Defer | Requires separate OS/audio/privacy architecture. |
| Full brand redesign/icon system | Defer | First pass changes user-facing product language, not Agentrove's visual system. |

## Remove / Do Not Promote

| Surface | Disposition | Why |
| --- | --- | --- |
| Prior custom MyBox shell spikes | Remove from product path | They looked visually foreign. Preserve screenshots/verdicts only as evidence. |
| Fake live/demo harness state | Remove | All non-live data must be labeled `MOCK`, `PLANNED`, `READ-ONLY`, `OBSERVED`, `LOCAL`, or `NOT CONNECTED`. |
| Hardcoded MyBox harness lists in presentation components | Remove/avoid | Harnesses must be registry-driven. Existing Agentrove provider hardcoding should be paid down during registry work. |

## First Implementation Sequence

1. **MyBox user-facing text pass:** rename normal product copy to MyBox while
   preserving Agentrove in credits, diagnostics, docs, and upstream notes.
2. **Harness registry foundation:** introduce the data-driven harness source and
   tests before building the switcher. The seed implementation lives in
   `frontend/src/config/mybox-harness-registry.json`,
   `frontend/src/config/myboxHarnessRegistry.ts`, and
   `scripts/mybox/checks/check-harness-registry.mjs`.
3. **G3.1 feature disposition guardrails:** read and follow
   `docs/mybox/g3-1-feature-disposition-guardrails.md` before touching UI
   code. This pass freezes the first switcher seam and protects Agentrove's
   current visual language.
4. **Harness switcher and settings shell:** add native-feeling controls using
   existing Agentrove component anatomy. The first approved seam is the existing
   model/provider selector and adjacent header controls; do not restructure the
   sidebar, timeline, right panel, terminal, or diff surfaces in the first
   switcher slice.
5. **Codex native-surface discovery:** determine how to read/control Codex
   chats and live work without assuming ACP parity is enough.
6. **OpenClaw read-only design:** define exactly which OpenClaw facts can be
   observed safely and how they appear under the virtual OpenClaw workspace.
7. **Timeline/summary evaluation:** inspect Agentrove's native active work
   stream with real or fixture activity before changing the completed-turn
   summary behavior.

## Required Checks For Future Product PRs

- State which rows in this disposition are touched.
- Update this file if a feature moves between required, optional, deferred, or
  remove.
- Update `docs/mybox/inventory/screens.md` or
  `docs/mybox/inventory/features.yaml` when a visible screen or major feature
  changes.
- Include the blueprint compliance checklist from
  `docs/mybox/product-blueprint.md`.
- Prove no OpenClaw mutation was introduced unless the PR is explicitly a later
  safety-scoped OpenClaw mutation plan.
