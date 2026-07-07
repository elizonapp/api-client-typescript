import { ResourceClient } from "../resource-client.js";
import type { DnsRecordListResponse, DomainListResponse } from "../schemas/domain.js";
import type { SuccessResponse } from "../schemas/common.js";

export class DomainsResource extends ResourceClient {
  /**
   * List registered domains.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  list() {
    return this.get<DomainListResponse>("/api/domains");
  }

  /**
   * Add a domain to the account.
   * @throws {import("../errors.js").ApiError} `domainCurrentlyUnavailable`, `unauthenticated`
   */
  add(domain: string) {
    return this.post<SuccessResponse>("/api/domains/add", { domain });
  }

  /**
   * List DNS records for a domain.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `accessDenied`
   */
  records(domainId: string) {
    return this.get<DnsRecordListResponse>(`/api/domains/${domainId}/records`);
  }

  /**
   * Create a DNS record.
   * @throws {import("../errors.js").ApiError} `invalidRequest`, `unauthenticated`
   */
  createRecord(domainId: string, body: Record<string, unknown>) {
    return this.post<SuccessResponse>(`/api/domains/${domainId}/records`, body);
  }

  /**
   * Delete a DNS record.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `accessDenied`
   */
  deleteRecord(domainId: string, recordId: string) {
    return this.del<SuccessResponse>(`/api/domains/${domainId}/records/${recordId}`);
  }
}
