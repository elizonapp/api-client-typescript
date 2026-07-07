import { ResourceClient } from "../resource-client.js";
import type { BusinessBillingResponse, BusinessFundStatusResponse } from "../schemas/business.js";
import type { SuccessResponse } from "../schemas/common.js";

export class BusinessResource extends ResourceClient {
  /**
   * Get business fund contract status.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `customerFeatureUnavailable`
   */
  fund() {
    return this.get<BusinessFundStatusResponse>("/api/business/fund");
  }

  /**
   * Request a new business fund contract.
   * @throws {import("../errors.js").ApiError} `amountAndBindingPeriodAreRequired`, `unauthenticated`, `clientPlatformNotAllowed`
   */
  requestFund(amount: number, bindingMonths: number) {
    return this.post<SuccessResponse & { contractId?: string }>("/api/business/fund", {
      amount,
      bindingMonths,
    });
  }

  /**
   * Accept a pending business fund offer.
   * @throws {import("../errors.js").ApiError} `insufficientBalance`, `clientPlatformNotAllowed`, `unauthenticated`
   */
  acceptFund(offerId: string, paymentMethod: "mollie" | "guthaben" = "mollie") {
    return this.post<SuccessResponse & { checkoutUrl?: string | null }>(
      `/api/business/fund/${encodeURIComponent(offerId)}/accept`,
      { paymentMethod },
    );
  }

  /**
   * Cancel an active business fund contract.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `clientPlatformNotAllowed`
   */
  cancelFund(contractId: string) {
    return this.post<SuccessResponse>(`/api/business/fund/${encodeURIComponent(contractId)}/cancel`, {});
  }

  /**
   * Get business billing configuration.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `customerFeatureUnavailable`
   */
  billing() {
    return this.get<BusinessBillingResponse>("/api/business/billing");
  }
}
