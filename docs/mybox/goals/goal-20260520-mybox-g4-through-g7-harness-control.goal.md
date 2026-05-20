---
schemaVersion: 1
goalId: goal-20260520-mybox-g4-through-g7-harness-control
title: MyBox G4 Through G7 Harness Control Foundation
project: mybox-agentrove
status: ready
priority: high
objective: "Build the MyBox harness-control foundation from G4 through G7: an Agentrove-native registry-backed harness switcher, a harness settings shell, a normalized session/run observability model, Codex native-surface discovery, and a first thin Codex adapter slice, while preserving Agentrove's visual language and avoiding OpenClaw mutation."
sourceDocs:
  - AGENTS.md
  - docs/mybox/agent-operating-contract.md
  - docs/mybox/product-blueprint.md
  - docs/mybox/g3-1-feature-disposition-guardrails.md
  - docs/mybox/v1-feature-disposition.md
  - docs/mybox/ui-visual-contract.md
  - docs/mybox/adapter-architecture.md
  - docs/mybox/contracts/harness-registry.md
  - docs/mybox/contracts/truth-labels.md
  - docs/mybox/contracts/permission-mutation-safety.md
  - docs/mybox/inventory/screens.md
  - docs/mybox/inventory/features.yaml
  - docs/generated/repo-map.md
  - docs/generated/frontend-map.md
  - docs/generated/backend-map.md
  - docs/generated/adapter-event-flow.md
  - docs/domains/chat.md
  - docs/domains/providers.md
  - docs/domains/streaming.md
  - docs/domains/workspace.md
  - docs/domains/git.md
inScope:
  - G4 Agentrove-native harness switcher using the existing model/provider selector and adjacent header controls as the first approved seam.
  - G4.1 harness settings shell using existing Agentrove settings anatomy.
  - G5 normalized session/run observability model for cross-harness chats, sessions, tool events, file activity, permissions, diffs, child/subagent activity, and raw payload references.
  - G6 Codex native-surface discovery across local app, CLI, server, history, stream, tool, permission, and diff surfaces.
  - G7 first thin Codex adapter slice based on the G6 discovery result.
  - Registry-driven harness behavior through frontend/src/config/mybox-harness-registry.json and frontend/src/config/myboxHarnessRegistry.ts.
  - Tests, checks, visual/browser QA, review passes, PRs, and local documentation updates for every phase.
outOfScope:
  - OpenClaw live mutation, prompt sending, action approval, work spawning, Workflow OS edits, shared-brain writes, or OpenClaw runtime changes.
  - Redesigning Agentrove from scratch or replacing the visual system.
  - Sidebar, chat timeline, right panel, terminal, or diff restructuring during the first G4 switcher slice.
  - Claude Code and OpenCode live adapter implementation beyond truthful registry/settings readiness.
  - iPhone companion, voice/wake word, browser-panel implementation, OpenClaw read-only adapter implementation, or desktop packaging polish.
  - Editing frontend/backend-sidecar or generated backend-sidecar output.
acceptanceCriteria:
  - Each phase begins by reading the relevant MyBox docs, generated maps, and domain docs listed in sourceDocs.
  - G4 switcher consumes MYBOX_HARNESS_REGISTRY and does not hardcode the final harness list in presentation components.
  - G4 switcher visually reads as native Agentrove UI, using existing selector/menu/header anatomy and preserving density, typography, spacing, radius, icon style, and interaction patterns.
  - G4 switcher shows first-class and secondary harnesses distinctly without deleting Copilot or Cursor.
  - G4 switcher shows truthful status labels such as LOCAL, READ-ONLY, PLANNED, MOCK, OBSERVED, or NOT CONNECTED where applicable.
  - G4 does not restructure sidebar, chat timeline, right panel, terminal, or diff surfaces.
  - G4.1 adds or plans the Harnesses settings shell using existing settings tab/list/card primitives, showing connection state, capabilities, auth/setup state, limitations, and supported actions.
  - G4.1 shows OpenClaw as read-only or not connected, never as a mutating harness.
  - G5 produces a typed normalized observability contract or model that maps existing Agentrove stream/chat/provider events without breaking existing event rendering.
  - G5 distinguishes live, local, observed, read-only, mock, planned, unavailable, and raw/diagnostic data.
  - G5 keeps raw event payloads out of the default chat timeline and reserves them for inspector/details surfaces.
  - G6 documents the real Codex surfaces available on this machine and in this repo, including commands tried, paths inspected, APIs or logs found, and failure modes.
  - G6 recommends the least fragile Codex adapter path with security, reliability, and maintenance tradeoffs.
  - G7 implements only the first thin Codex adapter slice that the G6 discovery proves safe and feasible.
  - G7 supports a real user-visible Codex path such as listing/resuming chats, sending a message, streaming a response, or showing work/tool summaries, depending on what G6 proves feasible.
  - G7 labels any partial, unavailable, mock, or local-only Codex data truthfully.
  - Existing Agentrove provider behavior remains functional unless an intentional change is documented and tested.
  - OpenClaw remains registry/read-only only throughout this goal; no OpenClaw mutation path exists.
  - Every UI change includes browser or desktop screenshot evidence at desktop width and one narrow width when practical.
  - Every phase includes a review pass before closeout; visual UI phases require a visual/style review focused on preventing pasted-on UI.
  - Final closeout records changed files, tests, screenshots/evidence, PR links, unresolved risks, and next recommended phase.
