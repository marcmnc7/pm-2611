// Para Margaux sin conexión: la primera vez se guarda el juego entero (el HTML y los archivos de assets/:
// modelos, música, fotos) y después se abre desde el móvil al momento. Cada versión publicada cambia VERSION
// y se descarga una vez. La lista de assets la rellena la compilación (vite.config.ts).
const VERSION = '1794261992125';
const CACHE = 'margaux-' + VERSION;
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', "./assets/anims-C2heTHCk.glb","./assets/anims_ual-DKaAyVsr.glb","./assets/anims_ual_2-Cmg3fzG6.glb","./assets/azul_ferreries-BLf1qHAq.vrm","./assets/c1_velda-6eTEQwt6.m4a","./assets/c2_blunt-uQQbpxJO.m4a","./assets/c3_careless-BqfN8MKY.m4a","./assets/c4_devega-BHfNCLZ9.m4a","./assets/c4_fito-jUTUpWha.m4a","./assets/c5_jeanl-CmDofpzO.m4a","./assets/c7_royce-tBa4qTAm.m4a","./assets/c8_dondevuelvo-28vzXmEO.m4a","./assets/c9_quevedo-DA8ZK6Ss.m4a","./assets/fox-CslrZzG2.glb","./assets/gas_mh-DgfpfA7r.glb","./assets/horse-DMamucGr.glb","./assets/kid_mh-Bfukh1hl.glb","./assets/man_mh-B4t4XlkE.glb","./assets/man_mh_lod-B6KcAzuB.glb","./assets/woman-C3QCKEkG.glb","./assets/woman_mh-nLo_-Jt_.glb","./assets/woman_mh_lod-CFWoiRO3.glb"].filter((f) => f !== '__ASSETS__');

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('margaux-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async (c) => {
      const hit = (await c.match(req, { ignoreSearch: true })) || (req.mode === 'navigate' ? await c.match('./index.html') : null);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) c.put(req, res.clone());
      return res;
    }),
  );
});
