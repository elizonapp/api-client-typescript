import { ElizonClient as BaseClient } from "./client.js";
import type { ElizonClientConfig } from "./types.js";
import {
  AffiliatesResource,
  AuthResource,
  BillingResource,
  BusinessResource,
  ByoipResource,
  CheckoutResource,
  DashboardResource,
  DomainsResource,
  FamilyResource,
  FloatingIpsResource,
  IpManagerResource,
  ServicesResource,
  ShopResource,
  SshKeysResource,
  SubdomainsResource,
  SupportResource,
  UserResource,
  WalletResource,
} from "./resources/index.js";

/**
 * Full elizon API client with typed resource namespaces.
 *
 * @example
 * ```ts
 * const client = new ElizonClient({ baseUrl: "https://www.elizon.app" });
 * const result = await client.auth.login({ email, password, rememberMe: true });
 * client.setToken(result.token!);
 * const services = await client.services.list();
 * ```
 */
export class ElizonClient extends BaseClient {
  public readonly auth: AuthResource;
  public readonly services: ServicesResource;
  public readonly billing: BillingResource;
  public readonly checkout: CheckoutResource;
  public readonly shop: ShopResource;
  public readonly dashboard: DashboardResource;
  public readonly domains: DomainsResource;
  public readonly subdomains: SubdomainsResource;
  public readonly ipManager: IpManagerResource;
  public readonly sshKeys: SshKeysResource;
  public readonly support: SupportResource;
  public readonly user: UserResource;
  public readonly wallet: WalletResource;
  public readonly business: BusinessResource;
  public readonly affiliates: AffiliatesResource;
  public readonly family: FamilyResource;
  public readonly byoip: ByoipResource;
  public readonly floatingIps: FloatingIpsResource;

  constructor(config: ElizonClientConfig) {
    super(config);
    this.auth = new AuthResource(this);
    this.services = new ServicesResource(this);
    this.billing = new BillingResource(this);
    this.checkout = new CheckoutResource(this);
    this.shop = new ShopResource(this);
    this.dashboard = new DashboardResource(this);
    this.domains = new DomainsResource(this);
    this.subdomains = new SubdomainsResource(this);
    this.ipManager = new IpManagerResource(this);
    this.sshKeys = new SshKeysResource(this);
    this.support = new SupportResource(this);
    this.user = new UserResource(this);
    this.wallet = new WalletResource(this);
    this.business = new BusinessResource(this);
    this.affiliates = new AffiliatesResource(this);
    this.family = new FamilyResource(this);
    this.byoip = new ByoipResource(this);
    this.floatingIps = new FloatingIpsResource(this);
  }
}

export { ApiError } from "./errors.js";
export { extractErrorCode } from "./extract-error-code.js";
export { ApiErrorCodes, ALL_API_ERROR_CODES, type ApiErrorCode } from "./error-codes.js";
export type { ElizonClientConfig, ElizonClientKind, QueryParams, QueryValue, ApiTransport } from "./types.js";
export { ResourceClient } from "./resource-client.js";
export * from "./resources/index.js";
export * as schemas from "./schemas/index.js";
