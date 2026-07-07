export interface AuditLogEntry {
  id: string;
  action: string;
  createdAt: string;
  [key: string]: unknown;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsedAt?: string | null;
  [key: string]: unknown;
}

export interface SupportPinResponse {
  supportPin: string | null;
  pinExpiresAt: string | null;
  pinTimeLeft: number | null;
  pinCooldown: number | null;
}
