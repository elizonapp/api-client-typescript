/**
 * Services example for @elizonapp/api-client
 *
 * Run: npx tsx examples/services.ts
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
    clientKind: "api",
  });

  try {
    const list = await client.services.list(20);
    const items = list.services ?? list.servers ?? [];
    console.log("Services:", items.length);

    if (items.length > 0) {
      const first = items[0] as { id: string };
      const detail = await client.services.find(first.id);
      console.log("First service:", detail.server);

      const statuses = await client.services.statusBatch(items.slice(0, 5).map((s) => (s as { id: string }).id));
      console.log("Status batch keys:", Object.keys(statuses.statuses).length);
    }
  } catch (err) {
    if (err instanceof ApiError) {
      console.error("API error:", err.code, err.status);
    } else {
      throw err;
    }
  }
}

main();
