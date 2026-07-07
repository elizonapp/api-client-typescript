import { ResourceClient } from "../resource-client.js";
import type {
  FamilyBalanceRequestsResponse,
  FamilyGroupResponse,
  FamilyInvitesResponse,
  FamilyMembersResponse,
} from "../schemas/family.js";
import type { SuccessResponse } from "../schemas/common.js";

export class FamilyResource extends ResourceClient {
  /**
   * Get the current family group.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  group() {
    return this.get<FamilyGroupResponse>("/api/family");
  }

  /**
   * Create a new family group.
   * @throws {import("../errors.js").ApiError} `userAlreadyInFamilyGroup`, `unauthenticated`
   */
  create(name: string) {
    return this.post<SuccessResponse & { group?: unknown }>("/api/family", { name });
  }

  /**
   * List pending invites for a family group.
   * @throws {import("../errors.js").ApiError} `accessDenied`, `unauthenticated`
   */
  invites(groupId: string) {
    return this.get<FamilyInvitesResponse>(`/api/family/${groupId}/invites`);
  }

  /**
   * List members of a family group.
   * @throws {import("../errors.js").ApiError} `accessDenied`, `unauthenticated`
   */
  members(groupId: string) {
    return this.get<FamilyMembersResponse>(`/api/family/${groupId}/members`);
  }

  /**
   * Invite a member to a family group.
   * @throws {import("../errors.js").ApiError} `pendingFamilyInviteExists`, `familyGroupIsFull`, `unauthenticated`
   */
  invite(groupId: string, email: string, role: string) {
    return this.post<SuccessResponse & { invite?: unknown }>(`/api/family/${groupId}/invites`, {
      email,
      role,
    });
  }

  /**
   * List balance requests for a family group.
   * @throws {import("../errors.js").ApiError} `accessDenied`, `unauthenticated`
   */
  balanceRequests(groupId: string, status?: string) {
    return this.get<FamilyBalanceRequestsResponse>(`/api/family/${groupId}/balance-requests`, {
      status,
    });
  }

  /**
   * Remove a member from a family group.
   * @throws {import("../errors.js").ApiError} `cannotRemoveFamilyGroupOwner`, `onlyParentsCanRemoveMembers`, `unauthenticated`
   */
  removeMember(groupId: string, userId: string) {
    return this.del<SuccessResponse>(`/api/family/${groupId}/members/${encodeURIComponent(userId)}`);
  }

  /**
   * Update a family member's role or billing mode.
   * @throws {import("../errors.js").ApiError} `cannotAssignMinorRoleToAdult`, `unauthenticated`
   */
  updateMember(groupId: string, userId: string, body: { role?: string; familyBillingMode?: string | null }) {
    return this.patch<SuccessResponse>(`/api/family/${groupId}/members/${encodeURIComponent(userId)}`, body);
  }
}
