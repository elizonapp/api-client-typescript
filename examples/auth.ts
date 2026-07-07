/**
 * Authentication example for @elizonapp/api-client
 *
 * Run: npx tsx examples/auth.ts
 */
import { ApiError, ElizonClient } from "../src/index.js";

const BASE_URL = process.env.ELIZON_API_URL ?? "https://www.elizon.app";

async function main() {
  const client = new ElizonClient({
    baseUrl: BASE_URL,
    clientKind: "api",
  });

  const email = process.env.ELIZON_EMAIL;
  const password = process.env.ELIZON_PASSWORD;

  if (!email || !password) {
    console.error("Set ELIZON_EMAIL and ELIZON_PASSWORD environment variables.");
    process.exit(1);
  }

  try {
    const login = await client.auth.login({
      email,
      password,
      rememberMe: true,
    });

    if (login.requiresTwoFactor) {
      console.log("Two-factor authentication required.");
      return;
    }

    if (login.token) {
      client.setToken(login.token);
    }

    const me = await client.auth.me();
    console.log("Authenticated user:", me.user.id, me.user.email);

    const sessions = await client.auth.sessions();
    console.log("Active sessions:", sessions.sessions.length);
  } catch (err) {
    if (err instanceof ApiError) {
      console.error("API error:", err.code, err.status);
    } else {
      throw err;
    }
  }
}

main();
