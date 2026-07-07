import { ResourceClient } from "../resource-client.js";
import type { ByoipStatusResponse } from "../schemas/byoip.js";
import type { SuccessResponse } from "../schemas/common.js";

export class ByoipResource extends ResourceClient {
  /**
   * Get BYOIP network status and assignments.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  status() {
    return this.get<ByoipStatusResponse>("/api/byoip/status");
  }

  /**
   * Assign a BYOIP prefix to a service.
   * @throws {import("../errors.js").ApiError} `byoipInvalidAssignedPrefix`, `serviceNotOwned`, `unauthenticated`
   */
  assign(body: { networkId: string; serviceId: string; assignedPrefix: string; isPrimary?: boolean }) {
    return this.post<SuccessResponse>("/api/byoip/assign", body);
  }

  /**
   * Remove a BYOIP assignment.
   * @throws {import("../errors.js").ApiError} `byoipAssignmentNotFound`, `unauthenticated`
   */
  unassign(assignmentId: string) {
    return this.del<SuccessResponse>(`/api/byoip/assign/${encodeURIComponent(assignmentId)}`);
  }

  /**
   * Schedule cancellation of a BYOIP network.
   * @throws {import("../errors.js").ApiError} `byoipNetworkNotOwned`, `unauthenticated`
   */
  cancel(networkId: string) {
    return this.post<SuccessResponse>("/api/byoip/cancel", { networkId });
  }
}
