import { ResourceClient } from "../resource-client.js";
import type { CountriesResponse, ProductsResponse } from "../schemas/shop.js";

export class ShopResource extends ResourceClient {
  /**
   * List product catalog.
   * @throws {import("../errors.js").ApiError} `internalError`
   */
  products(lang?: string) {
    return this.get<ProductsResponse>("/api/products", { lang });
  }

  /**
   * List available billing countries.
   * @throws {import("../errors.js").ApiError} `failedToFetchCountries`
   */
  countries() {
    return this.get<CountriesResponse>("/api/public/countries");
  }
}
