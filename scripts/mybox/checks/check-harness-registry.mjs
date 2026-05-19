#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const cwd = process.cwd();
const root = basename(cwd) === 'frontend' ? dirname(cwd) : cwd;
const registryFile = join(root, 'frontend/src/config/mybox-harness-registry.json');
const modelSelectorFile = join(root, 'frontend/src/components/chat/model-selector/ModelSelector.tsx');

const requiredFirstClassIds = new Set(['codex', 'openclaw', 'claude-code', 'opencode']);
const secondaryIds = new Set(['copilot', 'cursor']);
const truthLabels = new Set(['live', 'local', 'observed', 'read-only', 'mock', 'planned', 'not connected']);
const adapterKinds = new Set(['acp', 'cli', 'api', 'log-observer', 'planned']);
const authRequirements = new Set(['none', 'local_cli', 'api_key', 'hosted_login', 'unknown']);
const sessionScopes = new Set(['workspace', 'global', 'external', 'unknown']);
const eventSources = new Set(['acp', 'pty', 'websocket', 'http', 'filesystem', 'manual_fixture']);
const permissionModels = new Set(['agentrove', 'external', 'none', 'unknown']);
const agentroveAgentKinds = new Set(['claude', 'codex', 'copilot', 'cursor', 'opencode']);
const capabilities = new Set([
  'chat',
  'streaming',
  'thinking_summary',
  'tool_cards',
  'permission_prompts',
  'terminal_observation',
  'terminal_mutation',
  'diff_observation',
  'git_mutation',
  'file_observation',
  'file_mutation',
  'session_list',
  'session_resume',
  'read_only_observation',
  'subagent_observation',
]);

function fail(message) {
  console.error(`harness registry check failed: ${message}`);
  process.exit(1);
}

let registry;
try {
  registry = JSON.parse(readFileSync(registryFile, 'utf8'));
} catch (error) {
  fail(`cannot read registry JSON: ${error.message}`);
}

if (!Array.isArray(registry)) fail('registry must be an array');

const ids = new Set();
for (const entry of registry) {
  for (const field of [
    'id',
    'displayName',
    'tier',
    'adapterKind',
    'status',
    'capabilities',
    'supportsMutation',
    'supportsReadOnly',
    'authRequirement',
    'sessionScope',
    'eventSources',
    'permissionModel',
  ]) {
    if (!(field in entry)) fail(`${entry.id ?? 'unknown entry'} is missing ${field}`);
  }

  if (ids.has(entry.id)) fail(`duplicate id: ${entry.id}`);
  ids.add(entry.id);

  if (!['first_class', 'secondary'].includes(entry.tier)) fail(`${entry.id} has invalid tier`);
  if (!adapterKinds.has(entry.adapterKind)) fail(`${entry.id} has invalid adapterKind`);
  if (!truthLabels.has(entry.status)) fail(`${entry.id} has invalid status`);
  if (!authRequirements.has(entry.authRequirement)) fail(`${entry.id} has invalid authRequirement`);
  if (!sessionScopes.has(entry.sessionScope)) fail(`${entry.id} has invalid sessionScope`);
  if (!permissionModels.has(entry.permissionModel)) fail(`${entry.id} has invalid permissionModel`);
  if (typeof entry.supportsMutation !== 'boolean') fail(`${entry.id} supportsMutation must be boolean`);
  if (typeof entry.supportsReadOnly !== 'boolean') fail(`${entry.id} supportsReadOnly must be boolean`);
  if (!Array.isArray(entry.eventSources) || entry.eventSources.length === 0) {
    fail(`${entry.id} must declare eventSources`);
  }
  for (const eventSource of entry.eventSources) {
    if (!eventSources.has(eventSource)) fail(`${entry.id} has invalid eventSource ${eventSource}`);
  }
  if (!Array.isArray(entry.capabilities) || entry.capabilities.length === 0) {
    fail(`${entry.id} must declare capabilities`);
  }
  for (const capability of entry.capabilities) {
    if (!capabilities.has(capability)) fail(`${entry.id} has invalid capability ${capability}`);
  }
  if (entry.agentroveAgentKind && !agentroveAgentKinds.has(entry.agentroveAgentKind)) {
    fail(`${entry.id} has invalid agentroveAgentKind ${entry.agentroveAgentKind}`);
  }
}

for (const id of requiredFirstClassIds) {
  const entry = registry.find((candidate) => candidate.id === id);
  if (!entry) fail(`missing first-class harness: ${id}`);
  if (entry.tier !== 'first_class') fail(`${id} must be first_class`);
}

for (const id of secondaryIds) {
  const entry = registry.find((candidate) => candidate.id === id);
  if (!entry) fail(`missing secondary harness: ${id}`);
  if (entry.tier !== 'secondary') fail(`${id} must be secondary`);
}

const openclaw = registry.find((entry) => entry.id === 'openclaw');
if (!openclaw) fail('OpenClaw entry missing');
if (openclaw.supportsMutation) fail('OpenClaw must not support mutation in V1');
if (!openclaw.supportsReadOnly) fail('OpenClaw must support read-only observation');
if (!['read-only', 'observed', 'planned', 'not connected'].includes(openclaw.status)) {
  fail(`OpenClaw status ${openclaw.status} is not allowed for V1`);
}
for (const forbidden of ['terminal_mutation', 'git_mutation', 'file_mutation']) {
  if (openclaw.capabilities.includes(forbidden)) fail(`OpenClaw must not declare ${forbidden}`);
}

const modelSelector = readFileSync(modelSelectorFile, 'utf8');
if (/const\s+AGENT_LABELS\s*:/.test(modelSelector)) {
  fail('ModelSelector must not own hardcoded AGENT_LABELS');
}

console.log(`harness registry check ok: ${registry.length} harnesses`);
