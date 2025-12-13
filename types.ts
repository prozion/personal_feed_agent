export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  SOURCES = 'SOURCES',
  FEEDS = 'FEEDS',
  LOGS = 'LOGS',
  SIMULATOR = 'SIMULATOR',
}

export interface MetricData {
  name: string;
  value: number | string;
  change?: number;
  unit?: string;
}

export interface ChartDataPoint {
  time: string;
  tokens: number;
  cost: number;
  posts: number;
}

export enum SourceStatus {
  ACTIVE = 'Active',
  QUARANTINE = 'Quarantine',
  BLOCKED = 'Blocked',
}

export interface Source {
  id: string;
  title: string;
  group: string;
  score: number;
  status: SourceStatus;
  postsPerDay: number;
  lastActive: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  initiator: 'User' | 'Agent';
  details: string;
  status: 'Success' | 'Failed' | 'Warning';
}

export interface FeedPolicy {
  id: string;
  name: string;
  model: string;
  temperature: number;
  promptVersion: string;
  tokenBudget: number;
}
