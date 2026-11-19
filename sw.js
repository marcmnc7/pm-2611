// Para Azul sin conexión: la primera vez se guarda el juego entero (el HTML y los archivos de assets/: modelos,
// música, fotos) y después se abre desde el móvil al momento. Cada versión publicada cambia VERSION y se descarga
// una vez. La lista de assets la rellena la compilación (vite.config.ts).
//
// Actualizar sin romper nada: una versión nueva se descarga entera en segundo plano y ESPERA. No se pone en marcha
// hasta que el juego se lo pide (mensaje «skip»), y el juego solo lo pide en la portada o en el mapa, nunca a mitad
// de capítulo (si no, la partida en curso pediría archivos de la versión vieja que ya no estarían). El progreso no
// vive aquí: va en el localStorage del juego y esto no lo toca.
const VERSION = '1795119638367';
const CACHE = 'margaux-' + VERSION;
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', "./assets/agente_aeropuerto_h-xQuX8M22.vrm","./assets/agente_aeropuerto_m-XI4b2-6q.vrm","./assets/amiga_imperi_1-BIa5lwCO.glb","./assets/amiga_imperi_1-DmFDcxTX.vrm","./assets/amiga_imperi_2-EQrcLp97.glb","./assets/amiga_imperi_2-UMJcmckb.vrm","./assets/amigo_imperi-BF9uIlbP.vrm","./assets/amigo_imperi-Tvjw2hBi.glb","./assets/anims-C2heTHCk.glb","./assets/anims_ual-DKaAyVsr.glb","./assets/anims_ual_2-Cmg3fzG6.glb","./assets/azul_aniversario-pdtBbNVF.vrm","./assets/azul_diario-CSP7RHi2.vrm","./assets/azul_diario-ctgflivT.glb","./assets/azul_ferreries-BLf1qHAq.vrm","./assets/azul_moto-D836rUN-.vrm","./assets/azul_piscina-DtbxjLGM.vrm","./assets/azul_playa-DwOS2-iz.vrm","./assets/azul_santjoan-NViIof09.vrm","./assets/bajista-DeJJuNJ3.vrm","./assets/bateria-BRpVLPXy.vrm","./assets/c1-YAMjUQ0K.jpg","./assets/c1_velda-6eTEQwt6.m4a","./assets/c2-Dxh9MCe2.jpg","./assets/c2_blunt-uQQbpxJO.m4a","./assets/c3-Be_wRVzY.jpg","./assets/c3_careless-BqfN8MKY.m4a","./assets/c4-DAaFl_4s.jpg","./assets/c4_devega-BHfNCLZ9.m4a","./assets/c4_fito-jUTUpWha.m4a","./assets/c5-bm-HuwmZ.jpg","./assets/c5_jeanl-CmDofpzO.m4a","./assets/c6-Di89AWOy.jpg","./assets/c7-Cs5BZXNq.jpg","./assets/c7_royce-tBa4qTAm.m4a","./assets/c8-CSz5tnid.jpg","./assets/c8_dondevuelvo-28vzXmEO.m4a","./assets/c9-D8erZLAd.jpg","./assets/c9_quevedo-DA8ZK6Ss.m4a","./assets/cabana-AOYsF6zm.jpg","./assets/caixer-Bg-CjMMl.vrm","./assets/camarero_fito-CMsKJos7.vrm","./assets/camarero_laurel-BOiL1wbg.vrm","./assets/carme-BJLwDx_I.vrm","./assets/dance_samba-DmVOSUxn.glb","./assets/donkey-Cyv9rXj5.glb","./assets/eric-KY2Nq7fn.vrm","./assets/extra_h1-C4lKxKV3.glb","./assets/extra_h1-CGbYSzE-.vrm","./assets/extra_h2-BqCTBkDb.glb","./assets/extra_h2-U2RbF0zY.vrm","./assets/extra_h3-ld_xy_Nl.vrm","./assets/extra_h4-D8htLEuz.glb","./assets/extra_h4-dtBotHcd.vrm","./assets/extra_m1-C-bOkAKK.glb","./assets/extra_m1-L0Z7-sNq.vrm","./assets/extra_m2-BNnDe-P_.glb","./assets/extra_m2-C3xzV1FN.vrm","./assets/extra_mayor_h-gtMRExda.vrm","./assets/extra_mayor_m-Bk8PMsgT.vrm","./assets/fabiolera-Bd3QccmG.vrm","./assets/ferreries-selfie-CyqwgH_T.jpg","./assets/ferreries-video-CpHEIV_o.mp4","./assets/fito-BWkkzEQ1.vrm","./assets/fox-CslrZzG2.glb","./assets/gas_diario-C6GSm7rU.glb","./assets/gas_diario-DGVq2e36.vrm","./assets/gas_ferreries-BMZAG273.vrm","./assets/gas_fito-CusWw7Ul.vrm","./assets/gas_moto-CrVRBk--.vrm","./assets/gas_piscina-DWHD3a4u.vrm","./assets/gas_playa-Dgv8lP1h.vrm","./assets/gas_santjoan-D99jJq0E.vrm","./assets/horse_q-CE4hkNeD.glb","./assets/lpa-ascensor-D16-0yT2.jpg","./assets/lpa-carnaval-CZIVeF9o.jpg","./assets/lpa-concierto-MOVWXnC3.jpg","./assets/lpa-desayuno-Ctr-QRhf.jpg","./assets/madre_azul-_nnFmaKI.vrm","./assets/madre_gas-CcuqZuHX.vrm","./assets/marcial-DiPo_XVW.jpg","./assets/moto-1-BUkJRh8Z.jpg","./assets/moto-2-CZPvDY_q.jpg","./assets/moto-3-BzsgHky_.jpg","./assets/moto-video-9U57BPU2.jpg","./assets/moto-video-BfVJScnk.mp4","./assets/nino_1-BZgqCD3j.vrm","./assets/nino_2-BKzzQ6T1.glb","./assets/nino_2-CtzExIQK.vrm","./assets/nino_3-C5OhaxI7.glb","./assets/nino_3-b0Ylynwk.vrm","./assets/padre_azul-BEXQAM_E.vrm","./assets/padre_gas-D5aYrsi1.vrm","./assets/saxofonista-GIB0pKcj.vrm","./assets/taxista-DoYrNzNm.vrm","./assets/tofol-Jn7-0PBk.vrm","./assets/torreznos-DqPCCDy1.jpg","./assets/vecino-DBua_llR.vrm"].filter((f) => f !== '__ASSETS__');

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(FILES))
      // La primera vez (no hay ninguna versión funcionando) se pone en marcha directamente
      .then(() => (self.registration.active ? undefined : self.skipWaiting())),
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'skip') self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('margaux-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // version.json, siempre a internet: es lo que dice si hay algo más nuevo
  if (new URL(req.url).pathname.endsWith('/version.json')) return;
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
