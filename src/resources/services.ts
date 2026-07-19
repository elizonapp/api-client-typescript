import { ResourceClient } from "../resource-client.js";
import type {
  ActionDispatchResponse,
  ProviderViewResponse,
  ServiceDetailResponse,
  ServiceListResponse,
  StatusBatchResponse,
} from "../schemas/service.js";

export class ServicesResource extends ResourceClient {
  /**
   * Get a single service by ID.
   * @throws {import("../errors.js").ApiError} `serviceNotFound`, `unauthenticated`, `accessDenied`
   */
  find(id: string) {
    return this.get<ServiceDetailResponse>(`/api/services/${id}`);
  }

  /**
   * List services for the current account.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  list(limit = 50, view?: string) {
    return this.get<ServiceListResponse>("/api/services", { limit, view });
  }

  /**
   * Get the serialized provider view model for a service.
   * @throws {import("../errors.js").ApiError} `serviceNotFound`, `unauthenticated`, `accessDenied`
   */
  view(id: string) {
    return this.get<ProviderViewResponse>(`/api/services/${encodeURIComponent(id)}/view`);
  }

  /**
   * Dispatch a provider action (start, stop, restart, etc.).
   * @throws {import("../errors.js").ApiError} `invalidAction`, `serviceNotFound`, `unauthenticated`
   */
  action(id: string, key: string, body?: Record<string, unknown>) {
    return this.post<ActionDispatchResponse>(
      `/api/services/${encodeURIComponent(id)}/actions/${encodeURIComponent(key)}`,
      body ?? {},
    );
  }

  /**
   * Batch-fetch status for multiple services.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `invalidRequest`
   */
  statusBatch(ids: string[]) {
    return this.post<StatusBatchResponse>("/api/services/status-batch", { ids });
  }

  /**
   * Fetch storage usage history for a website hosting service.
   */
  storageHistory(id: string, hours = 72) {
    return this.get<{ serviceId: string; points: Array<{ at: string; bytes: string; gb: number }> }>(
      `/api/services/${encodeURIComponent(id)}/ploi/storage-history`,
      { hours }
    );
  }

  /**
   * Get or apply the DNS blueprint for a website hosting service.
   */
  siteDns(id: string, body?: Record<string, unknown>) {
    const path = `/api/services/${encodeURIComponent(id)}/ploi/dns`;
    return body
      ? this.post<Record<string, unknown>>(path, body)
      : this.get<Record<string, unknown>>(path);
  }

  /** @deprecated Use {@link siteDns} */
  ploiDns(id: string, body?: Record<string, unknown>) {
    return this.siteDns(id, body);
  }

  /**
   * Get panel credentials for a shared hosting service.
   * Password is only included when `reveal` is true (requires settings permission).
   */
  hostingCredentials(id: string, opts?: { reveal?: boolean }) {
    return this.get<{
      panelUrl: string | null;
      login: string | null;
      email: string | null;
      hasPassword: boolean;
      password: string | null;
    }>(`/api/services/${encodeURIComponent(id)}/plesk/credentials`, {
      reveal: opts?.reveal ? "1" : undefined,
    });
  }

  /**
   * Rotate the panel password for a shared hosting service.
   */
  rotateHostingCredentials(id: string) {
    return this.post<{
      ok: boolean;
      password: string;
      panelUrl?: string;
      login?: string;
      email?: string;
    }>(`/api/services/${encodeURIComponent(id)}/plesk/credentials`, {});
  }

  /**
   * List domains linked to a shared hosting service.
   */
  hostingDomains(id: string) {
    return this.get<{
      domains: unknown;
      lastDomainSyncAt?: string;
      lastManualRefreshAt?: string;
      maxDomains?: number;
      storagePerDomainGb?: number;
      maxMailboxesPerDomain?: number;
      dnsManagement?: number;
    }>(`/api/services/${encodeURIComponent(id)}/plesk/domains`);
  }

  /**
   * Refresh the domain list for a shared hosting service.
   */
  refreshHostingDomains(id: string) {
    return this.post<{ ok: boolean; domains: unknown }>(
      `/api/services/${encodeURIComponent(id)}/plesk/domains`,
      {},
    );
  }
}
