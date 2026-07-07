export interface FamilyGroup {
  id: string;
  name: string;
  status?: string;
  [key: string]: unknown;
}

export interface FamilyMember {
  id: string;
  userId: string;
  role: string;
  [key: string]: unknown;
}

export interface FamilyInvite {
  id: string;
  email: string;
  role: string;
  status: string;
  [key: string]: unknown;
}

export interface FamilyGroupResponse {
  success: boolean;
  group: FamilyGroup | null;
}

export interface FamilyMembersResponse {
  success: boolean;
  members: FamilyMember[];
}

export interface FamilyInvitesResponse {
  success: boolean;
  invites: FamilyInvite[];
}

export interface FamilyBalanceRequest {
  id: string;
  amount: number;
  status: string;
  [key: string]: unknown;
}

export interface FamilyBalanceRequestsResponse {
  success: boolean;
  requests: FamilyBalanceRequest[];
}
