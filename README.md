# CryptoEsim — Storefront

**Travel connectivity, paid with USDC on Algorand.**

CryptoEsim lets travelers choose an eSIM data plan and pay from their Algorand wallet without a bank card or subscription. The same service is available to developers and authorized agents through its x402 API.

- [Open CryptoEsim](https://cryptoesim-eqyv.onrender.com/)
- [API guide and payment client](https://cryptoesim-eqyv.onrender.com/#api)
- [Backend configuration](https://cryptoesim-engine.onrender.com/api/config)
- [Discovery manifest](https://cryptoesim-engine.onrender.com/.well-known/x402.json)
- [GoPlausible merchant page](https://facilitator.goplausible.xyz/dashboard/merchants/c44019bc97d89323)

## Customer experience

1. Choose a destination and a data plan from the live supplier catalog.
2. Click **Connect Wallet** and authorize one account in the Lute browser extension. The selected address appears directly on the page.
3. Confirm device compatibility, accept the terms, review the USDC price and approve the payment in the wallet.
4. After payment is confirmed, checkout closes and the page takes the customer to **My eSIMs**.
5. The page checks delivery automatically. Once the supplier has issued the eSIM and the signed delivery receipt is verified, it displays the installation QR and activation code.

Customers only need the website, a supported wallet and a compatible unlocked eSIM device. They do not install Python, the backend or a command-line agent.

## Features

- Black and red interface with responsive layouts.
- English by default, with flag controls for Spanish, French and German.
- Lute wallet connection initiated by the user; no automatic connection or second account selector on the page.
- Order-specific prices and wallet checks before signing.
- Persistent order history in the browser and private recovery-file export.
- On-chain payment reference and locally verified signed delivery receipts.
- Automatic delivery updates, installation details, supplier consumption and compatible top-ups.
- Separate purchases of the same plan when previous purchases have already been paid.
- API documentation and a downloadable Node.js payment client.

Countries and plans come from the backend. The site does not claim availability in every country. Usage information can be delayed by the supplier, and top-ups depend on the purchased profile.

## Minimal repository

| File | Purpose |
| --- | --- |
| `cryptoesim.html` | Page markup and dialogs |
| `scarlet.css` | Layout, colors and responsive styles |
| `journey.js` | Storefront behavior, translations, wallet connection, order flow and API guide |
| `store-settings.js` | Public API origin |
| `README.md` | This guide |

`journey.js` already bundles its browser dependencies and license notices. Publishing this repository does not require `npm install`, `node_modules` or a frontend build framework. Never upload provider credentials or wallet secrets.

## Deploy on Render

Create a **Static Site** connected to this repository. Keep these files directly at its root.

| Setting | Value |
| --- | --- |
| Name | `cryptoesim` or the existing assigned site name |
| Branch | `main` |
| Root directory | Leave empty |
| Publish directory | `public` |
| Environment variables | None required |

Build command:

```bash
mkdir -p public && cp cryptoesim.html public/index.html && cp scarlet.css journey.js store-settings.js public/
```

The command publishes `cryptoesim.html` as `index.html`; do not rename the source file or add another entry page.

`store-settings.js` points the published site to `https://cryptoesim-engine.onrender.com`. On localhost it uses the local page's origin, which is why the combined local package serves both the API and web files together.

In the backend Web Service, set `STORE_ORIGIN` to the exact storefront origin, currently `https://cryptoesim-eqyv.onrender.com`, without a trailing slash. It must be the storefront URL, not the backend URL. This enables the browser's cross-origin API calls.

For an existing deployment, commit the updated files and use **Manual Deploy → Deploy latest commit** if needed. Keep `cryptoesim.html`, `journey.js` and `scarlet.css` from the same release; mixing them can leave new controls without their JavaScript behavior. The current asset marker is `20260929-delivery9`.

## Wallet and payment

Install [Lute for Chrome](https://chromewebstore.google.com/detail/lute/kiaoohollfkjhikdifohdckeidckokjh), enable it for the site and reload before connecting. Choose and authorize a single account in the extension. The website never asks for the wallet's recovery phrase.

Pay with **USDC on Algorand Mainnet, ASA `31566704`**. USDC from other networks is not accepted. The page displays **ALGO REQUIRED IN YOUR WALLET — From 0.201 ALGO**; this is starting guidance, and the available balance must also satisfy the account's existing minimum-balance requirements and fees. Connecting the wallet does not make a payment.

The wallet signs the transfer; the backend verifies and settles it through GoPlausible. The payment goes to CryptoEsim's receiving address. eSIM Access fulfilment is paid separately from the merchant's supplier balance. There is no additional customer transfer to a competition wallet.

## My eSIMs and recovery

Payment success and eSIM issuance are displayed separately. The supplier can take time to allocate the profile; the interface refreshes automatically and shows delivery details or a delay message where appropriate. Installation appears only after a completed delivery has been verified.

- **Check delivery** recovers the existing paid order; do not create another payment to retrieve it.
- **Save recovery file** exports private order access. Keep it securely if changing browser or device.
- **Download receipt** exports the completed signed order bundle, which can contain private installation information.
- **Check usage** requests supplier-reported consumption.
- **Top up** offers compatible additional data when supported for that eSIM.

To import a saved order, open `https://cryptoesim-eqyv.onrender.com/?recover=1` and use the recovery controls. Import is deliberately absent from the normal storefront. Clearing browser storage can remove the local order list; retain a recovery file first.

Buying the same plan again creates a new eSIM purchase and a new payment. It is different from recovering a previous purchase. Uncertain payment states remain recoverable so the user can avoid an accidental second charge.

## API for developers and agents

The **API** button next to **How it works** opens the integration guide. It includes free catalog examples, order creation, x402 payment submission, recovery and receipt verification.

Free catalog request:

```bash
curl --fail-with-body 'https://cryptoesim-engine.onrender.com/api/plans?country=ES'
```

**Download payment client** provides `esim-agent.mjs` for Node.js 22+. The buyer installs `algosdk@3.7.0` in a private client folder. The client supports `--catalog`, `--buy`, a maximum USDC budget and `--resume` with the same state file. It signs locally; its mnemonic is not sent to the API. This command-line client is optional and is not required for website customers or Render deployment.

Other applications should call the API from their server or agent. Browser access is restricted to the configured storefront origin. The backend README documents endpoints and deployment settings.

## Local preview

Use the combined local package containing `cryptoesim-engine`, `cryptoesim-storefront` and `abrir-cryptoesim.sh`:

```bash
bash abrir-cryptoesim.sh
```

Open `http://127.0.0.1:8093`. That mode uses simulated payments and delivery without purchasing an eSIM. Opening `cryptoesim.html` directly as a local file does not start the API.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| No countries or request failure | Open `/api/config` on the backend; confirm `STORE_ORIGIN`, API origin and service availability |
| Sales not open | Check `LIVE_SALES_ENABLED` on the backend Web Service |
| Connect Wallet does nothing | Enable Lute, reload the page and deploy matching HTML/JavaScript/CSS files |
| Wallet reports insufficient funds | Confirm Algorand USDC and spendable ALGO in the selected account |
| Paid order is still issuing | Read Delivery details and use Check delivery for the same order |
| Order is missing after changing browser | Import its private recovery file through `/?recover=1` |

Do not post recovery files, activation codes or complete receipt bundles publicly. For a fulfilment problem, contact the support address shown by the service with the order ID and public payment transaction ID.

## Related documentation

- [Render static sites](https://render.com/docs/static-sites)
- [eSIM Access API](https://docs.esimaccess.com/)
- [Algorand x402 discovery and attribution](https://algorand.co/blog/is-your-x402-endpoint-showing-up-in-the-facilitator-leaderboard-how-to-troubleshoot-if-not)
