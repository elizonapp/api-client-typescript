import { ResourceClient } from "../resource-client.js";
import type {
  LoginResponse,
  MeResponse,
  SessionsResponse,
  TwoFactorEnableResponse,
  TwoFactorSetupResponse,
} from "../schemas/auth.js";
import type { SuccessResponse } from "../schemas/common.js";

export class AuthResource extends ResourceClient {
  /**
   * Authenticate with email and password.
   * @throws {import("../errors.js").ApiError} `invalidEmailOrPassword`, `authenticationFailed`, `invalidVerificationCode`
   */
  login(data: { email: string; password: string; twoFactorCode?: string; rememberMe: boolean }) {
    return this.post<LoginResponse>("/api/auth/login", data);
  }

  /**
   * Get the current authenticated user.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  me() {
    return this.get<MeResponse>("/api/auth/me");
  }

  /**
   * Update profile fields.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `invalidRequest`
   */
  updateProfile(data: { firstName?: string; lastName?: string; nickname?: string }) {
    return this.put<SuccessResponse>("/api/auth/me", data);
  }

  /**
   * End the current session.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  logout() {
    return this.post<SuccessResponse>("/api/auth/logout");
  }

  /**
   * End all sessions for the account.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  logoutAll() {
    return this.del<SuccessResponse>("/api/auth/logout");
  }

  /**
   * Change account password.
   * @throws {import("../errors.js").ApiError} `currentPasswordIsIncorrect`, `invalidPassword`, `unauthenticated`
   */
  changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.post<SuccessResponse>("/api/auth/change-password", data);
  }

  /**
   * List active sessions.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `failedToGetSessions`
   */
  sessions() {
    return this.get<SessionsResponse>("/api/auth/sessions");
  }

  /**
   * Revoke a specific session.
   * @throws {import("../errors.js").ApiError} `cannotRevokeCurrentSessionUseLogoutInstead`, `unauthenticated`
   */
  revokeSession(id: string) {
    return this.del<SuccessResponse>("/api/auth/sessions", { id });
  }

  /**
   * Begin two-factor authentication setup.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  setup2fa() {
    return this.get<TwoFactorSetupResponse>("/api/auth/2fa/setup");
  }

  /**
   * Confirm and enable two-factor authentication.
   * @throws {import("../errors.js").ApiError} `invalidVerificationCode`, `unauthenticated`
   */
  enable2fa(code: string) {
    return this.post<TwoFactorEnableResponse>("/api/auth/2fa/setup", { code });
  }

  /**
   * Disable two-factor authentication.
   * @throws {import("../errors.js").ApiError} `incorrectPassword`, `invalidVerificationCode`, `unauthenticated`
   */
  disable2fa(code: string, password: string) {
    return this.del<SuccessResponse & { twoFactorStillEnabled?: boolean }>(
      "/api/auth/2fa/setup",
      undefined,
      { code, password },
    );
  }
}
