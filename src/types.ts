export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue>;

export type ElizonClientKind = "desktop" | "mobile" | "api";

export interface ElizonClientConfig {
  /** Base URL of the elizon API (e.g. https://www.elizon.app). */
  baseUrl: string;
  /** Bearer session token or API key. */
  token?: string | null;
  /** Sent as X-Elizon-Client. Defaults to "api". */
  clientKind?: ElizonClientKind;
  /** Optional custom fetch implementation (Node 18+, browser, or polyfill). */
  fetch?: typeof fetch;
  /** Additional headers merged into every request. */
  headers?: Record<string, string>;
}

export interface ApiTransport {
  get<T>(path: string, query?: QueryParams): Promise<T>;
  post<T>(path: string, body?: unknown): Promise<T>;
  put<T>(path: string, body?: unknown): Promise<T>;
  patch<T>(path: string, body?: unknown): Promise<T>;
  delete<T>(path: string, query?: QueryParams, body?: unknown): Promise<T>;
}
