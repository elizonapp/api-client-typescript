import { ResourceClient } from "../resource-client.js";
import type {
  AffiliateCommissionsResponse,
  AffiliateMeResponse,
  PayoutRequestsResponse,
} from "../schemas/affiliate.js";

export class AffiliatesResource extends ResourceClient {
  /**
   * Get affiliate profile for the current user.
   * @throws {import("../errors.js").ApiError} `affiliateNotFound`, `unauthenticated`
   */
  me() {
    return this.get<AffiliateMeResponse>("/api/affiliates/me");
  }

  /**
   * List affiliate commissions.
   * @throws {import("../errors.js").ApiError} `affiliateNotFound`, `unauthenticated`
   */
  commissions(limit = 50) {
    return this.get<AffiliateCommissionsResponse>("/api/affiliates/me/commissions", { limit });
  }

  /**
   * List payout requests.
   * @throws {import("../errors.js").ApiError} `affiliateNotFound`, `unauthenticated`
   */
  payoutRequests(limit = 20, offset = 0) {
    return this.get<PayoutRequestsResponse>("/api/affiliates/me/payout-requests", { limit, offset });
  }

  /**
   * Get affiliate tax information.
   * @throws {import("../errors.js").ApiError} `affiliateNotFound`, `unauthenticated`
   */
  taxInfo() {
    return this.get<{ success: boolean; taxInfo: unknown | null; profile?: unknown }>(
      "/api/affiliates/me/tax-info",
    );
  }
}
