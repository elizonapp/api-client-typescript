# @elizonapp/api-client

Official TypeScript client for the [elizon](https://www.elizon.app) hosting API.

Machine-facing SDK — no localized error messages. API failures throw `ApiError` with a machine-readable `code`, HTTP `status`, and raw `payload`. Map `code` to your own i18n layer.

## Install

```bash
npm install @elizonapp/api-client
```

Requires Node.js 18+ (native `fetch`) or any environment with a `fetch` polyfill.

## Quick start

```ts
import { ElizonClient, ApiError } from "@elizonapp/api-client";

const client = new ElizonClient({
  baseUrl: "https://www.elizon.app",
  clientKind: "api",
});

// Login
const { token } = await client.auth.login({
  email: "you@example.com",
  password: "secret",
  rememberMe: true,
});
client.setToken(token!);

// List services
const { services } = await client.services.list();

// Error handling
try {
  await client.billing.payInvoice("inv_123", { paymentMethod: "guthaben" });
} catch (err) {
  if (err instanceof ApiError) {
    console.log(err.code);    // e.g. "insufficientBalance"
    console.log(err.status);  // e.g. 400
    console.log(err.payload); // raw API body
  }
}
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | `string` | required | elizon API base URL |
| `token` | `string \| null` | `null` | Bearer session token or API key |
| `clientKind` | `"desktop" \| "mobile" \| "api"` | `"api"` | Sent as `X-Elizon-Client` header |
| `fetch` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation |
| `headers` | `Record<string, string>` | `{}` | Extra headers on every request |

### Client kind

Some financially sensitive endpoints (checkout, invoice payment, business fund) require `clientKind: "desktop"`. The server rejects `mobile` clients for these actions.

### API keys

Create an API key via `client.user.createApiKey(name)`, then pass the secret as `token`:

```ts
const client = new ElizonClient({
  baseUrl: "https://www.elizon.app",
  token: process.env.ELIZON_API_KEY,
});
```

## Resources

| Namespace | Description |
|-----------|-------------|
| `auth` | Login, sessions, 2FA, profile |
| `services` | VMs, containers, provider actions |
| `billing` | Invoices, subscriptions, payment methods |
| `checkout` | Cart validation, calculation, submit |
| `shop` | Product catalog |
| `dashboard` | Overview metrics |
| `domains` | Domain & DNS management |
| `subdomains` | Subdomain management |
| `ipManager` | IP assignment |
| `sshKeys` | SSH key management |
| `support` | Tickets, knowledge base |
| `user` | Audit log, API keys, GDPR export |
| `wallet` | Balance, vouchers, auto top-up |
| `business` | Business fund contracts |
| `affiliates` | Affiliate commissions & payouts |
| `family` | Family group management |
| `byoip` | Bring-your-own-IP |
| `floatingIps` | Floating IP management |

## Error codes

See [docs/ERROR_CODES.md](./docs/ERROR_CODES.md) for common codes and handling patterns.

All codes are exported as `ApiErrorCodes` and `ApiErrorCode` type.

## Examples

```bash
ELIZON_EMAIL=... ELIZON_PASSWORD=... npx tsx examples/auth.ts
ELIZON_TOKEN=... npx tsx examples/services.ts
ELIZON_TOKEN=... npx tsx examples/checkout.ts
ELIZON_TOKEN=... ELIZON_INVOICE_ID=... npx tsx examples/pay-invoice.ts
```

## Development

```bash
npm install
npm run build
```

Output is written to `dist/`.

## License

MIT — see [LICENSE](./LICENSE).
