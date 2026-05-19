import registryJson from './mybox-harness-registry.json';
import type { AgentKind } from '@/types/chat.types';

export type MyBoxHarnessTier = 'first_class' | 'secondary';

export type MyBoxHarnessTruthLabel =
  | 'live'
  | 'local'
  | 'observed'
  | 'read-only'
  | 'mock'
  | 'planned'
  | 'not connected';

export type MyBoxHarnessAdapterKind = 'acp' | 'cli' | 'api' | 'log-observer' | 'planned';

export type MyBoxHarnessCapability =
  | 'chat'
  | 'streaming'
  | 'thinking_summary'
  | 'tool_cards'
  | 'permission_prompts'
  | 'terminal_observation'
  | 'terminal_mutation'
  | 'diff_observation'
  | 'git_mutation'
  | 'file_observation'
  | 'file_mutation'
  | 'session_list'
  | 'session_resume'
  | 'read_only_observation'
  | 'subagent_observation';

export type MyBoxHarnessAuthRequirement =
  | 'none'
  | 'local_cli'
  | 'api_key'
  | 'hosted_login'
  | 'unknown';

export type MyBoxHarnessSessionScope = 'workspace' | 'global' | 'external' | 'unknown';

export type MyBoxHarnessEventSource =
  | 'acp'
  | 'pty'
  | 'websocket'
  | 'http'
  | 'filesystem'
  | 'manual_fixture';

export type MyBoxHarnessPermissionModel = 'agentrove' | 'external' | 'none' | 'unknown';

export interface MyBoxHarnessDefinition {
  id: string;
  displayName: string;
  tier: MyBoxHarnessTier;
  adapterKind: MyBoxHarnessAdapterKind;
  status: MyBoxHarnessTruthLabel;
  capabilities: readonly MyBoxHarnessCapability[];
  supportsMutation: boolean;
  supportsReadOnly: boolean;
  authRequirement: MyBoxHarnessAuthRequirement;
  sessionScope: MyBoxHarnessSessionScope;
  eventSources: readonly MyBoxHarnessEventSource[];
  permissionModel: MyBoxHarnessPermissionModel;
  agentroveAgentKind?: AgentKind;
  notes?: string;
}

export const MYBOX_HARNESS_REGISTRY = registryJson as readonly MyBoxHarnessDefinition[];

const harnessByAgentKind = new Map<AgentKind, MyBoxHarnessDefinition>();

for (const harness of MYBOX_HARNESS_REGISTRY) {
  if (harness.agentroveAgentKind) {
    harnessByAgentKind.set(harness.agentroveAgentKind, harness);
  }
}

export function getHarnessForAgentKind(agentKind: AgentKind): MyBoxHarnessDefinition | undefined {
  return harnessByAgentKind.get(agentKind);
}

export function getHarnessDisplayNameForAgentKind(agentKind: AgentKind): string {
  return getHarnessForAgentKind(agentKind)?.displayName ?? agentKind;
}

export function getFirstClassHarnesses(): readonly MyBoxHarnessDefinition[] {
  return MYBOX_HARNESS_REGISTRY.filter((harness) => harness.tier === 'first_class');
}

export function getSecondaryHarnesses(): readonly MyBoxHarnessDefinition[] {
  return MYBOX_HARNESS_REGISTRY.filter((harness) => harness.tier === 'secondary');
}
