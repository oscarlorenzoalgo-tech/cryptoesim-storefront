# CryptoEsim storefront

Cuatro archivos de web y esta guía. No necesitas instalar Node ni subir pruebas.

## Actualizar la web ya publicada

1. Sustituye en el repositorio de la web `cryptoesim.html`, `scarlet.css`, `journey.js`, `store-settings.js` y este `README.md`. Sube los archivos, no el ZIP. Haz un commit.
2. `store-settings.js` ya apunta a `https://cryptoesim-engine.onrender.com`. En localhost usa el servidor local automáticamente. No pongas aquí AccessCode ni claves privadas.
3. En Render, abre el **Static Site** de la tienda y copia su URL pública. Abre el **Web Service** `cryptoesim-engine` → Environment. `STORE_ORIGIN` debe ser exactamente la URL del Static Site, con `https://` y sin barra final. No pongas la dirección del backend en `STORE_ORIGIN`. Guarda y espera a que se despliegue si has cambiado ese valor.
4. En el **Static Site**, conserva este Build Command:

```bash
mkdir -p public && cp cryptoesim.html public/index.html && cp scarlet.css journey.js store-settings.js public/
```

Publish Directory: `public`. No se añaden variables a la web. Si no se despliega automáticamente tras el commit, usa **Manual Deploy → Deploy latest commit**.

5. Abre la URL del **Static Site**, no la de `cryptoesim-engine`. Pulsa Ctrl+Shift+R. El enlace de Lute abre Chrome Web Store. Instala o habilita Lute para ese sitio y recarga la pestaña antes de pulsar Connect Wallet. Autoriza la conexión y elige tu cuenta.

## Cambios

- Condiciones, privacidad, idiomas y wallet se inicializan antes de consultar la API.
- Carga de destinos con estado visible, espera para el arranque del servidor y botón de reintento.
- Los cambios rápidos de país no mezclan respuestas de catálogos distintos.
- Conexión mediante la extensión Lute desde el clic del usuario, con mensajes cuando no se detecta o no responde. No hay reconexión automática ni Pera.
- Get Lute enlaza a la extensión oficial de Chrome indicada por el propietario.
- Retirados el texto YOUR CONNECTION, CLOSE AT HAND y el botón Import order de la pantalla principal.
- English predeterminado; banderas para EN, ES, FR y DE.

## Si aún no aparecen países

Abre `https://cryptoesim-engine.onrender.com/api/config`. Debe responder JSON y `countries` debe tener valores. Si funciona allí pero falla en la tienda, revisa primero `STORE_ORIGIN` y que se haya desplegado el nuevo `store-settings.js`. En Chrome, F12 → Network → `api/config` muestra errores de red/CORS. No compartas claves, códigos de activación ni archivos de recuperación públicamente.

La comprobación pública del 29-09-2026 encontró seis países configurados (ES, JP, MA, US, GB, TR), 61 paquetes para ES y `sales_enabled: false`. Son datos observados en ese momento, no valores fijados por el frontend. Para añadir países, usa la variable opcional `ALLOWED_COUNTRIES` del backend con códigos ISO separados por comas y comprueba que el proveedor ofrezca esos destinos.

## Cobros y eSIM Access

El cliente paga USDC en Algorand a tu wallet. El servidor confirma ese pago y solicita la eSIM al proveedor. eSIM Access descuenta su coste del saldo de tu cuenta de distribuidor, que es distinto del saldo de tu wallet. No se compran por adelantado paquetes de cada país. La integración no convierte USDC ni recarga automáticamente la cuenta del proveedor.

El código comprueba saldo suficiente antes de ofrecer el cobro. Si falta saldo, rechaza la operación antes de cobrar. Mantén saldo operativo; eSIM Access documenta recarga automática con tarjeta en su portal.

- API oficial: https://docs.esimaccess.com/
- Recargas: https://esimaccess.com/docs/what-payment-methods-are-accepted/

`LIVE_SALES_ENABLED=false` permite consultar el catálogo pero mantiene las compras pausadas. Activa `true` en el Web Service cuando estén listos el proveedor, saldo, wallet de recepción, impuestos y soporte. Esta actualización no activa ni efectúa cobros reales.

## Recuperar un pedido guardado

Import order servía para abrir una copia privada del pedido en otro navegador. Se ha quitado de la pantalla principal, conservando la utilidad de recuperación en `/?recover=1`. Por ejemplo, abre la URL de tu Static Site y añade `/?recover=1`, luego carga el JSON descargado con Save recovery file. El servidor verifica el token antes de aceptar el archivo. No compartas ese archivo: da acceso a la instalación.

## Verificación y dependencias

Comprobado en navegador local: controles con la API caída, reintento, seis países, idiomas, conexión de la extensión mediante un emulador del protocolo, compra simulada, firma del recibo, QR, consumo, persistencia, recuperación y ancho móvil. No se ha firmado un pago real ni probado una extensión con fondos. No se incluyen archivos de pruebas.

`journey.js` contiene código legible y dependencias empaquetadas: Lute Connect 3.0.1, algosdk 3.7.0 y buffer 6.0.3, con sus avisos de licencia. Las traducciones están dentro del mismo archivo.
