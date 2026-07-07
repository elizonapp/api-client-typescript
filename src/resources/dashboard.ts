import { ResourceClient } from "../resource-client.js";
import type { ServiceListResponse } from "../schemas/service.js";
import type { SuccessResponse } from "../schemas/common.js";

export class DashboardResource extends ResourceClient {
  /**
   * List services for dashboard overview.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  services(limit = 50) {
    return this.get<ServiceListResponse>("/api/services", { limit });
  }

  /**
   * Count tickets by status.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  tickets(status = "open", limit = 1) {
    return this.get<SuccessResponse & { pagination?: { total: number } }>("/api/tickets", {
      status,
      limit,
    });
  }

  /**
   * Get aggregate bandwidth usage.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  totalBandwidth() {
    return this.get<SuccessResponse & { usage?: { totalGb?: number } }>("/api/services/total-bandwidth");
  }

  /**
   * List maintenance notifications.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  maintenanceNotifications() {
    return this.get<SuccessResponse & { notifications?: Record<string, unknown>[] }>(
      "/api/services/maintenance-notifications",
    );
  }

  /**
   * Get traffic source summary.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  trafficSources() {
    return this.get<{
      success: boolean;
      summary?: {
        walletBalanceTb: number;
        walletUsedTb: number;
        serviceSourceCounts: { SERVICE: number; POOL: number; WALLET: number };
      };
      serviceSources?: unknown[];
    }>("/api/dashboard/traffic-sources");
  }

  /**
   * List monthly promotional offers.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  monthlyOffers() {
    return this.get<SuccessResponse & { offers?: unknown[] }>("/api/user/monthly-offers");
  }
}
