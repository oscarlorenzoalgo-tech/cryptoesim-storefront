// Public API origin only. Never put AccessCode or private keys in this file.
// Local preview uses its local server. Published storefront uses the real API.
window.CRYPTOESIM_API = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)
  ? location.origin
  : "https://cryptoesim-engine.onrender.com";