suggestedWorkflowLevel: council
riskClass: high
dependsOn:
  - G1 fork intelligence baseline merged
  - G2 local-first desktop access merged
  - G3 harness registry foundation merged
  - G3.1 feature disposition guardrails merged
writeSurfaces:
  - /Users/user/mybox-agentrove/docs/mybox/
  - /Users/user/mybox-agentrove/docs/generated/
  - /Users/user/mybox-agentrove/frontend/src/config/
  - /Users/user/mybox-agentrove/frontend/src/components/chat/model-selector/
  - /Users/user/mybox-agentrove/frontend/src/components/chat/message-input/
  - /Users/user/mybox-agentrove/frontend/src/components/settings/
  - /Users/user/mybox-agentrove/frontend/src/types/
  - /Users/user/mybox-agentrove/frontend/src/hooks/
  - /Users/user/mybox-agentrove/frontend/src/store/
  - /Users/user/mybox-agentrove/frontend/src/services/
  - /Users/user/mybox-agentrove/scripts/mybox/
  - /Users/user/mybox-agentrove/tests/
  - /Users/user/mybox-agentrove/plans/
protectedSurfaces:
  - /Users/user/.openclaw/
  - /Users/user/shared-brain/
  - /Users/user/openclaw-atlas/
  - /Users/user/my-box-replit-20260513/
  - /Users/user/mybox-agentrove/frontend/backend-sidecar/
  - /Users/user/mybox-agentrove/backend/app/services/acp/
  - /Users/user/mybox-agentrove/backend/app/services/git.py
  - /Users/user/mybox-agentrove/backend/app/services/terminal.py
verificationRequired:
  - node scripts/generate-repo-map.mjs
  - node scripts/mybox/checks/check-mybox-inventory.mjs
  - node scripts/mybox/graph/build-codebase-graph.mjs
  - node scripts/mybox/checks/check-mybox-graph.mjs
  - node scripts/mybox/checks/check-harness-registry.mjs
  - cd frontend && npm run mybox:harness-registry
  - cd frontend && npm run typecheck
  - cd frontend && npm run lint
  - cd frontend && npm run format:check
  - cd frontend && npm run build
  - browser or desktop QA for every UI phase
  - narrow-width browser QA for every non-trivial UI change
  - targeted unit/component tests for registry, switcher, settings, observability, and adapter logic as implemented
  - git diff --check
rollbackOrCheckpoint: Work on feature branches only. Commit and PR each phase or natural checkpoint separately. Keep main fast-forwarded only after clean PR merges. Do not push directly to main.
workerPolicy:
  parentOwnsRun: true
  useWorkerHarnesses: true
  allowNestedGoals: false
  maxNestedDepth: 0
  workerUses:
    - code review
    - visual review
    - browser QA
    - adapter discovery
    - test verification
openQuestions:
  - Which exact Codex control surface will G6 prove safest: app local server, CLI, files/history, GitHub/Codex connector, or another local route?
suggestedGoalRunCommand: /goal follow docs/mybox/goals/goal-20260520-mybox-g4-through-g7-harness-control.goal.md
createdAt: 2026-05-20
updatedAt: 2026-05-20
---

# MyBox G4 Through G7 Harness Control Foundation

## Launch Prompt

Use:

```text
/goal follow docs/mybox/goals/goal-20260520-mybox-g4-through-g7-harness-control.goal.md
```

If `/goal-run` is available and preferred:

```text
/goal-run follow docs/mybox/goals/goal-20260520-mybox-g4-through-g7-harness-control.goal.md
```

## Operating Instruction

Work autonomously through G4, G4.1, G5, G6, and G7. Do not pause between phases
unless a stop condition is hit. Keep scope exact, use feature branches and PRs,
run verification at each natural checkpoint, and preserve Agentrove's current
visual language.

