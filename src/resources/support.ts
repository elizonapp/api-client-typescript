import { ResourceClient } from "../resource-client.js";
import type {
  KnowledgeBaseResponse,
  TicketDetailResponse,
  TicketListResponse,
} from "../schemas/ticket.js";
import type { SuccessResponse } from "../schemas/common.js";

export class SupportResource extends ResourceClient {
  /**
   * List support tickets.
   * @throws {import("../errors.js").ApiError} `unauthenticated`
   */
  tickets(limit = 100, status?: string) {
    return this.get<TicketListResponse>("/api/tickets", {
      limit,
      ...(status ? { status } : {}),
    });
  }

  /**
   * Get a single ticket.
   * @throws {import("../errors.js").ApiError} `ticketNotFound`, `unauthenticated`
   */
  ticket(id: string) {
    return this.get<TicketDetailResponse>(`/api/tickets/${id}`);
  }

  /**
   * Create a support ticket.
   * @throws {import("../errors.js").ApiError} `invalidPriority`, `unauthenticated`
   */
  createTicket(body: { subject: string; message: string; priority: string }) {
    return this.post<SuccessResponse & { ticket?: unknown }>("/api/tickets", body);
  }

  /**
   * Reply to a ticket.
   * @throws {import("../errors.js").ApiError} `ticketNotFound`, `unauthenticated`
   */
  reply(ticketId: string, content: string) {
    return this.post<SuccessResponse>(`/api/tickets/${ticketId}/messages`, { content });
  }

  /**
   * Browse knowledge base articles.
   * @throws {import("../errors.js").ApiError} `internalError`
   */
  knowledgeBase(lang?: string) {
    return this.get<KnowledgeBaseResponse>("/api/knowledge-base", { lang });
  }
}
