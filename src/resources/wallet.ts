import { ResourceClient } from "../resource-client.js";
import type {
  AutoTopupConfig,
  AutoTopupCreateBody,
  AutoTopupListResponse,
  VoucherListResponse,
} from "../schemas/wallet.js";
import type { SuccessResponse } from "../schemas/common.js";

export class WalletResource extends ResourceClient {
  /**
   * Check wallet bonus event eligibility.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  bonusEvent() {
    return this.get<SuccessResponse>("/api/wallet/bonus-event");
  }

  /**
   * List auto top-up configurations.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  autoTopupList() {
    return this.get<AutoTopupListResponse>("/api/balance/auto-topup");
  }

  /**
   * Create an auto top-up configuration.
   * @throws {import("../errors.js").ApiError} `anAutoTopUpForThisDayAlreadyExists`, `amountOutOfRange`, `unauthenticated`
   */
  autoTopupCreate(body: AutoTopupCreateBody) {
    return this.post<
      SuccessResponse & {
        config?: AutoTopupConfig;
        verificationCheckoutUrl?: string;
        verificationRequired?: boolean;
        deferredFirstCharge?: boolean;
        firstChargeOn?: string;
      }
    >("/api/balance/auto-topup", body);
  }

  /**
   * Update an auto top-up configuration.
   * @throws {import("../errors.js").ApiError} `activeAutoTopUpsMustBeRecreatedToChangeTheAmount`, `unauthenticated`
   */
  autoTopupUpdate(id: string, body: { isActive?: boolean; amount?: number }) {
    return this.patch<SuccessResponse & { config?: AutoTopupConfig }>(
      `/api/balance/auto-topup/${encodeURIComponent(id)}`,
      body,
    );
  }

  /**
   * Delete an auto top-up configuration.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  autoTopupDelete(id: string) {
    return this.del<SuccessResponse>(`/api/balance/auto-topup/${encodeURIComponent(id)}`);
  }

  /**
   * List wallet vouchers.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  vouchers(limit = 10, offset = 0) {
    return this.get<VoucherListResponse>("/api/wallet/vouchers", { limit, offset });
  }

  /**
   * Redeem a voucher code.
   * @throws {import("../errors.js").ApiError} `codeHasExpired`, `codeHasAlreadyBeenUsed`, `unauthenticated`
   */
  redeemVoucher(code: string) {
    return this.post<SuccessResponse & { amount?: number }>("/api/wallet/vouchers/redeem", { code });
  }
}
