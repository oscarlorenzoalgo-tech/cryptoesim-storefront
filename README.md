# CryptoEsim storefront

Travel eSIM purchases with Algorand USDC. English by default, with English, Spanish, French and German image flags. Explicit wallet/account selection through Lute; no Pera SDK or automatic reconnect.

Four website files: `cryptoesim.html`, `scarlet.css`, `journey.js`, `store-settings.js`. No npm install or build system is required. `journey.js` includes readable application code and its pinned bundled dependencies (Lute Connect 3.0.1, algosdk 3.7.0, buffer 6.0.3), preserving library notices. Translations are embedded in that file. Search for the `phrases` object to edit them.

## Render Static Site

Name: `cryptoesim` (subject to availability). Branch: `main`. Root directory: leave empty.

Build command:

```bash
mkdir -p public && cp cryptoesim.html public/index.html && cp scarlet.css journey.js store-settings.js public/
```

Publish directory: `public`. No environment variables, no API keys, no server secrets.

Set the API's actual HTTPS origin in `store-settings.js`:

```js
window.CRYPTOESIM_API = "https://YOUR-API-SERVICE.onrender.com";
```

Set `STORE_ORIGIN` on the backend to this static site's actual HTTPS origin. Do not use guessed URLs or a trailing slash. Commit the settings change to redeploy.

The local combined package serves both parts from one origin and can leave the API setting empty. Local purchases remain explicitly simulated in checkout and receipts; no real eSIM is emitted. Production Mainnet requires the seller's configured backend and activated sales.

The receipt links an order, payment and encrypted installation. Recovery files provide private access to orders; customers should store them safely. Removing a browser's storage does not delete the server order.