The spirit of this goal is not "add a fancy switcher." The spirit is to turn the
Agentrove base into a truthful, registry-backed MyBox multi-harness control
surface without damaging the product foundation.

## Stop Conditions

Stop and ask the user before proceeding if:

- the only path requires editing OpenClaw, Workflow OS, shared-brain, or
  external runtime state,
- a UI change starts requiring sidebar/timeline/right-panel/terminal/diff
  restructuring before the G4 seam is proven,
- G6 cannot identify a safe Codex adapter path,
- a change would weaken local/hosted auth boundaries,
- a browser or visual review shows the UI looks pasted on,
- tests reveal a regression in existing Agentrove provider behavior,
- a protected surface must be edited to continue.

## Phase G4: Agentrove-Native Harness Switcher

Goal: add the first visible MyBox harness switcher using the existing
model/provider selector or adjacent header controls.

Steps:

1. Read `docs/mybox/g3-1-feature-disposition-guardrails.md` and name the exact
   affected surface row in the implementation plan.
2. Inspect current selector/header implementation and identify the smallest
   native seam.
3. Consume `MYBOX_HARNESS_REGISTRY`; do not define a fixed harness array in the
   presentation component.
4. Show first-class and secondary harnesses distinctly.
5. Show truth/status labels using existing badge/menu treatments.
6. Preserve current model/provider behavior unless intentionally and narrowly
   adapted.
7. Add tests/checks proving registry consumption and OpenClaw read-only state.
8. Browser-inspect desktop and narrow layouts.
9. Request review before PR closeout.

G4 must not touch sidebar restructuring, timeline summaries, right panel modes,
terminal placement, diff review, or OpenClaw runtime.

## Phase G4.1: Harness Settings Shell

Goal: create or plan the first native Harnesses settings area.

Steps:

1. Reuse existing Settings page and tab/list primitives.
2. Render harness registry entries with status, tier, capabilities,
   auth/setup state, supported actions, and limitations.
3. Mark OpenClaw as read-only/not connected as appropriate.
4. Show unavailable/planned states honestly.
5. Add tests or fixtures for all registry entries.
6. Browser-inspect the settings page.
7. Review before closeout.

This phase may remain a shell if deeper adapter status requires G5/G6, but the
shell must not fake live connectivity.

## Phase G5: Session And Observability Normalization

Goal: define the shared MyBox model for what the user can see across harnesses.

Steps:

1. Inspect existing Agentrove stream/chat/provider event flows.
2. Create or update a typed model for normalized visible activity:
   chat/session identity, harness identity, message events, thinking summaries,
   tool calls, tool results, file operations, diffs, permissions, terminal
   activity, child/subagent activity, errors, completion, and raw references.
3. Keep existing provider-specific renderers intact.
4. Define mapping boundaries and truth labels.
5. Add fixtures/tests for representative Codex, Claude, OpenCode, and
   unavailable/read-only states.
6. Document what remains provider-specific.

G5 is allowed to create models and fixtures. It should not yet redesign the
timeline.

## Phase G6: Codex Native-Surface Discovery

Goal: prove the safest Codex integration path before writing a real adapter.

Steps:

1. Inventory local Codex app, CLI, server, history, logs, and any official or
   local control surfaces.
2. Test only safe read/discovery commands first.
3. Determine whether MyBox can list chats, resume chats, send messages, stream
   output, observe tool calls, observe diffs, and observe permission events.
4. Record exact commands, paths, APIs, outputs, failures, and security
   implications.
5. Compare possible adapter routes: ACP, CLI wrapper, local app server, file
   observation, or other supported local surface.
6. Recommend the least fragile G7 path.

G6 should produce a dedicated discovery report under `docs/mybox/`.

## Phase G7: First Thin Codex Adapter Slice

Goal: implement the smallest safe live Codex capability that G6 proves feasible.

Allowed examples:

- list or resume Codex chats,
- send one message through a safe local Codex surface,
- stream a response,
- show observable work/tool summaries,
- show Codex diff/review context where available.

Requirements:

1. Use the G5 normalized model where applicable.
2. Label local/partial/unavailable data truthfully.
3. Preserve existing Agentrove Codex ACP behavior unless intentionally
   extending it.
4. Add targeted tests and browser QA.
5. Do not ship a brittle shell wrapper if G6 proves it unsafe.
6. Document remaining gaps before closeout.

## Final Closeout

At the end of G7, produce a concise final report covering:

- branch and PR links for each phase,
- changed files by phase,
- screenshots/browser evidence,
- verification commands and results,
- review findings and fixes,
- remaining risks,
- recommended next phase after G7.

The likely next phase after this goal is OpenClaw read-only adapter design and
implementation, but do not begin it inside this goal.
