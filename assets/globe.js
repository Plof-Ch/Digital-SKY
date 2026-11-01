/* Digital Sky — Earth globe: all countries + highlighted Russia/China + CBDC corridor.
   Conceptual demo only; no real transfers. */
(() => {
'use strict';

const STEPS = [
  { title: 'Инициация', detail: 'Импортёр инициирует перевод в цифровых рублях через банковский интерфейс.' },
  { title: 'Проверка ЦБ РФ', detail: 'Национальная система цифрового рубля подтверждает готовность и резервирование.' },
  { title: 'Обмен PvP', detail: 'Digital Sky координирует согласованное исполнение двух валютных частей.' },
  { title: 'Проверка ЦБ Китая', detail: 'Национальная система цифрового юаня подтверждает встречную часть расчёта.' },
  { title: 'Цифровой юань', detail: 'Экспортёр получает уведомление о завершении концептуального сценария.' }
];

const MOSCOW = { lon: 37.62, lat: 55.75, label: 'ЦБ РФ', sub: 'Цифровой рубль' };
const BEIJING = { lon: 116.4, lat: 39.9, label: 'ЦБ Китая', sub: 'Цифровой юань' };
const CAM = { lon: 95, lat: 48 };

function preferReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function toRad(d) { return d * Math.PI / 180; }

function project(lon, lat, R, cx, cy, camLon, camLat) {
  const λ = toRad(lon - camLon);
  const φ = toRad(lat);
  const φ0 = toRad(camLat);
  const cosφ = Math.cos(φ);
  const x = cosφ * Math.sin(λ);
  const y = Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * cosφ * Math.cos(λ);
  const z = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * cosφ * Math.cos(λ);
  if (z < -0.02) return null;
  return { x: cx + R * x, y: cy - R * y, z };
}

function greatCircle(a, b, n) {
  const φ1 = toRad(a.lat), λ1 = toRad(a.lon);
  const φ2 = toRad(b.lat), λ2 = toRad(b.lon);
  const d = 2 * Math.asin(Math.sqrt(
    Math.sin((φ2 - φ1) / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2
  ));
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    if (d < 1e-8) { pts.push({ lon: a.lon, lat: a.lat }); continue; }
    const A = Math.sin((1 - t) * d) / Math.sin(d);
    const B = Math.sin(t * d) / Math.sin(d);
    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
    const z = A * Math.sin(φ1) + B * Math.sin(φ2);
    pts.push({
      lat: Math.atan2(z, Math.sqrt(x * x + y * y)) * 180 / Math.PI,
      lon: Math.atan2(y, x) * 180 / Math.PI
    });
  }
  return pts;
}

function initEarthGlobe(root) {
  if (!root || root.dataset.ready === '1') return;
  root.dataset.ready = '1';

  const canvas = root.querySelector('#earth-canvas');
  const hud = root.querySelector('[data-globe-hud]');
  const live = root.querySelector('[data-globe-live]');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const reduce = preferReduced();
  const corridor = greatCircle(MOSCOW, BEIJING, 80);

  let world = { land: [], countries: [], russia: [], china: [] };
  let ready = false;
  let step = 0, packet = 0, phase = 0, stepTimer = 0, last = 0, raf = 0;
  let camLon = CAM.lon, camLat = CAM.lat;
  let CX = 0, CY = 0, R = 0;

  fetch((window.DS_BASE || './') + 'assets/world-borders.json?v=16')
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data) return;
      world = {
        land: Array.isArray(data.land) ? data.land : [],
        countries: Array.isArray(data.countries) ? data.countries : [],
        russia: Array.isArray(data.russia) ? data.russia : [],
        china: Array.isArray(data.china) ? data.china : []
      };
      ready = true;
    })
    .catch(() => { ready = false; });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(280, Math.floor(rect.width));
    const h = Math.max(280, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function updateHud() {
    if (!hud) return;
    hud.querySelectorAll('[data-step]').forEach(el => {
      const i = Number(el.dataset.step);
      el.classList.toggle('is-active', i === step);
      el.classList.toggle('is-done', i < step);
      el.setAttribute('aria-current', i === step ? 'step' : 'false');
    });
    if (live) live.textContent = `${STEPS[step].title}: ${STEPS[step].detail}`;
    root.classList.toggle('is-exchanging', step === 2);
    root.classList.toggle('is-settled', step >= 4);
  }

  function advance(dt) {
    stepTimer += dt;
    const t = stepTimer % 13.5;
    if (t < 2.0) { step = 0; packet = 0; }
    else if (t < 4.2) { step = 1; packet = 0.03; }
    else if (t < 8.2) { step = 2; packet = 0.03 + ((t - 4.2) / 4) * 0.93; }
    else if (t < 10.4) { step = 3; packet = 0.98; }
    else if (t < 12.6) { step = 4; packet = 1; }
    else { step = 0; packet = 0; }
  }

  function drawPoly(poly, fill, stroke, lw, glow) {
    if (!poly || poly.length < 3) return;
    const projected = [];
    let front = 0;
    for (let i = 0; i < poly.length; i++) {
      const p = project(poly[i][0], poly[i][1], R, CX, CY, camLon, camLat);
      projected.push(p);
      if (p) front++;
    }
    if (front < 3) return;

    // Fill only fully front-facing rings (partial rings → Arctic shards).
    const canFill = fill && front === projected.length;
    if (canFill) {
      ctx.beginPath();
      ctx.moveTo(projected[0].x, projected[0].y);
      for (let i = 1; i < projected.length; i++) {
        ctx.lineTo(projected[i].x, projected[i].y);
      }
      ctx.closePath();
      if (glow) {
        ctx.shadowColor = stroke || fill;
        ctx.shadowBlur = 16;
      }
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (!stroke) return;
    // Stroke visible edge runs without closing across the limb
    let run = [];
    const strokeRun = () => {
      if (run.length < 2) { run = []; return; }
      ctx.beginPath();
      ctx.moveTo(run[0].x, run[0].y);
      for (let i = 1; i < run.length; i++) ctx.lineTo(run[i].x, run[i].y);
      if (glow) {
        ctx.shadowColor = stroke;
        ctx.shadowBlur = 14;
      }
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lw || 1;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.shadowBlur = 0;
      run = [];
    };
    for (const p of projected) {
      if (p) run.push(p);
      else strokeRun();
    }
    strokeRun();
  }

  function drawPolys(list, fill, stroke, lw, glow) {
    for (const poly of list) drawPoly(poly, fill, stroke, lw, glow);
  }

  function drawSphereBase() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.clip();

    const ocean = ctx.createRadialGradient(CX - R * 0.28, CY - R * 0.22, R * 0.08, CX, CY, R);
    ocean.addColorStop(0, '#1B568F');
    ocean.addColorStop(0.55, '#0C3158');
    ocean.addColorStop(1, '#061526');
    ctx.fillStyle = ocean;
    ctx.fillRect(CX - R, CY - R, R * 2, R * 2);

    // Graticule
    ctx.strokeStyle = 'rgba(100,164,245,.1)';
    ctx.lineWidth = 1;
    for (let lat = -60; lat <= 80; lat += 20) {
      ctx.beginPath();
      let started = false;
      for (let lon = camLon - 110; lon <= camLon + 110; lon += 4) {
        const p = project(lon, lat, R, CX, CY, camLon, camLat);
        if (!p) { started = false; continue; }
        if (!started) { ctx.moveTo(p.x, p.y); started = true; }
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    for (let lon = Math.floor((camLon - 100) / 20) * 20; lon <= camLon + 100; lon += 20) {
      ctx.beginPath();
      let started = false;
      for (let lat = -70; lat <= 85; lat += 3) {
        const p = project(lon, lat, R, CX, CY, camLon, camLat);
        if (!p) { started = false; continue; }
        if (!started) { ctx.moveTo(p.x, p.y); started = true; }
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    // Fill by country (continent rings are too large for orthographic clip)
    if (ready) {
      drawPolys(world.countries, 'rgba(120,155,188,.9)', 'rgba(175,205,235,.45)', 0.55, false);
      drawPolys(world.land, null, 'rgba(150,185,220,.35)', 0.9, false);
    }

    const shade = ctx.createRadialGradient(CX - R * 0.3, CY - R * 0.25, R * 0.12, CX, CY, R);
    shade.addColorStop(0, 'rgba(255,255,255,.06)');
    shade.addColorStop(0.5, 'rgba(0,0,0,0)');
    shade.addColorStop(1, 'rgba(3,10,24,.5)');
    ctx.fillStyle = shade;
    ctx.fillRect(CX - R, CY - R, R * 2, R * 2);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(100,164,245,.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function labelCountry(text, lon, lat, color) {
    const p = project(lon, lat, R, CX, CY, camLon, camLat);
    if (!p) return;
    ctx.font = '800 13px Manrope, Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(4,12,28,.9)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = color;
    ctx.fillText(text, p.x, p.y);
    ctx.shadowBlur = 0;
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawCorridor() {
    const pts = corridor.map(p => project(p.lon, p.lat, R, CX, CY, camLon, camLat)).filter(Boolean);
    if (pts.length < 2) return;

    // Soft base arc
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = 'rgba(100,164,245,.22)';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.setLineDash([4, 8]);
    ctx.strokeStyle = 'rgba(155,196,248,.55)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.setLineDash([]);

    const prog = Math.min(1, Math.max(0, packet));
    const end = Math.max(2, Math.floor((pts.length - 1) * prog));
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i <= end; i++) ctx.lineTo(pts[i].x, pts[i].y);
    const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[end].x, pts[end].y);
    grad.addColorStop(0, '#64A4F5');
    grad.addColorStop(0.55, '#8EC4FF');
    grad.addColorStop(1, step >= 3 ? '#3BC4A0' : '#B8DCFF');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 3.4;
    ctx.shadowColor = step >= 3 ? '#16876D' : '#1768DF';
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Trailing sparkles along active segment
    if (step >= 1 && step <= 3 && prog > 0.05) {
      for (let k = 0; k < 5; k++) {
        const t = Math.max(0, end - k * 4);
        const sp = pts[t];
        if (!sp) continue;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 2.2 - k * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,255,${0.55 - k * 0.1})`;
        ctx.fill();
      }
    }

    if (step >= 1 && step <= 3 && prog > 0) {
      const p = pts[end];
      const pulse = 1 + Math.sin(phase * 8) * 0.12;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 20 * pulse);
      g.addColorStop(0, '#fff');
      g.addColorStop(0.25, step < 3 ? '#64A4F5' : '#3BC4A0');
      g.addColorStop(1, 'rgba(23,104,223,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 20 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
      ctx.fillStyle = step < 3 ? '#1768DF' : '#16876D';
      ctx.fill();
      ctx.font = '700 11px Manrope, Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.fillText(step < 3 ? '₽' : '¥', p.x, p.y + 0.5);
    }

    if (step === 2) {
      const mid = corridor[Math.floor(corridor.length / 2)];
      const mp = project(mid.lon, mid.lat, R, CX, CY, camLon, camLat);
      if (mp) {
        ctx.font = '700 11px Manrope, Segoe UI, sans-serif';
        const label = 'Digital Sky · PvP';
        const tw = ctx.measureText(label).width;
        const w = tw + 18, h = 24;
        const bob = Math.sin(phase * 3) * 2;
        roundRect(mp.x - w / 2, mp.y - 28 - h / 2 + bob, w, h, 8);
        ctx.fillStyle = 'rgba(8,20,38,.94)';
        ctx.fill();
        ctx.strokeStyle = '#64A4F5';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = '#E8EEF6';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, mp.x, mp.y - 28 + bob);
      }
    }
  }

  function drawPin(city, active, done, color) {
    const p = project(city.lon, city.lat, R, CX, CY, camLon, camLat);
    if (!p) return;
    const pulse = active ? 1 + Math.sin(phase * 6) * 0.12 : 1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 20 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = active ? color + '28' : 'transparent';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(p.x, p.y, 6.5 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = done ? '#004CBC' : color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    const ly = p.y - 40;
    ctx.font = '600 12px Golos Text, Segoe UI, sans-serif';
    const tw = Math.max(ctx.measureText(city.label).width, ctx.measureText(city.sub).width);
    const w = tw + 24, h = 40;
    roundRect(p.x - w / 2, ly - h / 2, w, h, 12);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = done ? '#004CBC' : 'rgba(0,76,188,.28)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0B1F44';
    ctx.font = '700 12px Golos Text, Segoe UI, sans-serif';
    ctx.fillText(city.label, p.x, ly - 7);
    ctx.font = '500 10px Golos Text, Segoe UI, sans-serif';
    ctx.fillStyle = '#6B7380';
    ctx.fillText(city.sub, p.x, ly + 9);
  }

  function frame(ts) {
    if (!last) last = ts;
    const dt = Math.min(0.05, (ts - last) / 1000);
    last = ts;
    phase += dt;

    if (!reduce) {
      camLon = CAM.lon + Math.sin(phase * 0.11) * 3;
      camLat = CAM.lat + Math.cos(phase * 0.09) * 1.5;
      advance(dt);
    } else {
      step = 2; packet = 0.55;
    }

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    CX = w * 0.5;
    CY = h * 0.5;
    R = Math.min(w, h) * 0.46;

    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(100,164,245,.4)';
    for (let i = 0; i < 36; i++) {
      const sx = (Math.sin(i * 12.7 + 0.4) * 0.5 + 0.5) * w;
      const sy = (Math.cos(i * 8.3 + 1.1) * 0.5 + 0.5) * h;
      const dx = sx - CX, dy = sy - CY;
      if (dx * dx + dy * dy < R * R * 1.08) continue;
      ctx.globalAlpha = 0.14 + (i % 5) * 0.05;
      ctx.fillRect(sx, sy, 1.4, 1.4);
    }
    ctx.globalAlpha = 1;

    drawSphereBase();

    const ruOn = step <= 1;
    const ruOk = step >= 1;
    const cnOn = step >= 3;
    const cnOk = step >= 4;

    if (ready) {
      // Main landmass filled; islands stroked (skip antimeridian needle artifacts)
      const ruFill = world.russia.slice(0, 1);
      const ruStroke = world.russia.slice(1, 8);
      const cnFill = world.china.slice(0, 1);
      const cnStroke = world.china.slice(1, 4);
      const ruColor = ruOn ? 'rgba(35,120,235,.82)' : (ruOk ? 'rgba(22,135,109,.65)' : 'rgba(35,120,235,.72)');
      const ruEdge = ruOn || ruOk ? '#B8E0FF' : '#7EB8F8';
      const cnColor = cnOn ? 'rgba(22,145,115,.82)' : (cnOk ? 'rgba(22,135,109,.65)' : 'rgba(210,160,55,.58)');
      const cnEdge = cnOn || cnOk ? '#6AE8C4' : '#F0C45A';
      drawPolys(ruFill, ruColor, ruEdge, 2.0, true);
      drawPolys(ruStroke, ruColor, ruEdge, 1.4, false);
      drawPolys(cnFill, cnColor, cnEdge, 2.0, true);
      drawPolys(cnStroke, cnColor, cnEdge, 1.4, false);
      labelCountry('Россия', 90, 62, '#F5FAFF');
      labelCountry('Китай', 103, 35, '#FFF8E8');
    } else {
      // Loading placeholder
      ctx.font = '600 13px Manrope, Segoe UI, sans-serif';
      ctx.fillStyle = 'rgba(168,189,212,.8)';
      ctx.textAlign = 'center';
      ctx.fillText('Загрузка карты…', CX, CY);
    }

    drawCorridor();
    drawPin(MOSCOW, step === 0 || step === 1, step >= 1, '#64A4F5');
    drawPin(BEIJING, step === 3 || step === 4, step >= 4, '#3BC4A0');

    updateHud();
    raf = requestAnimationFrame(frame);
  }

  resize();
  updateHud();
  window.addEventListener('resize', resize);
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  };
}

window.DigitalSkyGlobe = { initEarthGlobe, STEPS };
})();
