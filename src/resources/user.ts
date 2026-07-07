import { ResourceClient } from "../resource-client.js";
import type { ApiKey, AuditLogEntry, SupportPinResponse } from "../schemas/user.js";
import type { SuccessResponse } from "../schemas/common.js";

export class UserResource extends ResourceClient {
  /**
   * List audit log entries.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  auditLog(limit = 50) {
    return this.get<SuccessResponse & { logs: AuditLogEntry[] }>("/api/user/audit-log", { limit });
  }

  /**
   * Check GDPR export warnings (dry run).
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  gdprExportCheck() {
    return this.del<SuccessResponse & { warnings?: string[] }>("/api/user/gdpr-export");
  }

  /**
   * Confirm GDPR data export.
   * @throws {import("../errors.js").ApiError} `incorrectPassword`, `unauthenticated`
   */
  gdprExportConfirm(password: string) {
    return this.del<SuccessResponse>("/api/user/gdpr-export", { confirm: "true" }, { password });
  }

  /**
   * List API keys.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  apiKeys(page = 1, pageSize = 50) {
    return this.get<SuccessResponse & { apiKeys: ApiKey[]; total?: number }>("/api/api-keys", {
      page,
      pageSize,
    });
  }

  /**
   * Create a new API key.
   * @throws {import("../errors.js").ApiError} `unauthenticated`, `invalidRequest`
   */
  createApiKey(name: string) {
    return this.post<SuccessResponse & { apiKey: ApiKey; secret: string }>("/api/api-keys", { name });
  }

  /**
   * Revoke an API key.
   * @throws {import("../errors.js").ApiError} `apiKeyNotFound`, `unauthenticated`
   */
  revokeApiKey(id: string) {
    return this.del<SuccessResponse>("/api/api-keys", { id });
  }

  /**
   * Get current support PIN status.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  supportPin() {
    return this.get<SupportPinResponse>("/api/user/support-pin");
  }

  /**
   * Generate a new support PIN.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  generateSupportPin() {
    return this.post<SupportPinResponse>("/api/user/support-pin");
  }
}
