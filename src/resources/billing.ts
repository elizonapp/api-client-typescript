import { ResourceClient } from "../resource-client.js";
import type { QueryParams } from "../types.js";
import type {
  InvoiceDetailResponse,
  InvoiceListResponse,
  InvoicePayBody,
  InvoicePayResult,
  NetPointsPreviewResponse,
  PaymentMethodsResult,
  SubscriptionsResponse,
} from "../schemas/invoice.js";
import type { SuccessResponse } from "../schemas/common.js";

export type InvoiceListFilters = {
  status?: string;
  serviceId?: string;
  limit?: number;
  offset?: number;
};

export class BillingResource extends ResourceClient {
  /**
   * List invoices with optional filters.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  invoices(limitOrFilters: number | InvoiceListFilters = 50) {
    const query: QueryParams =
      typeof limitOrFilters === "number"
        ? { limit: limitOrFilters }
        : {
            limit: limitOrFilters.limit ?? 50,
            offset: limitOrFilters.offset,
            status: limitOrFilters.status,
            serviceId: limitOrFilters.serviceId,
          };
    return this.get<InvoiceListResponse>("/api/invoices", query);
  }

  /**
   * Get a single invoice by ID.
   * @throws {import("../errors.js").ApiError} `invoiceNotFound`, `unauthenticated`
   */
  invoice(id: string) {
    return this.get<InvoiceDetailResponse>(`/api/invoices/${id}`);
  }

  /**
   * Pay an open invoice.
   * @throws {import("../errors.js").ApiError} `invoiceNotFound`, `insufficientBalance`, `invalidPaymentMethod`, `clientPlatformNotAllowed`
   */
  payInvoice(id: string, body: InvoicePayBody) {
    return this.post<InvoicePayResult>(`/api/invoices/${id}/pay`, body);
  }

  /**
   * Preview net points redemption for an order total.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `invalidAmount`
   */
  netPointsPreview(orderTotal: number) {
    return this.post<NetPointsPreviewResponse>("/api/netpoints/preview", { orderTotal });
  }

  /**
   * List active subscriptions.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  subscriptions() {
    return this.get<SubscriptionsResponse>("/api/user/subscriptions");
  }

  /**
   * List saved payment methods.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  paymentMethods() {
    return this.get<PaymentMethodsResult>("/api/account/payment-methods");
  }

  /**
   * Start adding a new payment method (returns checkout URL).
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `clientPlatformNotAllowed`
   */
  addPaymentMethod() {
    return this.post<SuccessResponse & { checkoutUrl?: string }>("/api/account/payment-methods");
  }

  /**
   * Set the default payment method.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `invalidRequest`
   */
  setDefaultPaymentMethod(mandateId: string) {
    return this.patch<SuccessResponse>("/api/account/payment-methods", { mandateId });
  }

  /**
   * Update a payment method label.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `invalidRequest`
   */
  updatePaymentMethodLabel(mandateId: string, userLabel: string, setDefault = false) {
    return this.patch<SuccessResponse>("/api/account/payment-methods", {
      mandateId,
      userLabel,
      setDefault,
    });
  }

  /**
   * Remove a saved payment method.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `invalidRequest`
   */
  deletePaymentMethod(mandateId: string) {
    return this.del<SuccessResponse>(`/api/account/payment-methods/${encodeURIComponent(mandateId)}`);
  }
}
