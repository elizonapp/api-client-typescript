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
}
