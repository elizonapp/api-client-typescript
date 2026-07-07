import { ResourceClient } from "../resource-client.js";
import type {
  CalculatePayload,
  CartCalculateResponse,
  CartValidateResponse,
  CheckoutBootstrap,
  CheckoutSubmitPayload,
  CheckoutSubmitResponse,
} from "../schemas/checkout.js";
import type { CountriesResponse } from "../schemas/shop.js";

export class CheckoutResource extends ResourceClient {
  /**
   * Load checkout bootstrap data (addresses, countries, billing config).
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  bootstrap() {
    return this.get<CheckoutBootstrap>("/api/checkout/bootstrap");
  }

  /**
   * List available billing countries.
   * @throws {import("../errors.js").ApiError} `failedToFetchCountries`
   */
  countries() {
    return this.get<CountriesResponse>("/api/public/countries");
  }

  /**
   * Validate cart items before checkout.
   * @throws {import("../errors.js").ApiError} `cartEmpty`, `catalogStockExhausted`, `checkoutValidationFailed`
   */
  validate(items: Array<Record<string, unknown>>) {
    return this.post<CartValidateResponse>("/api/cart/validate", { items });
  }

  /**
   * Calculate cart totals including tax.
   * @throws {import("../errors.js").ApiError} `calculationFailed`, `invalidRequest`
   */
  calculate(payload: CalculatePayload) {
    return this.post<CartCalculateResponse>("/api/cart/calculate", payload);
  }

  /**
   * Submit checkout and create order/subscription.
   * @throws {import("../errors.js").ApiError} `checkoutFailed`, `insufficientBalance`, `clientPlatformNotAllowed`, `familyBudgetExhausted`
   */
  submit(payload: CheckoutSubmitPayload) {
    return this.post<CheckoutSubmitResponse>("/api/checkout", payload);
  }
}
