/**
 * Checkout example for @elizonapp/api-client
 *
 * Run: npx tsx examples/checkout.ts
 */
import { ApiError, ElizonClient } from "../src/index.js";

const BASE_URL = process.env.ELIZON_API_URL ?? "https://www.elizon.app";
const TOKEN = process.env.ELIZON_TOKEN;

async function main() {
  if (!TOKEN) {
    console.error("Set ELIZON_TOKEN (session token or API key).");
    process.exit(1);
  }

  const client = new ElizonClient({
    baseUrl: BASE_URL,
    token: TOKEN,
    clientKind: "desktop",
  });

  try {
    const bootstrap = await client.checkout.bootstrap();
    console.log("Addresses:", bootstrap.addresses.length);
    console.log("Countries:", bootstrap.countries.length);

    const catalog = await client.shop.products("en");
    console.log("Product categories:", catalog.categories?.length ?? 0);

    const items = [
      {
        lineId: "line-1",
        productId: process.env.ELIZON_PRODUCT_ID ?? "example-product-id",
        productName: "Example Product",
        quantity: 1,
        billingCycle: 30,
        itemType: "new",
      },
    ];

    const validation = await client.checkout.validate(items);
    console.log("Cart valid:", validation.success, validation.unavailable?.length ?? 0, "unavailable");

    const calculation = await client.checkout.calculate({
      items,
      countryCode: bootstrap.addresses[0]?.countryCode ?? "DE",
    });
    console.log("Calculated total:", calculation.total);
  } catch (err) {
    if (err instanceof ApiError) {
      console.error("API error:", err.code, err.status);
    } else {
      throw err;
    }
  }
}

main();
