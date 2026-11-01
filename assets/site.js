/* Digital Sky public website — content-first, framework-free foundation.
   Source of truth: user-provided project documents, see docs/ and site-data.js.
   The website DOES NOT perform real transactions. */
(() => {
'use strict';
const D = window.DigitalSkyData;
const PAGE = window.DS_PAGE || 'home';
const BASE = window.DS_BASE || './';
const app = document.getElementById('app');
const money = n => String(Number(n).toLocaleString('ru-RU', {maximumFractionDigits: 2}));
const link = path => BASE + (path || '');
const softLabel = text => {
  const t = String(text || '').trim().replace(/\s*\/\s*/g, ' · ');
  const lower = t.toLocaleLowerCase('ru-RU');
  return lower ? lower.charAt(0).toLocaleUpperCase('ru-RU') + lower.slice(1) : '';
};
const tag = (text, cls = '') => `<span class="pill ${cls}">${softLabel(text)}</span>`;
const eyebrow = text => `<div class="eyebrow">${softLabel(text)}</div>`;
const lead = text => `<p class="lead">${text}</p>`;
const btn = (text, to, style = 'dark-btn') =>
  `<a class="btn ${style}" href="${link(to)}">${text}<span aria-hidden="true">↗</span></a>`;
const note = (title, text, type = '') =>
  `<div class="notice ${type}"><strong>${title}</strong> ${text}</div>`;
const sectionTitle = (ey, title, text = '') =>
  `<div class="section-heading">${eyebrow(ey)}<h2>${title}</h2>${text ? `<p class="section-lead hide-mobile">${text}</p>` : ''}</div>`;
const sec = (id, body, cls = '') =>
  `<section class="section ${cls}" id="${id}"><div class="container">${body}</div></section>`;
const pageHero = (crumb, title, text, aside = '', art = '') =>
  `<section class="page-hero${art ? ' page-hero-illust' : ''}"><div class="container${art ? ' page-hero-grid' : ''}"><div><div class="breadcrumb"><a href="${link('')}">Digital Sky</a> / ${crumb}</div><h1 class="display small">${title}</h1>${lead(text)}${aside ? `<div style="margin-top:22px;max-width:820px">${aside}</div>` : ''}</div>${art || ''}</div></section>`;
const card = (title, description, index = '', _symbol = '') =>
  `<article class="card">${index ? `<div class="num">${index}</div>` : ''}<h3>${title}</h3><p>${description}</p></article>`;
const source = (name, where) =>
  `<div class="evidence-note hide-mobile"><span><b>Источник:</b> ${name}</span>${where ? `<span>${where}</span>` : ''}</div>`;
const illust = (file, alt, size = '') =>
  `<div class="illust-frame hide-mobile${size ? ` illust-frame--${size}` : ''}"><img src="${link('assets/illustrations/' + file)}" alt="${alt}" width="1024" height="1024" loading="lazy" decoding="async"></div>`;

const CHART = {
  blue: ['#1768DF', '#2B7AE8', '#64A4F5', '#9BC4F8', '#C5DBFB'],
  mint: '#16876D',
  slate: '#8494A8',
  navy: '#10233B'
};

function earthGlobe() {
  return `<div class="globe-stage" id="earth-globe" aria-label="Концептуальная анимация: Россия и Китай на глобусе Земли">
    <div class="globe-visual">
      <div class="globe-aura" aria-hidden="true"></div>
      <canvas id="earth-canvas" width="720" height="720" role="img" aria-label="Глобус Земли: границы России и Китая, сценарий расчёта ЦВЦБ"></canvas>
    </div>
    <div class="globe-hud" data-globe-hud>
      <div class="globe-hud-head">
        <span class="globe-hud-kind">Сценарий расчёта</span>
        <span class="globe-hud-route" aria-hidden="true">Россия <i></i> Китай</span>
      </div>
      <ol class="globe-rail">
        <li data-step="0"><span class="gr-marker" aria-hidden="true"></span><span class="gr-copy"><span class="gr-num">01</span><strong>Инициация</strong><small>Цифровой рубль</small></span></li>
        <li data-step="1"><span class="gr-marker" aria-hidden="true"></span><span class="gr-copy"><span class="gr-num">02</span><strong>Проверка ЦБ РФ</strong><small>Резерв и готовность</small></span></li>
        <li data-step="2"><span class="gr-marker" aria-hidden="true"></span><span class="gr-copy"><span class="gr-num">03</span><strong>Обмен PvP</strong><small>Digital Sky</small></span></li>
        <li data-step="3"><span class="gr-marker" aria-hidden="true"></span><span class="gr-copy"><span class="gr-num">04</span><strong>Проверка ЦБ Китая</strong><small>Встречная часть</small></span></li>
        <li data-step="4"><span class="gr-marker" aria-hidden="true"></span><span class="gr-copy"><span class="gr-num">05</span><strong>Цифровой юань</strong><small>Уведомление получателя</small></span></li>
      </ol>
      <p class="globe-live visually-hidden" data-globe-live aria-live="polite"></p>
    </div>
  </div>`;
}

function networkDiagram() {
  return `<div class="diagram-frame" role="img" aria-label="Концептуальная связь национальных банков через Digital Sky">
    <div class="diagram-grid"><div class="diagram-orbit orb1"></div><div class="diagram-orbit orb2"></div><div class="diagram-orbit orb3"></div></div>
    <svg class="diagram-svg" viewBox="0 0 440 300" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="hubG" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1768DF" stop-opacity=".35"/><stop offset="1" stop-color="#10233B" stop-opacity=".9"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="0" result="b"/><feMerge><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M70 70 C140 110, 160 110, 220 150" stroke="#64A4F5" stroke-width="1.5" stroke-dasharray="4 4" opacity=".55"/>
      <path d="M370 70 C300 110, 280 110, 220 150" stroke="#64A4F5" stroke-width="1.5" stroke-dasharray="4 4" opacity=".55"/>
      <path d="M70 230 C140 190, 160 190, 220 150" stroke="#16876D" stroke-width="1.5" stroke-dasharray="4 4" opacity=".4"/>
      <path d="M370 230 C300 190, 280 190, 220 150" stroke="#16876D" stroke-width="1.5" stroke-dasharray="4 4" opacity=".4"/>
      <rect x="28" y="42" width="100" height="56" rx="10" fill="#17304F" stroke="#64A4F5" stroke-opacity=".35"/>
      <text x="78" y="66" text-anchor="middle" fill="#E8EEF6" font-size="11" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">Банк отправителя</text>
      <text x="78" y="82" text-anchor="middle" fill="#8494A8" font-size="10" font-family="Golos Text,Segoe UI,sans-serif">Цифровой рубль</text>
      <rect x="312" y="42" width="100" height="56" rx="10" fill="#17304F" stroke="#64A4F5" stroke-opacity=".35"/>
      <text x="362" y="66" text-anchor="middle" fill="#E8EEF6" font-size="11" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">Банк получателя</text>
      <text x="362" y="82" text-anchor="middle" fill="#8494A8" font-size="10" font-family="Golos Text,Segoe UI,sans-serif">Цифровой юань</text>
      <rect x="28" y="202" width="100" height="56" rx="10" fill="#17304F" stroke="#16876D" stroke-opacity=".35"/>
      <text x="78" y="226" text-anchor="middle" fill="#E8EEF6" font-size="11" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">ЦБ России</text>
      <text x="78" y="242" text-anchor="middle" fill="#8494A8" font-size="10" font-family="Golos Text,Segoe UI,sans-serif">Нац. система ЦВЦБ</text>
      <rect x="312" y="202" width="100" height="56" rx="10" fill="#17304F" stroke="#16876D" stroke-opacity=".35"/>
      <text x="362" y="226" text-anchor="middle" fill="#E8EEF6" font-size="11" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">ЦБ Китая</text>
      <text x="362" y="242" text-anchor="middle" fill="#8494A8" font-size="10" font-family="Golos Text,Segoe UI,sans-serif">Нац. система ЦВЦБ</text>
      <rect x="148" y="122" width="144" height="56" rx="12" fill="url(#hubG)" stroke="#64A4F5" stroke-opacity=".55" filter="url(#glow)"/>
      <text x="220" y="146" text-anchor="middle" fill="#fff" font-size="14" font-weight="800" font-family="Golos Text,Segoe UI,sans-serif">Digital Sky</text>
      <text x="220" y="164" text-anchor="middle" fill="#9BC4F8" font-size="10" font-family="Golos Text,Segoe UI,sans-serif">API · проверки · PvP</text>
    </svg>
    <div class="diagram-footer"><span class="signal">Национальные системы ЦВЦБ</span><span>Концептуальная архитектура</span></div>
  </div>`;
}

function compactFlow() {
  const nodes = [
    ['01', 'Импортёр', 'Россия'],
    ['02', 'Банк', 'отправителя'],
    ['03', 'Digital Sky', 'координация'],
    ['04', 'Банк', 'получателя'],
    ['05', 'Экспортёр', 'Китай']
  ];
  return `<div class="flow-compact" role="img" aria-label="Маршрут: импортёр → банк → Digital Sky → банк → экспортёр">
    <ol class="flow-track">
      ${nodes.map(([n, a, b], i) => `<li class="flow-item${i === 2 ? ' is-hub' : ''}"><span class="flow-idx">${n}</span><strong>${a}</strong><small>${b}</small></li>`).join('')}
    </ol>
    <p class="flow-caption">Упрощённая схема. Центральные банки участвуют на уровне национальных ЦВЦБ.</p>
  </div>`;
}

function layerStack() {
  return `<div class="layers">${[
    ['01','Сетевой уровень','Центральные банки стран-участниц и коммерческие банки-операторы. Национальные платформы ЦВЦБ сохраняют собственный контроль.'],
    ['02','Протокольный уровень','Межсистемная коммуникация, расчёт по принципу PvP, атомарные свопы и предусмотренная логика смарт-контрактов.'],
    ['03','Сервисный уровень','Стандартизированные API, взаимодействие с банковскими системами, AML/KYC-проверками и клиентскими интерфейсами.']
  ].map(x => `<div class="layer"><span class="layer-num">${x[0]}</span><strong>${x[1]}</strong><p>${x[2]}</p></div>`).join('')}</div>`;
}

function archDiagram() {
  return `<svg class="arch-diagram" viewBox="0 0 720 220" role="img" aria-label="Трёхуровневая архитектура Digital Sky">
    <rect x="8" y="12" width="704" height="56" rx="10" fill="#F3F7FC" stroke="#DFE6EE"/>
    <text x="28" y="36" fill="#1768DF" font-size="11" font-weight="800" font-family="Golos Text,Segoe UI,sans-serif">СЕРВИСНЫЙ</text>
    <text x="28" y="54" fill="#34465B" font-size="12" font-family="Golos Text,Segoe UI,sans-serif">API · банковские интерфейсы · AML/KYC · клиентские приложения</text>
    <rect x="28" y="84" width="664" height="56" rx="10" fill="#10233B" stroke="#64A4F5" stroke-opacity=".4"/>
    <text x="48" y="108" fill="#64A4F5" font-size="11" font-weight="800" font-family="Golos Text,Segoe UI,sans-serif">ПРОТОКОЛЬНЫЙ · DIGITAL SKY</text>
    <text x="48" y="126" fill="#C5DBFB" font-size="12" font-family="Golos Text,Segoe UI,sans-serif">PvP · атомарный обмен · сообщения · смарт-контрактная логика</text>
    <rect x="48" y="152" width="300" height="52" rx="10" fill="#fff" stroke="#DFE6EE"/>
    <text x="68" y="174" fill="#10233B" font-size="12" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">Сетевой узел · Россия</text>
    <text x="68" y="190" fill="#617288" font-size="11" font-family="Golos Text,Segoe UI,sans-serif">ЦБ + коммерческие банки</text>
    <rect x="372" y="152" width="300" height="52" rx="10" fill="#fff" stroke="#DFE6EE"/>
    <text x="392" y="174" fill="#10233B" font-size="12" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">Сетевой узел · Китай</text>
    <text x="392" y="190" fill="#617288" font-size="11" font-family="Golos Text,Segoe UI,sans-serif">ЦБ + коммерческие банки</text>
  </svg>`;
}

function modelTopo(kind) {
  if (kind === 1) {
    return `<svg viewBox="0 0 200 80" aria-hidden="true"><rect x="20" y="20" width="60" height="40" rx="6" fill="#F3F7FC" stroke="#1768DF"/><rect x="120" y="20" width="60" height="40" rx="6" fill="#F3F7FC" stroke="#1768DF"/><path d="M80 40 H120" stroke="#8494A8" stroke-width="1.5" stroke-dasharray="3 3"/><text x="50" y="44" text-anchor="middle" fill="#10233B" font-size="9" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">ЦВЦБ A</text><text x="150" y="44" text-anchor="middle" fill="#10233B" font-size="9" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">ЦВЦБ B</text></svg>`;
  }
  if (kind === 2) {
    return `<svg viewBox="0 0 200 80" aria-hidden="true"><rect x="8" y="22" width="52" height="36" rx="6" fill="#F3F7FC" stroke="#1768DF"/><rect x="140" y="22" width="52" height="36" rx="6" fill="#F3F7FC" stroke="#1768DF"/><rect x="70" y="18" width="60" height="44" rx="8" fill="#10233B"/><text x="100" y="44" text-anchor="middle" fill="#64A4F5" font-size="8" font-weight="800" font-family="Golos Text,Segoe UI,sans-serif">Digital Sky</text><path d="M60 40 H70 M130 40 H140" stroke="#1768DF" stroke-width="2"/><text x="34" y="44" text-anchor="middle" fill="#10233B" font-size="8" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">ЦВЦБ A</text><text x="166" y="44" text-anchor="middle" fill="#10233B" font-size="8" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">ЦВЦБ B</text></svg>`;
  }
  return `<svg viewBox="0 0 200 80" aria-hidden="true"><rect x="30" y="12" width="140" height="56" rx="10" fill="#F3F7FC" stroke="#1768DF" stroke-width="1.5"/><circle cx="70" cy="40" r="14" fill="#fff" stroke="#1768DF"/><circle cx="130" cy="40" r="14" fill="#fff" stroke="#16876D"/><text x="70" y="43" text-anchor="middle" fill="#10233B" font-size="8" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">₽</text><text x="130" y="43" text-anchor="middle" fill="#10233B" font-size="8" font-weight="700" font-family="Golos Text,Segoe UI,sans-serif">¥</text><text x="100" y="62" text-anchor="middle" fill="#617288" font-size="8" font-family="Golos Text,Segoe UI,sans-serif">общий реестр</text></svg>`;
}

function stepper() {
  return `<div class="interactive-stepper"><div class="stepper" role="tablist" aria-label="Этапы международной транзакции">${D.steps.map((s, i) =>
    `<button class="step" data-step="${i}" role="tab" aria-selected="${i === 0}" id="step-tab-${i}" aria-controls="step-detail"><b>${String(i + 1).padStart(2, '0')} / 06</b><span>${s.title}</span></button>`
  ).join('')}</div><div class="step-detail" id="step-detail" role="tabpanel" aria-labelledby="step-tab-0"></div><div class="step-ctrl"><button class="btn-mini" id="step-back" type="button">← Назад</button><button class="btn-mini" id="step-next" type="button">Следующий этап →</button></div></div>`;
}

function stepDetail(i) {
  const s = D.steps[i];
  return `<div><div class="eyebrow">ШАГ ${i + 1} ИЗ ${D.steps.length}</div><h3>${s.title}</h3><p>${s.desc}</p><div class="tag-list"><span class="tag">${s.short}</span><span class="tag">${s.actors}</span></div></div><div class="right-note"><strong>Что происходит на этом этапе?</strong><p style="margin-top:10px">${s.detail}</p><span class="tiny muted">Сценарий из проектных материалов</span></div>`;
}

function sourceCards() {
  return `<div class="doc-grid">${D.sources.map((s, i) =>
    `<article class="doc-card"><div class="type">0${i + 1} / ${s.kind}</div><h3>${s.short}</h3><p>${s.detail}</p><div class="file-meta"><strong>${s.title}</strong><br>${s.pages}<br>Формат исходника: ${s.file.split('.').pop().toUpperCase()}</div></article>`
  ).join('')}</div>`;
}

function donut(title, data, total, sub) {
  const colors = CHART.blue;
  const r = 72, cx = 92, cy = 92, stroke = 28;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const segments = data.map((d, i) => {
    const len = (d.amount / total) * circ;
    const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="${stroke}" stroke-dasharray="${len} ${circ - len}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += len;
    return el;
  }).join('');
  return `<div class="visual-panel"><div class="panel-heading"><div><h3>${title}</h3><p>${sub}</p></div><span class="pill">ПЛАН</span></div>
    <div class="donut-layout">
      <div class="donut-svg-wrap" role="img" aria-label="${title}: ${money(total)} млн ₽">
        <svg class="donut-svg" viewBox="0 0 184 184">${segments}<circle cx="${cx}" cy="${cy}" r="${r - stroke / 2 - 2}" fill="#fff"/></svg>
        <div class="donut-center"><strong>${money(total)}</strong><small>млн ₽</small></div>
      </div>
      <div>${data.map((d, i) =>
        `<div class="key-item"><i class="key-bullet" style="background:${colors[i]}"></i><span>${d.name}</span><strong>${money(d.amount)}</strong></div>`
      ).join('')}</div>
    </div></div>`;
}

function fundingBars(data, max) {
  return `<div class="row-bars">${data.map(x =>
    `<div><div class="bar-label"><span>${x.name}</span><span>${money(x.amount)} млн ₽</span></div><div class="track"><div class="bar-fill" style="width:${(x.amount / max) * 100}%"></div></div></div>`
  ).join('')}</div>`;
}

function fundingTable(data, heading) {
  const sum = data.reduce((a, b) => a + b.amount, 0);
  return `<div class="datatable-wrap"><table class="datatable"><thead><tr><th>${heading}</th><th class="num-cell">Затраты, млн ₽</th><th class="num-cell">Доля</th></tr></thead><tbody>${
    data.map(x => `<tr><td>${x.name}</td><td class="num-cell">${money(x.amount)}</td><td class="num-cell">${(100 * x.amount / sum).toFixed(1).replace('.', ',')}%</td></tr>`).join('')
  }<tr><td><b>Итого</b></td><td class="num-cell"><b>${money(sum)}</b></td><td class="num-cell">100%</td></tr></tbody></table></div>`;
}

const forecastColumns = {
  total: 'Валовой доход',
  integration: 'Подключение банков',
  fees: 'Транзакционные комиссии',
  opex: 'OPEX',
  profit: 'Операционный поток'
};

function forecastChart(key = 'total') {
  const data = D.funding.forecast;
  const values = data.map(y => y[key]);
  const max = Math.max(...values) * 1.18 || 1;
  const W = 640, H = 280;
  const pad = { t: 36, r: 16, b: 44, l: 52 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const barW = iw / data.length * 0.42;
  const ticks = 4;
  const grid = Array.from({ length: ticks + 1 }, (_, i) => {
    const v = max * (1 - i / ticks);
    const y = pad.t + (ih * i) / ticks;
    return `<line class="grid" x1="${pad.l}" y1="${y}" x2="${W - pad.r}" y2="${y}"/>
      <text class="y-label" x="${pad.l - 8}" y="${y + 3}">${money(Math.round(v * 10) / 10)}</text>`;
  }).join('');
  const bars = data.map((y, i) => {
    const h = Math.max(2, (y[key] / max) * ih);
    const x = pad.l + (iw / data.length) * (i + 0.5) - barW / 2;
    const by = pad.t + ih - h;
    return `<rect class="bar" x="${x}" y="${by}" width="${barW}" height="${h}" rx="4">
      <title>${y.year}: ${money(y[key])} млн ₽</title></rect>
      <text class="val" x="${x + barW / 2}" y="${by - 8}">${money(y[key])}</text>
      <text class="label" x="${x + barW / 2}" y="${H - 14}">${y.year}</text>`;
  }).join('');
  return `<div class="forecast-chart-wrap">
    <svg class="forecast-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${forecastColumns[key]} по годам, млн ₽">
      ${grid}${bars}
    </svg>
    <div class="chart-key"><span><i style="background:${CHART.blue[0]}"></i>${forecastColumns[key]}, млн ₽</span></div>
  </div>`;
}

function forecastCompareChart() {
  const data = D.funding.forecast;
  const max = Math.max(...data.map(y => Math.max(y.total, y.opex, y.profit))) * 1.15;
  const W = 640, H = 300;
  const pad = { t: 36, r: 16, b: 48, l: 52 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const groupW = iw / data.length;
  const bw = groupW * 0.18;
  const series = [
    { key: 'total', color: CHART.blue[0], label: 'Доход' },
    { key: 'opex', color: CHART.slate, label: 'OPEX' },
    { key: 'profit', color: CHART.mint, label: 'Поток' }
  ];
  const bars = data.map((y, i) => {
    const gx = pad.l + groupW * i + groupW * 0.18;
    return series.map((s, si) => {
      const h = Math.max(2, (y[s.key] / max) * ih);
      const x = gx + si * (bw + 6);
      const by = pad.t + ih - h;
      return `<rect x="${x}" y="${by}" width="${bw}" height="${h}" rx="3" fill="${s.color}"><title>${y.year} ${s.label}: ${money(y[s.key])} млн ₽</title></rect>`;
    }).join('') + `<text class="label" x="${pad.l + groupW * (i + 0.5)}" y="${H - 14}">${y.year}</text>`;
  }).join('');
  return `<div class="forecast-chart-wrap">
    <svg class="forecast-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Сравнение дохода, OPEX и операционного потока">
      ${Array.from({ length: 5 }, (_, i) => {
        const y = pad.t + (ih * i) / 4;
        return `<line class="grid" x1="${pad.l}" y1="${y}" x2="${W - pad.r}" y2="${y}"/>`;
      }).join('')}
      ${bars}
    </svg>
    <div class="chart-key">
      <span><i style="background:${CHART.blue[0]}"></i>Валовой доход</span>
      <span><i style="background:${CHART.slate}"></i>OPEX</span>
      <span><i style="background:${CHART.mint}"></i>Операционный поток</span>
    </div>
  </div>`;
}

function forecastTable() {
  return `<div class="datatable-wrap"><table class="datatable"><thead><tr><th>Показатель</th>${D.funding.forecast.map(y => `<th class="num-cell">${y.year}</th>`).join('')}</tr></thead><tbody>${[
    ['Банков-партнёров', 'banks'],
    ['Транзакций, млн', 'tx'],
    ['Интеграция, млн ₽', 'integration'],
    ['Комиссии, млн ₽', 'fees'],
    ['Валовой доход, млн ₽', 'total'],
    ['OPEX, млн ₽', 'opex'],
    ['Операционный поток, млн ₽', 'profit']
  ].map(([label, k]) =>
    `<tr><td>${label}</td>${D.funding.forecast.map(y => `<td class="num-cell">${money(y[k])}</td>`).join('')}</tr>`
  ).join('')}</tbody></table></div>`;
}

function metricCards() {
  return `<div class="metric-compare">${D.metrics.map((m, i) => {
    const max = Math.max(m.nBefore, m.nAfter) * 1.08;
    const hBefore = Math.max(8, (m.nBefore / max) * 72);
    const hAfter = Math.max(8, (m.nAfter / max) * 72);
    return `<div class="metric-tile">
      <div class="num">0${i + 1} / ПЛАНОВОЕ СРАВНЕНИЕ</div>
      <h3>${m.name}</h3>
      <div class="compare-viz" aria-hidden="true">
        <div class="compare-col"><div class="cbar before" style="height:${hBefore}px"></div><span>До</span></div>
        <div class="compare-col"><div class="cbar after" style="height:${hAfter}px"></div><span>После</span></div>
      </div>
      <div class="compare-line"><div class="bar-label"><span>До</span><span>${m.before}</span></div><div class="track"><div class="bar-fill muted-fill" style="width:${(m.nBefore / max) * 100}%"></div></div></div>
      <div class="compare-line"><div class="bar-label"><span>После</span><span>${m.after}</span></div><div class="track"><div class="bar-fill aqua-fill" style="width:${(m.nAfter / max) * 100}%"></div></div></div>
      ${m.note ? `<p class="tiny muted" style="margin-top:14px">${m.note}</p>` : ''}
    </div>`;
  }).join('')}</div>`;
}

function evidenceBlock() {
  const evidence = [
    ['Архитектура Digital Sky описана', 'Проектный результат', 'Расширенная научная статья, стр. 7–8; диплом, раздел 2.3', 'Сетевой, протокольный и сервисный уровни; модель независимых ЦВЦБ.'],
    ['Проработан сценарий Россия — Китай', 'Проектный результат', 'Презентация, слайды 6–11; диплом, раздел 2.2', 'Инициация, проверки, подтверждения, PvP-операция и уведомление.'],
    ['Существуют макеты интерфейсов', 'Подтверждено материалами', 'Диплом, рис. 2.2–2.5', 'Регистрация, дашборд, перевод, раздел обменных курсов.'],
    ['Бюджет и коммерческая модель', 'Расчётная модель', 'Диплом, разделы 2.4–2.5', 'CAPEX 48,5 млн ₽, OPEX 24,75 млн ₽, финансовый прогноз.'],
    ['Показатели скорости и доступности', 'Оценка в курсовой', 'Курсовая работа, табл. 3.6', 'Табличные ориентиры до и после; замеры стенда не представлены.'],
    ['Реальные межбанковские интеграции', 'Не подтверждено', 'Переданные проектные материалы', 'Нет проверяемой документации о подключении ЦБ, ВТБ или ICBC.'],
    ['Промышленные денежные операции', 'Не подтверждено', 'Переданные проектные материалы', 'Публичный сайт не выполняет денежных переводов.']
  ];
  return `<div class="datatable-wrap"><table class="datatable"><thead><tr><th>Утверждение</th><th>Статус</th><th>Основание</th><th>Пояснение</th></tr></thead><tbody>${
    evidence.map(r => `<tr>${r.map((v, i) => `<td>${i === 1 ? `<strong>${v}</strong>` : v}</td>`).join('')}</tr>`).join('')
  }</tbody></table></div>`;
}

function gallery() {
  const g = [
    ['image7.jpeg', 'Регистрация / вход', 'Диплом: рис. 2.2.', 'Проектный интерфейс идентификации пользователя.'],
    ['image8.jpg', 'Личный кабинет', 'Диплом: рис. 2.3.', 'Обзор показателей и навигации по операциям.'],
    ['image9.jpg', 'Экран перевода', 'Диплом: рис. 2.4.', 'Поля пользовательского сценария международного перевода.'],
    ['image10.jpeg', 'Валюты и курсы', 'Диплом: рис. 2.5.', 'Информационный интерфейс валютных показателей.'],
    ['image11.png', 'Сценарий расчёта', 'Диплом: рис. 2.6.', 'Последовательность сообщений в проектной операции.']
  ];
  return `<div class="proof-gallery">${g.map(([f, t, loc, desc]) =>
    `<article class="proof"><img src="${link('assets/prototype/' + f)}" alt="${t} — скриншот из дипломного проекта" loading="lazy"><div class="proof-caption"><strong>${t}</strong><small>${desc}<br>${loc}</small></div><button class="proof-open" type="button" data-image="${f}" data-caption="${t}" aria-label="Увеличить: ${t}">Увеличить изображение ↗</button></article>`
  ).join('')}</div>`;
}

function finalCta(title = 'Обсудим исследование и архитектуру Digital Sky?', txt = 'Проект открыт к профессиональному обсуждению концепции, сценариев интеграции и дальнейших испытаний.') {
  return `<div class="cta-band"><div><h2>${title}</h2><p>${txt}</p></div><a class="btn primary" href="mailto:d.abubakarova@list.ru?subject=Digital%20Sky">Связаться с командой<span aria-hidden="true">↗</span></a></div>`;
}

function faq(items = D.faq) {
  return `<div class="faq-list">${items.map(([q, a]) =>
    `<details class="disclosure"><summary>${q}</summary><div>${a}</div></details>`
  ).join('')}</div>`;
}

function brandMark() {
  return `<span class="brand-mark" aria-hidden="true"><img src="${link('assets/brand/logo.png')}" alt="" width="36" height="36" decoding="async"></span>`;
}

function header() {
  const nav = D.nav.map(x =>
    `<a href="${link(x.path)}" class="${PAGE === x.id ? 'active' : ''}" ${PAGE === x.id ? 'aria-current="page"' : ''}>${x.label}</a>`
  ).join('');
  const user = window.DigitalSkyAuth && window.DigitalSkyAuth.currentUser();
  const authCtl = user
    ? `<a class="nav-cta" href="${link('cabinet/')}">Кабинет</a>`
    : `<a class="nav-cta" href="${link('auth/')}">Вход</a>`;
  return `<a class="skip-link" href="#main-content">Перейти к содержимому</a><header class="site-header"><div class="container header-inner"><a class="brand" href="${link('')}" aria-label="Digital Sky — главная">${brandMark()}<span>Digital <strong>Sky</strong></span></a><nav class="nav-links" id="main-nav" aria-label="Основная навигация">${nav}</nav><div class="header-right">${authCtl}<button class="menu-btn" id="mobile-menu" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="Открыть меню"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div></div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-main"><div class="footer-brand"><a class="brand" href="${link('')}">${brandMark()}<span>Digital <strong>Sky</strong></span></a><p class="hide-mobile">Исследовательский проект платформы взаимодействия цифровых валют центральных банков. На сайте показаны концепция, проектная модель и материалы разработки.</p></div><div><h4>Разделы</h4><div class="footer-links"><a href="${link('platform/')}">О платформе</a><a href="${link('about/')}">О проекте</a><a href="${link('research/')}">Исследования</a><a href="${link('contacts/')}">Контакты</a></div></div><div class="hide-mobile"><h4>Материалы</h4><div class="footer-links"><a href="${link('research/')}">Данные проекта</a><a href="${link('about/')}">Источники</a></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Digital Sky</span><span class="hide-mobile">Реальные платёжные операции и банковская авторизация на сайте недоступны.</span></div></div></footer>`;
}

function renderHome() {
  return `<div class="hero"><div class="container hero-inner"><div class="hero-copy">${eyebrow('Исследовательский проект')}<h1 class="display">Объединяем цифровые валюты. <span class="accent">Открываем возможности расчётов.</span></h1><p class="lead lead-full">Digital Sky — концепция платформы для взаимодействия национальных систем цифровых валют центральных банков. Исследуем согласованный межбанковский расчёт и технологическую совместимость финансовых инфраструктур.</p><p class="lead lead-short">Платформа для взаимодействия национальных систем цифровых валют центральных банков.</p><div class="button-row">${btn('О проекте', 'about/', 'primary')}${btn('О платформе', 'platform/', 'light-outline')}</div></div><div class="hero-art">${earthGlobe()}</div></div></div><div class="container"><div class="metric-strip"><div class="metric"><strong>3</strong><span>уровня архитектуры</span></div><div class="metric"><strong>PvP</strong><span>согласованный расчёт</span></div><div class="metric hide-mobile"><strong>2</strong><span>цифровые валюты в сценарии Россия — Китай</span></div><div class="metric hide-mobile"><strong>5</strong><span>видов исследовательских материалов</span></div></div></div>
${sec('problem', sectionTitle('ПРОБЛЕМА', 'Международный платёж — это больше, чем перевод между счетами.', 'Разные банковские системы, правовые режимы и правила проверки превращают трансграничную операцию в цепочку согласований. Цифровые валюты центральных банков создают новые возможности — и требуют новых способов взаимодействия.') + `<div class="card-grid">${card('Разрозненная инфраструктура', 'Национальные платформы ЦВЦБ могут иметь несовместимые протоколы и стандарты.', '01', '▣')}${card('Множество участников', 'Проверки, маршрутизация и расчёт требуют координации нескольких финансовых организаций.', '02', '⇄')}${card('Риск несогласованного исполнения', 'При обмене двух валют важно согласовать обе денежные части операции, не ограничиваясь передачей сообщения.', '03', '◈')}</div>`, 'white')}
${sec('approach', `<div class="split split-illust"><div>${sectionTitle('НАШ ПОДХОД', 'Связываем системы — не заменяя их.', 'Digital Sky предлагает интеграционный слой между национальными расчётными инфраструктурами. Концепция основана на модели взаимосвязанных систем ЦВЦБ, где центральные банки сохраняют контроль над своими валютами.')}<div class="tag-list hide-mobile"><span class="tag">Совместимость</span><span class="tag">Согласованное исполнение</span><span class="tag">Контроль участников</span></div><div class="button-row">${btn('О платформе', 'platform/')}</div></div>${illust('global-cbdc-network.png', 'Международная финансовая инфраструктура: глобус и цифровые валюты рубля и юаня', 'lg')}</div><div class="visual-panel hide-mobile" style="margin-top:28px">${layerStack()}</div>`, 'sky-soft')}
${sec('scenario', `<div class="split split-illust"><div>${sectionTitle('СЦЕНАРИЙ', 'Одна операция. Две национальные валюты.', 'В исследовании рассмотрена оплата российского импортёра китайскому экспортёру: заявку создаёт бизнес, банки обслуживают клиентов, а Digital Sky координирует согласование и расчёт.')}${compactFlow()}<div class="button-row hide-mobile">${btn('О проекте', 'about/')}</div>${source('Презентация «Прорыв 2.0»', 'Слайды 6–11; расширенная статья, стр. 9–10.')}</div>${illust('currency-pair-rub-cny.png', 'Обмен цифровых валют: кольцо монет с рублём и юанем', 'lg')}</div><div class="card-grid two hide-mobile" style="margin-top:28px"><article class="card home-step-illust">${illust('transaction-initiation.png', 'Инициация платёжной заявки: оформление документа и подпись', 'sm')}<h3>${D.steps[0].title}</h3><p>${D.steps[0].short}. ${D.steps[0].desc}</p></article><article class="card home-step-illust">${illust('transaction-verification.png', 'Проверка операции: документы и подтверждение условий', 'sm')}<h3>${D.steps[1].title}</h3><p>${D.steps[1].short}. ${D.steps[1].desc}</p></article></div>`, 'white')}
${sec('people', sectionTitle('УЧАСТНИКИ', 'Создаётся для банков. Понятно бизнесу.', 'Разделяем того, кто покупает технологию, и того, кто пользуется расчётной услугой.') + `<div class="illust-spotlight"><article class="card card-client-primary"><div class="num">01</div><h3>Коммерческие банки</h3><p>Потенциальные B2B-клиенты интеграционной платформы.</p></article>${illust('business-payment-wallet.png', 'Пользовательская сторона расчёта: кошелёк и валютные монеты рубля и юаня', 'md')}</div><div class="card-grid">${card('Импортёры и экспортёры', 'Конечные пользователи международных расчётов.', '02')}${card('Центральные банки', 'Участники и контролирующие стороны национальных систем ЦВЦБ.', '03')}${card('Финтех-компании', 'Потенциальные интеграторы и поставщики прикладных сервисов.', '04')}</div>`, 'sky')}
${sec('research-preview', `<div class="split wide"><div>${sectionTitle('ИССЛЕДОВАНИЯ', 'Проект, который можно изучать по данным.', 'Мы объединили исследовательские материалы: сравнение моделей ЦВЦБ, архитектуру, проектные показатели, финансовую модель и интерфейсный прототип.')}${btn('Открыть исследовательский центр', 'research/')}</div><div class="visual-panel"><div class="eyebrow hide-mobile">Расчётная модель из диплома</div><div class="chart-grid" style="margin-top:24px"><div><strong class="stat-mobile">48,5 млн ₽</strong><p class="tiny">CAPEX</p></div><div><strong class="stat-mobile">24,75 млн ₽</strong><p class="tiny">OPEX 1-го года</p></div></div><div class="hide-mobile">${fundingBars(D.funding.capex, 18)}${source('Дипломный проект', 'Раздел 2.4; цифры не являются фактическими расходами.')}</div></div></div>`, 'white')}
${sec('status', `<div class="split split-illust"><div>${sectionTitle('СТАТУС', 'От концепции к проверяемой технологии.', 'В представленных материалах разработаны архитектура, алгоритм операции и экраны прототипа. Реальные интеграции, запуск денежных переводов и измерения промышленной производительности документально не подтверждены.')}<div class="research-callout hide-mobile" style="margin-top:22px"><div class="callout-card">${tag('ПРОЕКТНЫЕ РЕЗУЛЬТАТЫ')}<h3 style="margin-top:20px">Концепция, алгоритм, интерфейсы</h3><p>Эти результаты представлены в дипломной работе, статьях и проектных презентациях.</p></div><div class="callout-card">${tag('СЛЕДУЮЩАЯ ЗАДАЧА')}<h3 style="margin-top:20px">Валидация расчётного ядра</h3><p>Испытать согласованную операцию между независимыми тестовыми средами и зафиксировать результаты.</p></div></div><div class="button-row">${btn('Исследования', 'research/')}</div></div>${illust('secure-settlement.png', 'Безопасность расчётов: щит и цифровые валюты рубля и юаня', 'lg')}</div>`, 'sky-soft')}
${sec('home-faq', sectionTitle('ОТВЕТЫ', 'Что стоит знать о Digital Sky?') + faq(D.faq.slice(0, 5)), 'white')}
${sec('cta', finalCta(), 'tint')}`;
}

function renderPlatform() {
  return pageHero('О платформе', 'Digital Sky — связующее звено между национальными системами цифровых валют.', 'Концепция международной расчётной платформы, где самостоятельные цифровые валюты взаимодействуют через общие технологические протоколы.') +
    sec('definition', `<div class="split"><div>${sectionTitle('ЧТО ЭТО', 'Не новая валюта и не замена банкам.', 'Digital Sky проектируется как технологическая инфраструктура для международных банковских операций. Центральные банки продолжают отвечать за собственные цифровые валюты, коммерческие банки — за обслуживание клиентов.')}<div class="quote-big">Задача Digital Sky — согласовать взаимодействие разных финансовых систем, не подменяя их функции.</div></div><div class="card-grid" style="grid-template-columns:1fr">${card('Не эмитент', 'Платформа не выпускает цифровые рубли, юани или другие государственные цифровые валюты.', '', '◎')}${card('Не центральный банк', 'Проект не предполагает переноса денежно-кредитных полномочий национальных регуляторов.', '', '▣')}${card('Не криптообменник', 'Главное направление исследования — межбанковская координация валютных обязательств.', '', '⇄')}</div></div>`, 'white') +
    sec('work', sectionTitle('ФУНКЦИЯ ПЛАТФОРМЫ', 'Три элемента одной инфраструктуры.') + `<div class="card-grid">${card('Межбанковская интеграция', 'Стандартизированный обмен финансовыми сообщениями и связь с существующими банковскими системами.', '01', '⌘')}${card('Координация сделки', 'Проверка условий, согласование готовности сторон, валютные параметры и запуск PvP-сценария.', '02', '⇄')}${card('Фиксация результата', 'Запись расчёта в реестре и уведомление сторон — согласно проектному алгоритму.', '03', '✓')}</div>`, 'tint') +
    sec('participants', sectionTitle('РОЛИ', 'Кто участвует в международном переводе?', 'На уровне пользователя — импортёр и экспортёр. На уровне денежной инфраструктуры — национальные и коммерческие банки.') + compactFlow() + `<div class="card-grid four" style="margin-top:26px">${card('Импортёр', 'Инициирует перевод в национальной цифровой валюте.', '', '↗')}${card('Коммерческий банк', 'Предоставляет доступ к платёжному сервису и обслуживает клиента.', '', '▣')}${card('Центральный банк', 'Управляет национальной цифровой валютой и соответствующим узлом.', '', '◎')}${card('Digital Sky', 'Координирует сообщения, проверки и согласованное исполнение.', '', '◇')}</div>`, 'white') +
    sec('access', `<div class="split"><div>${sectionTitle('ИНТЕРФЕЙСЫ', 'Банковская технология и пользовательское приложение — разные уровни.', 'В презентации клиент инициирует перевод через мобильный банк. В дипломе дополнительно приведены экраны самостоятельного пользовательского интерфейса Digital Sky. Оба подхода представлены как проектные варианты; их окончательные роли предстоит разграничить.')} ${note('Важное различие.', 'По бизнес-модели диплома основной платящий клиент — банк, подключающийся к API платформы.')}${source('Презентация и диплом', 'Слайд 6; диплом, разделы 2.2 и 2.5.')}</div><div class="visual-panel"><img src="${link('assets/prototype/image8.jpg')}" alt="Дашборд интерфейсного прототипа Digital Sky из диплома" loading="lazy" style="border:1px solid #DFE6EE;border-radius:10px"><p class="tiny muted" style="margin:15px 0 0">Интерфейсный прототип из дипломной работы, рис. 2.3</p></div></div>`, 'tint') +
    sec('method', sectionTitle('ПРИНЦИП', 'Национальные платформы сохраняют самостоятельность.', 'В расширенном исследовании Digital Sky проектируется по модели взаимосвязанных ЦВЦБ. Интеграционные шлюзы должны соединять системы, сохраняя полномочия их национальных операторов.') + layerStack() + source('Расширенная научная статья', 'Стр. 7–8; диплом, раздел 2.3.'), 'white') +
    sec('cta', finalCta('Узнайте больше о проекте Digital Sky.', 'История исследования, научная база и материалы команды собраны в разделе «О проекте».'), 'tint');
}

function renderHow() {
  return pageHero('Как это работает', 'Одна международная сделка. Шесть этапов.', 'Пошаговый сценарий из материалов Digital Sky: оплата поставки российским импортёром китайскому экспортёру через банковскую инфраструктуру.', note('Демонстрационный сценарий.', 'ВТБ, ЦБ России, ЦБ Китая и ICBC фигурируют как участники проектного примера. Их действующее подключение или партнёрство не подтверждено.', 'navy')) +
    sec('route', sectionTitle('МАРШРУТ', 'От российского импортёра — китайскому поставщику.', 'В модели операции цифровые рубли и цифровые юани участвуют в согласованном валютном расчёте, а каждый банк продолжает обслуживать своего клиента.') + compactFlow() + `<div class="card-grid two" style="margin-top:22px">${card('Рублёвая сторона', 'Импортёр, банк-отправитель и национальная система цифрового рубля.', '', '₽')}${card('Юаневая сторона', 'Банк-получатель, экспортёр и национальная система цифрового юаня.', '', '¥')}</div>${source('Презентация проекта', 'Слайды 6–11; расширенное исследование, стр. 9–10.')}`, 'white') +
    sec('interactive', sectionTitle('ИНТЕРАКТИВНАЯ СХЕМА', 'Выберите этап операции.', 'Нажмите на любой из шести шагов, чтобы увидеть участников, действия и условия перехода.') + stepper() + source('Презентация и диплом', 'Презентация: клиентский путь; диплом: алгоритм PvP.'), 'tint') +
    sec('pvp', `<div class="split"><div>${sectionTitle('КЛЮЧЕВОЙ МЕХАНИЗМ', 'PvP: исполнение одной валютной части связано с другой.', 'Payment-versus-Payment означает, что две стороны валютного расчёта должны исполняться согласованно. Для Digital Sky такой подход предлагается реализовать с использованием атомарных операций и смарт-контрактной логики.')}<p>В дипломе указано: если один из необходимых этапов выполнить нельзя, операция должна отменяться, а резервированные средства — возвращаться отправителю.</p>${btn('Исследования', 'research/')}</div><div class="visual-panel"><div class="eyebrow">СОГЛАСОВАННЫЙ ОБМЕН</div><div class="card-grid two" style="margin-top:22px"><div class="card"><div class="iconbox">₽</div><h3>Цифровые рубли</h3><p>Резервирование и предлагаемое списание.</p></div><div class="card"><div class="iconbox">¥</div><h3>Цифровые юани</h3><p>Встречное зачисление получателю.</p></div></div><div class="notice" style="margin-top:22px">Условие модели: встречные денежные части должны завершиться согласованно или операция не должна считаться исполненной.</div></div></div>`, 'white') +
    sec('clarity', sectionTitle('ВАЖНЫЕ РАЗЛИЧИЯ', 'Кто отправляет деньги, а кто обеспечивает расчёт?') + `<div class="card-grid">${card('Компания', 'Инициирует платеж и принимает результат.', '', '▣')}${card('Коммерческий банк', 'Предоставляет клиенту платёжный интерфейс.', '', '◈')}${card('Центральный банк', 'Контролирует собственную национальную ЦВЦБ.', '', '◎')}</div>${note('Статус технологии.', 'Схема описывает проектное поведение; реальная межбанковская операция по этим данным не доказана.')}`, 'tint') +
    sec('cta', finalCta('Изучите цифры, диаграммы и доказательную базу.', 'Все приведённые в проекте показатели собраны в исследовательском центре с ссылками на документы.'), 'white');
}

function renderTechnology() {
  return pageHero('Технологии', 'Архитектура, построенная вокруг совместимости.', 'Digital Sky исследует взаимодействие независимых национальных платформ ЦВЦБ на основе интеграционных интерфейсов и согласованного валютного расчёта.') +
    sec('layers', sectionTitle('АРХИТЕКТУРА', 'Три взаимосвязанных уровня.', 'В расширенной статье и дипломе описаны сетевой, протокольный и сервисный уровни консорциумной архитектуры.') + layerStack() + `<div class="visual-panel" style="margin-top:24px">${archDiagram()}</div>` + source('Расширенная статья', 'Стр. 7–8; диплом, стр. 32–33.'), 'white') +
    sec('primitives', sectionTitle('РАСЧЁТНЫЙ ПРОТОКОЛ', 'В центре — согласование двух валютных обязательств.', 'Система предполагает межсистемный обмен данными и использование механизма атомарного обмена для исполнения цифровых валют.') + `<div class="card-grid">${card('Payment-versus-Payment', 'Принцип согласованного завершения двух денежных частей обмена.', '01', '⇄')}${card('Смарт-контракты', 'Проектная автоматизация условий, подтверждений и исполняемых действий.', '02', '⌘')}${card('Межсистемные шлюзы', 'Стандартизированные интерфейсы между платформами ЦВЦБ и банковскими системами.', '03', '▦')}</div>${note('Для технической валидации.', 'Описание атомарности в дипломе не заменяет спецификацию подтверждения окончательности в двух независимых реестрах.', 'warn')}`, 'tint') +
    sec('stack', sectionTitle('ПРОГРАММНАЯ СРЕДА', 'Технологический стек, приведённый в дипломе.', 'В работе перечислены компоненты предполагаемого решения; сам факт их перечисления не свидетельствует о развёртывании промышленной системы.') + `<div class="card-grid four">${card('React', 'Разработка пользовательского интерфейса.', '', '⌘')}${card('Java / Python', 'Серверная логика и сервисы.', '', '⌘')}${card('PostgreSQL', 'Структурированные данные платформы.', '', '▤')}${card('Docker / Kubernetes', 'Контейнеризация и оркестрация сервисов.', '', '▦')}</div><div class="card-grid" style="margin-top:18px">${card('Permissioned blockchain', 'Модель консорциумного реестра с определённым кругом участников.', '', '◇')}${card('API', 'Соединение платформы с внутренними системами банков.', '', '⇄')}${card('AML / KYC', 'Проверка участников и условий расчёта.', '', '◈')}</div>${source('Диплом', 'Разделы 2.1–2.3.')}`, 'white') +
    sec('constraints', sectionTitle('ТЕХНИЧЕСКИЕ ВЫЗОВЫ', 'Что требуется проверить перед внедрением.', 'В исследовании прямо названы сложности совместимости протоколов ЦВЦБ, интеграции с устаревшими банковскими системами и масштабирования при росте нагрузки.') + `<div class="card-grid">${card('Разные стандарты', 'Разработка и проверка адаптеров между несовместимыми национальными платформами.', '01', '⇄')}${card('Legacy-системы', 'Интеграционные промежуточные слои без полной замены банковской инфраструктуры.', '02', '▣')}${card('Производительность', 'Оценка нагрузки и устойчивости при расширении числа банков и транзакций.', '03', '◷')}</div>${source('Расширенная статья', 'Стр. 10; диплом, стр. 35.')}`, 'tint') +
    sec('cta', finalCta('Подробнее о данных, допущениях и рисках.', 'В исследовательском центре доступны технические оценки и указаны границы их доказанности.'), 'white');
}

function renderAudiences() {
  return pageHero('Для кого', 'Одна платформа — несколько ролей в международном расчёте.', 'Основная описанная бизнес-модель Digital Sky ориентирована на банки. Корпоративные пользователи получают результат через финансовую инфраструктуру.') +
    sec('stakeholders', sectionTitle('ЦЕЛЕВАЯ АУДИТОРИЯ', 'Кому предназначено решение?', 'Сегменты следуют из проектной презентации и раздела о коммерциализации в дипломной работе.') + `<div class="card-grid two">${card('Коммерческие банки', 'Потенциальные B2B-клиенты: технологические шлюзы для взаимодействия с иностранной расчётной инфраструктурой.', '', '▣')}${card('Импортёры и экспортёры', 'Конечные пользователи: внешнеторговые предприятия, которым необходимо провести международную оплату.', '', '↗')}${card('Центральные банки', 'Инфраструктурные участники: узлы управления национальными системами ЦВЦБ и требованиями их обращения.', '', '◎')}${card('Финтех и PSP', 'Возможные интеграторы приложений и сервисов, при соблюдении технических и регуляторных условий.', '', '⌘')}</div>${source('Презентация и диплом', 'Слайд 14 «Для кого наше решение?»; диплом, раздел 2.5.')}`, 'white') +
    sec('business-model', `<div class="split"><div>${sectionTitle('БИЗНЕС-МОДЕЛЬ', 'Технологию приобретает банк. Перевод инициирует бизнес.', 'В финансовой модели диплома описана B2B-коммерциализация за счёт подключения банков к API-платформе и платы за успешные транзакции.')}<p>Документы не разъясняют окончательно, кто фактически несёт транзакционную комиссию — банк или его клиент. Поэтому мы показываем её как предложенный тариф платформы, а не готовый тариф для предпринимателя.</p>${btn('Разбор экономической модели', 'research/#economics')}</div><div class="visual-panel"><div class="eyebrow">ПО ДИПЛОМУ / ПРОЕКТНАЯ МОДЕЛЬ</div><div style="display:grid;gap:23px;margin-top:24px"><div><strong style="font-size:40px">1,5 млн ₽</strong><p class="tiny">единоразовая интеграция банковского узла</p></div><div><strong style="font-size:40px">20 ₽</strong><p class="tiny">проектная комиссия за успешную транзакцию</p></div></div>${source('Диплом', 'Раздел 2.5, стр. 38; не действующая тарифная сетка.')}</div></div>`, 'tint') +
    sec('end-user', sectionTitle('КЛИЕНТСКИЙ ОПЫТ', 'Как выглядит использование для предпринимателя?', 'Компания обращается к сервису обслуживающего банка, указывает получателя и желаемую валюту. Банк взаимодействует с расчётной инфраструктурой, а Digital Sky координирует проектный сценарий.') + stepper() + `<div class="status-inline">В дипломе дополнительно предусмотрен собственный интерфейс Digital Sky; окончательное разграничение пользовательских каналов в документах не определено.</div>`, 'white') +
    sec('cta', finalCta('Обсудить отраслевой сценарий использования.', 'Расскажите об интересующих вас расчётных операциях, архитектуре и исследовательских задачах.'), 'tint');
}

function renderSecurity() {
  return pageHero('Безопасность', 'Безопасность должна быть частью каждого этапа расчёта.', 'В проектных материалах рассматривается многоуровневая защита финансовых данных, участников и расчётных операций.', note('Статус раздела.', 'Приведённые механизмы — архитектурные решения и исследовательские требования, а не доказательство сертификации или аудита действующей платформы.', 'navy')) +
    sec('security-stack', sectionTitle('МНОГОУРОВНЕВЫЙ ПОДХОД', 'Защита не сводится к одному шифрованию.', 'Курсовая работа подробно описывает уровни защищённого межгосударственного обмена данными. Этот материал относится к предлагаемым средствам и требованиям.') + `<div class="card-grid">${card('Идентификация и доступ', 'PKI, цифровые сертификаты, аутентификация и контроль ролей.', '01', '◈')}${card('Передача данных', 'Защищённые каналы VPN / TLS / IPSec для финансовых сообщений.', '02', '⇄')}${card('Целостность', 'Цифровые подписи и предусмотренная фиксация операций в реестре.', '03', '◇')}${card('Мониторинг', 'SIEM, анализ событий и предлагаемый интеллектуальный контроль аномалий.', '04', '▦')}${card('Проверка операций', 'Планируемая интеграция с требованиями AML/KYC и подтверждениями участников.', '05', '✓')}${card('Защита хранения', 'Разграничение доступа, хранение записей и аудит событий.', '06', '▤')}</div>${source('Курсовая работа', 'Глава 3; расширенная статья, стр. 8.')}`, 'white') +
    sec('control', `<div class="split"><div>${sectionTitle('СВЯЗЬ С РАСЧЁТАМИ', 'Безопасность и окончательность — разные задачи.', 'Защищённый канал обеспечивает целостность передачи сообщения. Но успешная передача информации сама по себе ещё не означает, что обе валютные части международной операции окончательно исполнены.')}${note('Исследовательская задача.', 'Раздельно проверять криптографическую защиту, корректность проверок и согласованное исполнение PvP-расчёта.')}</div><div class="visual-panel"><div class="eyebrow">КОНТУР КОНТРОЛЯ</div>${['Проверка идентичности', 'Контроль полномочий', 'Валидация операции', 'Согласование расчёта', 'Регистрация результата', 'Мониторинг инцидентов'].map((x, i) => `<div class="simple-row"><span class="index">${String(i + 1).padStart(2, '0')}</span><div><h3>${x}</h3></div></div>`).join('')}</div></div>`, 'tint') +
    sec('risks', sectionTitle('ЧЕСТНЫЙ ПОДХОД', 'Что ещё не подтверждено документами.', 'В переданных материалах нет опубликованных результатов независимого аудита полноценной платформы, сертификации расчётного ядра или результатов нагрузочных испытаний на банковской инфраструктуре.') + `<div class="card-grid">${card('Криптографическая валидация', 'Необходимо подтвердить реализацию и корректность заявленных мер на конкретном стенде.', '', '◈')}${card('Тестирование сбоев', 'Необходима демонстрация возврата средств при отказе одной стороны PvP-операции.', '', '◷')}${card('Правовой контур', 'Для международного исполнения необходимы согласованные правила и полномочия.', '', '▣')}</div>`, 'white') +
    sec('cta', finalCta('Ознакомиться с исследовательскими источниками.', 'В разделе «Исследования» описаны материалы, ограничения и статус каждой группы данных.'), 'tint');
}

function researchNav() {
  return `<div class="research-subnav"><div class="container">${[
    ['research-sources', 'Документы'],
    ['market', 'Проблема рынка'],
    ['models', 'Модели ЦВЦБ'],
    ['research-arch', 'Архитектура'],
    ['research-flow', 'Транзакция'],
    ['prototype', 'Прототип'],
    ['economics', 'Экономика'],
    ['performance', 'Показатели'],
    ['research-security', 'Защита'],
    ['risks', 'Ограничения'],
    ['evidence', 'Доказательность']
  ].map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</div></div>`;
}

function renderResearch() {
  return `<div class="research-page">${pageHero('Исследования', 'Данные, модели, схемы и проверяемая основа Digital Sky.', 'Исследовательский центр проекта: от анализа международных расчётов и моделей ЦВЦБ до архитектуры платформы, проектных финансовых показателей и прототипа интерфейса.', note('Как читать раздел.', 'Финансовые величины — прогноз дипломной модели. Показатели «до / после» — расчётные данные курсовой по системе защищённого обмена, а не измерения промышленной работы Digital Sky.', 'navy'))}
<div class="container"><div class="metric-strip"><div class="metric"><strong>3</strong><span>модели совместимости ЦВЦБ в исследовании</span></div><div class="metric"><strong>48,5 млн ₽</strong><span>CAPEX — проектный бюджет</span></div><div class="metric"><strong>24,75 млн ₽</strong><span>OPEX первого года по модели</span></div><div class="metric"><strong>3 года</strong><span>горизонт финансового прогноза</span></div></div></div>${researchNav()}
${sec('research-sources', sectionTitle('ИСТОЧНИКИ', 'Пять блоков исследовательских материалов.', 'Выводы ниже опираются на представленные авторами материалы. Для каждого набора данных указаны документ и конкретный раздел или таблица. Источники не заменены неподтверждёнными публикациями.') + sourceCards() + `<div class="status-inline">В исходных файлах присутствуют две одинаковые версии курсовой работы и две близкие по содержанию презентации. На сайте они учитываются как единые исследовательские материалы, а не отдельные исследования.</div>`, 'white')}
${sec('market', sectionTitle('КОНТЕКСТ', 'Что исследование считает проблемами международных расчётов?', 'В статье отмечены комиссии, продолжительность, участие нескольких посредников и сложности трансграничного согласования. Приведённые оценки относятся к анализу авторов, а не к независимым замерам Digital Sky.') + `<div class="chart-grid"><div class="visual-panel"><div class="panel-heading"><div><h3>Стоимость традиционного перевода</h3><p>Диапазон, приведённый в научной статье</p></div>${tag('ОЦЕНКА АВТОРОВ')}</div><span class="stat-hero">1–3%</span><p>указанная в статье оценка комиссии трансграничного платежа</p><div class="track" style="height:10px"><div class="bar-fill" style="width:100%"></div></div>${source('Итоговая статья', 'Стр. 2–3; диапазон не является универсальным тарифом.')}</div><div class="visual-panel"><div class="panel-heading"><div><h3>Время традиционного перевода</h3><p>По анализу авторов статьи</p></div>${tag('ОЦЕНКА АВТОРОВ')}</div><span class="stat-hero">1–5</span><p>рабочих дней — указанный диапазон обработки</p><div class="track" style="height:10px"><div class="bar-fill aqua-fill" style="width:100%"></div></div>${source('Итоговая статья', 'Стр. 2–3; скорость зависит от маршрута и условий.')}</div></div><div class="visual-panel" style="margin-top:22px"><div class="panel-heading"><div><h3>Два способа организации международной операции</h3><p>Схематическое, качественное сравнение</p></div><span class="panel-legend">Без выдуманных количественных оценок</span></div><div class="card-grid two"><div class="card"><div class="num">ТРАДИЦИОННЫЙ ПОДХОД</div><h3>Последовательное взаимодействие</h3><p>Различные участники обмениваются сообщениями и исполняют собственные расчётные обязательства по правилам соответствующих систем.</p></div><div class="card"><div class="num">ПРОЕКТИРУЕМЫЙ DIGITAL SKY</div><h3>Согласованный межсистемный расчёт</h3><p>Концепция предусматривает координацию готовности сторон и связанность двух валютных частей по принципу PvP.</p></div></div></div>`, 'tint')}
${sec('models', sectionTitle('НАУЧНАЯ ОСНОВА', 'Три модели совместимости национальных ЦВЦБ.', 'В научных материалах различаются совместимые, взаимосвязанные и единые мультивалютные системы. Digital Sky спроектирован именно в логике взаимосвязанных систем.') + `<div class="models"><div class="model"><div class="num">МОДЕЛЬ 01</div><div class="model-topo">${modelTopo(1)}</div><h3>Совместимые национальные системы</h3><p>Страны согласуют стандарты, идентификацию и регуляторные требования при сохранении отдельных платформ.</p><ul><li>Унификация принципов взаимодействия</li><li>Национальная инфраструктура сохраняется</li><li>Прямой общей технологической платформы может не быть</li></ul></div><div class="model featured"><div class="num">МОДЕЛЬ 02 · В ОСНОВЕ DIGITAL SKY</div><div class="model-topo">${modelTopo(2)}</div><h3>Взаимосвязанные системы ЦВЦБ</h3><p>Независимые платформы соединяются шлюзами и протоколами взаимодействия.</p><ul><li>Сохранение национального контроля</li><li>Обмен между разнородными платформами</li><li>Необходимость технических и юридических соглашений</li></ul></div><div class="model"><div class="num">МОДЕЛЬ 03</div><div class="model-topo">${modelTopo(3)}</div><h3>Единая мультивалютная система</h3><p>Несколько валют используют общий реестр или интегрированную расчётную инфраструктуру.</p><ul><li>Расчёт разных валют внутри общей системы</li><li>Высокая степень согласования</li><li>Общие правила управления платформой</li></ul></div></div><div class="notice warn" style="margin-top:23px"><strong>Различие в формулировках источников.</strong> Статья выбирает для архитектуры Digital Sky взаимосвязанные системы, но в итоговом сравнении называет перспективными полностью интегрированные мультивалютные системы. Эти тезисы не следует смешивать.</div>${source('Научные статьи', 'Итоговая статья: табл. 1; расширенная статья: стр. 7 и 10.')}`, 'white')}
${sec('research-arch', sectionTitle('АРХИТЕКТУРА', 'Три уровня платформы Digital Sky.', 'Научная статья и диплом описывают консорциумный подход, в котором национальные центробанки и коммерческие банки участвуют в разных частях финансового сценария.') + layerStack() + `<div class="visual-panel" style="margin-top:24px"><div class="panel-heading"><div><h3>Слои и роли</h3><p>Концептуальная схема, а не работающая банковская сеть</p></div>${tag('АРХИТЕКТУРА')}</div>${archDiagram()}${compactFlow()}</div>${source('Расширенная статья', 'Стр. 7–8; диплом, раздел 2.3.')}`, 'tint')}
${sec('research-flow', sectionTitle('АЛГОРИТМ', 'Как описана транзакция Россия — Китай.', 'В расширенной статье расчёт представлен как последовательность: блокировка цифровых рублей, проверки, готовность участников, атомарный PvP-обмен и запись результата.') + stepper() + source('Расширенная научная статья', 'Стр. 9–10; проектная презентация: слайды 6–11.'), 'white')}
${sec('prototype', sectionTitle('ИНТЕРФЕЙСНЫЙ ПРОТОТИП', 'Экраны Digital Sky из дипломного проекта.', 'Это реальные изображения, встроенные в предоставленный диплом: регистрация, рабочая панель, экран перевода, валютный раздел и последовательность действий. Они подтверждают проработку интерфейса, но не доказывают готовность банковской инфраструктуры.') + gallery() + `<div class="notice" style="margin-top:20px">Нажмите на изображение, чтобы изучить экран в увеличенном виде. Скриншоты сохранены из дипломного файла без переосмысления содержимого.</div>`, 'tint')}
${sec('economics', sectionTitle('ФИНАНСОВАЯ МОДЕЛЬ', 'Экономика Digital Sky: исходные расчёты из диплома.', 'Показаны планируемые капитальные затраты, операционные расходы и трёхлетний прогноз. Это сценарий финансового планирования, а не отчёт о фактических доходах и подключениях.') + `<div class="chart-grid">${donut('CAPEX: разработка', D.funding.capex, 48.5, 'Первоначальные инвестиции, млн ₽')}${donut('OPEX: первый год', D.funding.opex, 24.75, 'Операционные расходы в год, млн ₽')}</div><div class="chart-grid" style="margin-top:20px"><div class="visual-panel"><h3>Структура CAPEX</h3><p class="tiny">По статьям расходов, млн ₽</p>${fundingBars(D.funding.capex, 18)}</div><div class="visual-panel"><h3>Структура OPEX</h3><p class="tiny">Первый год, млн ₽</p>${fundingBars(D.funding.opex, 14.4)}</div></div><details class="disclosure" style="margin-top:24px"><summary>Исходные таблицы CAPEX и OPEX — раскрыть</summary><div><h3>CAPEX</h3>${fundingTable(D.funding.capex, 'Статья затрат')}<h3 style="margin-top:24px">OPEX</h3>${fundingTable(D.funding.opex, 'Статья затрат')}</div></details>
<div class="visual-panel" style="margin-top:28px"><div class="panel-heading"><div><h3>Трёхлетний финансовый прогноз</h3><p>Выберите показатель и сравните три года</p></div>${tag('ПРОГНОЗ')}</div><div class="filter-line"><label for="forecast-field">Показатель</label><select id="forecast-field">${Object.entries(forecastColumns).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select><button class="btn-mini" id="export-finance" type="button">Скачать данные CSV ↓</button></div><div id="forecast-graphic" aria-live="polite">${forecastChart('total')}</div>
<div style="margin-top:28px"><div class="panel-heading"><div><h3>Доход, OPEX и операционный поток</h3><p>Сопоставление ключевых строк прогноза по годам</p></div></div>${forecastCompareChart()}</div>
<details class="disclosure" style="margin-top:20px"><summary>Показать финансовую таблицу из диплома</summary><div>${forecastTable()}</div></details><div class="forecast-note"><b>Как читать прогноз:</b> годовые транзакции — 1,5 / 4,5 / 12 млн, а количество банков — 10 / 15 / 25 по таблице диплома. В ней не разъяснено, количество банков накопительное или новые подключения в каждом году; следовательно, суммы интеграционной выручки нуждаются в уточнении. Фактические поступления не представлены.</div></div>
<div class="research-callout" style="margin-top:24px"><div class="callout-card"><div class="eyebrow">РАСЧЁТНЫЙ СРОК</div><strong style="margin-top:14px">≈16 месяцев</strong><p>Заявленная в дипломе оценка окупаемости капитальных затрат. Основана на предположениях финансовой модели.</p></div><div class="callout-card"><div class="eyebrow">ЗАЯВЛЕННЫЙ ПОТЕНЦИАЛ</div><strong style="margin-top:14px">98%+</strong><p>Расчётная экономия относительно выбранного традиционного тарифа. Не является доказанной экономией полных затрат на реальную операцию.</p></div></div>${source('Дипломный проект', 'Разделы 2.4–2.5, табл. 4, стр. 35–39.')}`, 'white')}
${sec('performance', sectionTitle('ПРОЕКТНЫЕ ПОКАЗАТЕЛИ', 'Технические ориентиры из курсовой работы.', 'Курсовая по защищённому межгосударственному обмену данными содержит сравнение целевых параметров «до / после». Эти значения не представлены как результаты испытаний готового Digital Sky.') + metricCards() + `<div class="notice warn" style="margin-top:24px"><b>Ограничение доказательности.</b> Таблица 3.6 не содержит полной методики замера на развернутой системе Digital Sky. Диаграммы показывают исходные значения курсовой, а не достигнутые показатели коммерческой платформы.</div>${source('Курсовая работа', 'Таблица 3.6, стр. 39–40.')}`, 'tint')}
${sec('research-security', sectionTitle('ИНФОРМАЦИОННАЯ БЕЗОПАСНОСТЬ', 'Защитные механизмы в исследовательских материалах.', 'Проектные документы предлагают криптографические средства и многоуровневую защиту передачи финансовой информации.') + `<div class="card-grid">${card('PKI и цифровые подписи', 'Установление доверия к участникам и защита целостности сообщений.', '', '◈')}${card('VPN / TLS / IPSec', 'Защищённая передача межсистемных сообщений.', '', '⇄')}${card('Реестр транзакций', 'Регистрация результата для последующего контроля и аудита.', '', '▤')}${card('AML / KYC', 'Предлагаемая встроенная проверка участников и транзакций.', '', '✓')}${card('SIEM', 'Мониторинг событий и выявление подозрительной активности.', '', '▦')}${card('AI / ML аналитика', 'В курсовой предложена аналитика угроз; практическая реализация не подтверждена.', '', '⌘')}</div>${source('Курсовая и расширенная статья', 'Курсовая: гл. 3; статья: стр. 8.')}`, 'white')}
${sec('risks', sectionTitle('ОГРАНИЧЕНИЯ', 'Риски названы самой командой проекта.', 'На слайде «Ограничения платформы» авторы выделяют регуляторные, технологические, политико-экономические и бизнес-вызовы. Мы не подменяем их вымышленной количественной оценкой вероятности.') + `<div class="card-grid four">${D.constraints.map((x, i) => card(x.title, x.desc, String(i + 1).padStart(2, '0'), ['◈', '⇄', '◎', '▤'][i])).join('')}</div><div class="notice" style="margin-top:25px"><b>Дополнительные риски из статьи:</b> цифровая долларизация, ускорение оттока капитала, валютная волатильность и зависимость от ограниченного числа технологических провайдеров. Это общие риски трансграничного использования ЦВЦБ, не доказанные последствия эксплуатации Digital Sky.</div>${source('Презентация; итоговая научная статья', 'Слайд 17 (ограничения); статья, стр. 5.')}`, 'tint')}
${sec('evidence', sectionTitle('ЧТО МОЖНО ДОКАЗАТЬ', 'Матрица подтверждённости заявлений.', 'Разделяем наличие документации, проектные предположения и результаты, подтверждение которых в переданных материалах отсутствует.') + evidenceBlock() + `<div class="chart-grid" style="margin-top:22px"><div class="notice"><strong>Представлено документально:</strong> описание концепции, модели совместимости, алгоритм, макеты интерфейсов и бюджетные таблицы.</div><div class="notice warn"><strong>Не подтверждено этими файлами:</strong> промышленный запуск, банковские подключения и результаты реальных переводов.</div></div>`, 'white')}
${sec('research-end', finalCta('Результаты для изучения, вопросы — для обсуждения.', 'Digital Sky представляет научную концепцию и материалы проектирования. Обсудим возможности валидации и дальнейшего развития.'), 'tint')}</div>`;
}

function renderRoadmap() {
  return pageHero('Развитие', 'От исследовательской модели — к проверяемому расчётному механизму.', 'В материалах представлены концепция, интерфейсная проработка и финансовый сценарий. Следующие этапы здесь показаны как предлагаемый план развития, а не как утверждённый график запуска.') +
    sec('progress', sectionTitle('СТАТУС', 'Что уже отражено в материалах проекта?') + `<div class="timeline"><div class="milestone">${tag('ДОКУМЕНТИРОВАНО')}<h3>Исследовательская база</h3><p>Анализ трансграничных расчётов, три модели совместимости ЦВЦБ и перечень ограничений.</p></div><div class="milestone">${tag('ДОКУМЕНТИРОВАНО')}<h3>Концепция архитектуры</h3><p>Три уровня, участники, проектный протокол PvP и алгоритм Россия — Китай.</p></div><div class="milestone">${tag('ПРЕДСТАВЛЕНЫ МАКЕТЫ')}<h3>Клиентские экраны</h3><p>Регистрация, личный кабинет, валютный раздел и форма перевода из дипломной работы.</p></div><div class="milestone">${tag('РАСЧЁТНАЯ МОДЕЛЬ')}<h3>Экономика проекта</h3><p>Бюджет разработки, операционные расходы и трёхлетний прогноз.</p></div></div>`, 'white') +
    sec('next', sectionTitle('СЛЕДУЮЩИЕ ШАГИ', 'Что предстоит проверить.', 'Приоритеты вытекают из ограничений, непосредственно отмеченных в материалах проекта. Ниже — рекомендация для развития, не утверждённое обязательство участников.') + `<div class="info-steps">${[
      ['01', 'Тестовые реестры', 'Смоделировать две независимые цифровые валюты и согласованный расчёт.'],
      ['02', 'Протокол PvP', 'Проверить отказ, отмену, возврат резерва и корректность результата.'],
      ['03', 'Интеграционные API', 'Описать сообщение, подтверждение, журнал событий и статусы операций.'],
      ['04', 'Метрики и экономика', 'Сделать воспроизводимые замеры скорости и пересчёт полной себестоимости.']
    ].map(x => `<article class="info-step"><span class="big-number">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('')}</div>`, 'tint') +
    sec('constraints', sectionTitle('БАРЬЕРЫ', 'Что должно быть решено до промышленного применения.') + `<div class="card-grid">${card('Правовые согласования', 'Разрешения, требования разных стран, полномочия сторон и правила урегулирования.', '', '◈')}${card('Совместимость', 'Проверенная связь разных национальных платформ и банковских систем.', '', '⇄')}${card('Эксплуатационная модель', 'Ответственные участники, мониторинг, финансирование, разграничение обязанностей.', '', '▤')}</div>${source('Презентация', 'Слайд «Ограничения платформы».')}`, 'white') +
    sec('cta', finalCta('Есть предложения по испытанию архитектуры?', 'Подключайтесь к профессиональному обсуждению следующего этапа проекта.'), 'tint');
}

function renderAbout() {
  return pageHero('О проекте', 'Digital Sky — исследование будущей инфраструктуры международных расчётов.', 'Проект развивается на пересечении цифровых валют центральных банков, банковской интеграции, защищённого обмена данными и технологий согласованного исполнения.') +
    sec('mission', `<div class="split"><div>${sectionTitle('ИДЕЯ', 'Объединить совместимость, контроль и расчёт.', 'Исходная задача исследования — найти подход, при котором национальные цифровые валюты могут взаимодействовать для международных операций, не утрачивая собственной инфраструктуры и полномочий выпускающих их центральных банков.')}${note('Позиционирование.', 'Digital Sky — исследовательская и проектная инициатива. Заявлять действующую глобальную банковскую сеть на основании данных материалов нельзя.')}</div>${networkDiagram()}</div>`, 'white') +
    sec('history', sectionTitle('ИСТОЧНИКИ', 'Как изучалась идея проекта?') + sourceCards(), 'tint') +
    sec('team', sectionTitle('ИССЛЕДОВАТЕЛЬСКИЙ КОНТЕКСТ', 'Люди и материалы, упомянутые в документах.', 'В научной статье указаны авторы Магомаева Л. Р., Абубакарова Д. А. и Цадаев З. Р. Университетская аффилиация: Грозненский государственный нефтяной технический университет имени академика М. Д. Миллионщикова. В проектной презентации также указаны роли участников команды.') + `<div class="card-grid">${card('Научная работа', 'Трансграничные расчёты с использованием цифровых валют центральных банков; исследовательская база Digital Sky.', '', '▤')}${card('Проектирование', 'Архитектура, алгоритм международной сделки, пользовательские экраны и финансовые расчёты.', '', '▦')}${card('Командная работа', 'В презентации указаны роли технологического специалиста, аналитика и дизайнера. Официальный актуальный состав требует утверждения.', '', '◇')}</div>${source('Итоговая научная статья; презентация', 'Титульная часть статьи, слайд с командой.')}`, 'white') +
    sec('cta', finalCta('Интересна исследовательская часть Digital Sky?', 'Все исходные показатели и графические модели доступны в разделе «Исследования».'), 'tint');
}

function renderContacts() {
  return pageHero('Контакты', 'Обсудим Digital Sky и его исследовательскую концепцию.', 'Сайт предназначен для знакомства с проектом и профессионального диалога о технологиях межбанковских трансграничных расчётов.') +
    sec('contact', `<div class="split"><div>${sectionTitle('ОБРАТНАЯ СВЯЗЬ', 'В каких вопросах мы можем быть полезны друг другу?', 'Интересны экспертные замечания к протоколу PvP, запросы на исследовательские материалы, совместные обсуждения интеграций и оценки экономической модели.')}<div class="two-col-list">${[
      ['01', 'Архитектура и протоколы', 'Технологическое обсуждение'],
      ['02', 'Научные материалы', 'Вопросы по исследованиям'],
      ['03', 'Банковские интеграции', 'Разбор возможных сценариев'],
      ['04', 'Партнёрские инициативы', 'Обратная связь и предложения']
    ].map(([i, t, d]) => `<div class="simple-row"><span class="index">${i}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div></div><div class="contact-card">${tag('КАНАЛ СВЯЗИ')}<h3 style="margin-top:20px">Контакт проекта</h3><p>Адрес для связи указан в проектной презентации 2026 года. Перед публикацией сайта необходимо подтвердить, что этот адрес актуален и разрешён для публичного использования.</p><a class="btn dark-btn" href="mailto:d.abubakarova@list.ru?subject=Digital%20Sky%20%E2%80%94%20%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81">Написать команде ↗</a><div class="evidence-note">Адрес из презентации «Бюджетные олигархи», финальный слайд. Подтвердить до публикации.</div></div></div>`, 'white') +
    sec('faq', sectionTitle('ВОПРОСЫ', 'Частые вопросы') + faq(), 'tint') +
    sec('status', `${note('Обратите внимание.', 'На этом сайте нельзя зарегистрировать реальный цифровой кошелёк, подключить банковский счёт или отправить денежный перевод. Представлены только концепция и проектные материалы.')}`, 'white');
}

function firstName(full) {
  return String(full || 'пользователь').trim().split(/\s+/)[0];
}

function renderAuth() {
  const user = window.DigitalSkyAuth && window.DigitalSkyAuth.currentUser();
  if (user) {
    location.replace(link('cabinet/'));
    return `<div class="auth-shell"><p>Переход в кабинет…</p></div>`;
  }
  const eye = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/></svg>`;
  const orgTypes = (window.DigitalSkyAuth && window.DigitalSkyAuth.ORG_TYPES) || [];
  const orgOptions = orgTypes.map(t => `<option value="${t.id}">${t.label}</option>`).join('');
  return `<div class="auth-shell"><div class="auth-card auth-card-wide">
    <div class="auth-logo"><img src="${link('assets/brand/logo.png')}" alt="Digital Sky" width="56" height="56" decoding="async"></div>
    <div class="auth-brand">Digital Sky</div>
    <h1 class="auth-title" id="auth-title">Вход в систему</h1>
    <p class="auth-lead" id="auth-lead">Доступ для клиентов ВТБ и организаций РФ.</p>
    <div class="auth-tabs" role="tablist" aria-label="Режим доступа">
      <button class="auth-tab is-active" type="button" data-auth-tab="login" role="tab" aria-selected="true">Вход</button>
      <button class="auth-tab" type="button" data-auth-tab="register" role="tab" aria-selected="false">Регистрация</button>
    </div>
    <p class="auth-error" id="auth-error" role="alert"></p>
    <p class="auth-info" id="auth-info" role="status"></p>

    <form class="auth-panel is-active" id="form-login" data-auth-panel="login" autocomplete="on">
      <div class="auth-field"><label for="login-user">Логин или email</label><input id="login-user" name="login" type="text" placeholder="name@company.ru" required></div>
      <div class="auth-field"><label for="login-pass">Пароль</label><div class="auth-pass"><input id="login-pass" name="password" type="password" placeholder="Введите пароль" required><button class="auth-eye" type="button" data-toggle-pass="login-pass" aria-label="Показать пароль">${eye}</button></div></div>
      <div class="auth-row-between"><label class="auth-check"><input type="checkbox" name="remember"> Запомнить сессию</label></div>
      <button class="auth-submit" type="submit">Войти в кабинет</button>
      <div class="auth-divider"><span>или</span></div>
      <button class="auth-vtb" type="button" id="btn-vtb-login" data-vtb-mode="login">
        <img src="${link('assets/brand/vtb-mark.svg')}" alt="" width="28" height="28">
        <span>Войти через ВТБ</span>
      </button>
    </form>

    <form class="auth-panel" id="form-register" data-auth-panel="register" autocomplete="on">
      <div class="auth-person-type" role="group" aria-label="Тип заявителя">
        <button type="button" class="is-active" data-person-type="individual">Физическое лицо</button>
        <button type="button" data-person-type="organization">Организация</button>
      </div>
      <input type="hidden" name="personType" id="reg-person-type" value="individual">

      <div data-reg-block="individual">
        <div class="auth-field"><label for="reg-name">ФИО</label><input id="reg-name" name="name" type="text" placeholder="Иванов Алексей Сергеевич"></div>
        <div class="auth-grid-2">
          <div class="auth-field"><label for="reg-email">Email</label><input id="reg-email" name="email" type="email" placeholder="name@mail.ru"></div>
          <div class="auth-field"><label for="reg-phone">Телефон</label><input id="reg-phone" name="phone" type="tel" placeholder="+7 900 000-00-00"></div>
        </div>
        <div class="auth-field"><label for="reg-inn-ind">ИНН (необязательно)</label><input id="reg-inn-ind" name="innIndividual" type="text" inputmode="numeric" placeholder="12 цифр" maxlength="12"></div>
        <label class="auth-check auth-check-block"><input type="checkbox" name="vtbClient" id="reg-vtb-client" checked> Я являюсь клиентом ВТБ</label>
      </div>

      <div data-reg-block="organization" hidden>
        <div class="auth-field"><label for="reg-org-type">Организационно-правовая форма</label>
          <select id="reg-org-type" name="orgType"><option value="">Выберите форму</option>${orgOptions}</select>
        </div>
        <div class="auth-field"><label for="reg-org">Полное наименование</label><input id="reg-org" name="org" type="text" placeholder="ООО «Название»"></div>
        <div class="auth-grid-2">
          <div class="auth-field"><label for="reg-inn-org">ИНН</label><input id="reg-inn-org" name="inn" type="text" inputmode="numeric" placeholder="10 или 12 цифр" maxlength="12"></div>
          <div class="auth-field"><label for="reg-ogrn">ОГРН / ОГРНИП</label><input id="reg-ogrn" name="ogrn" type="text" inputmode="numeric" placeholder="13 или 15 цифр" maxlength="15"></div>
        </div>
        <div class="auth-field"><label for="reg-name-org">Контактное лицо</label><input id="reg-name-org" name="nameOrg" type="text" placeholder="ФИО представителя"></div>
        <div class="auth-grid-2">
          <div class="auth-field"><label for="reg-email-org">Рабочий email</label><input id="reg-email-org" name="emailOrg" type="email" placeholder="finance@company.ru"></div>
          <div class="auth-field"><label for="reg-phone-org">Телефон</label><input id="reg-phone-org" name="phoneOrg" type="tel" placeholder="+7 495 000-00-00"></div>
        </div>
        <label class="auth-check auth-check-block"><input type="checkbox" name="orgVtbClient" id="reg-org-vtb"> Организация обслуживается в ВТБ</label>
      </div>

      <div class="auth-field"><label for="reg-user">Логин</label><input id="reg-user" name="login" type="text" placeholder="ivanov_as" required></div>
      <div class="auth-grid-2">
        <div class="auth-field"><label for="reg-pass">Пароль</label><div class="auth-pass"><input id="reg-pass" name="password" type="password" placeholder="Минимум 8 символов" required minlength="8"><button class="auth-eye" type="button" data-toggle-pass="reg-pass" aria-label="Показать пароль">${eye}</button></div></div>
        <div class="auth-field"><label for="reg-pass2">Повтор пароля</label><div class="auth-pass"><input id="reg-pass2" name="password2" type="password" placeholder="Повторите пароль" required minlength="8"><button class="auth-eye" type="button" data-toggle-pass="reg-pass2" aria-label="Показать пароль">${eye}</button></div></div>
      </div>
      <label class="auth-check auth-check-block"><input type="checkbox" name="terms" required> Подтверждаю достоверность данных и согласие на обработку персональных данных.</label>
      <button class="auth-submit" type="submit">Создать учётную запись</button>
      <div class="auth-divider"><span>или</span></div>
      <button class="auth-vtb" type="button" id="btn-vtb-register" data-vtb-mode="register">
        <img src="${link('assets/brand/vtb-mark.svg')}" alt="" width="28" height="28">
        <span id="vtb-reg-label">Регистрация через ВТБ · клиент</span>
      </button>
      <p class="auth-vtb-note">Идентификация ВТБ пока не подключена. Можно зарегистрироваться формой выше.</p>
    </form>

    <a class="auth-back" href="${link('')}">← На главную сайта</a>
  </div>

  <div class="auth-modal" id="vtb-modal" hidden>
    <div class="auth-modal-card" role="dialog" aria-modal="true" aria-labelledby="vtb-modal-title">
      <div class="auth-modal-brand"><img src="${link('assets/brand/vtb-mark.svg')}" alt="ВТБ" width="40" height="40"><strong id="vtb-modal-brand">ВТБ</strong></div>
      <h2 id="vtb-modal-title">Функция пока недоступна</h2>
      <p id="vtb-modal-text">Интеграция с идентификацией ВТБ ещё не подключена.</p>
      <button class="auth-submit" type="button" id="vtb-modal-close">Понятно</button>
    </div>
  </div>
  </div>`;
}

function renderCabinet() {
  const Auth = window.DigitalSkyAuth;
  const Cab = window.DigitalSkyCabinet;
  const user = Auth && Auth.currentUser();
  if (!user) {
    location.replace(link('auth/'));
    return `<div class="auth-shell"><p>Нужен вход…</p></div>`;
  }
  if (Cab && Cab.render) return Cab.render(user);
  return `<div class="auth-shell"><p>Модуль кабинета не загружен.</p></div>`;
}

const routes = {
  home: renderHome,
  platform: renderPlatform,
  about: renderAbout,
  audiences: renderAudiences,
  security: renderSecurity,
  research: renderResearch,
  roadmap: renderRoadmap,
  contacts: renderContacts,
  auth: renderAuth,
  cabinet: renderCabinet,
  // Legacy routes kept for old bookmarks
  'how-it-works': renderAbout,
  technology: renderAbout
};

function mount() {
  const body = (routes[PAGE] || renderHome)();
  if (PAGE === 'auth' || PAGE === 'cabinet') {
    app.innerHTML = `<main id="main-content">${body}</main>`;
    document.body.classList.add('is-app-shell');
  } else {
    app.innerHTML = header() + `<main id="main-content">${body}</main>` + footer();
    document.body.classList.remove('is-app-shell');
  }
  bindInteractions();
}

function showAuthError(msg) {
  const box = document.getElementById('auth-error');
  if (!box) return;
  box.textContent = msg || '';
  box.classList.toggle('is-visible', Boolean(msg));
}

function bindAuthUi() {
  const Auth = window.DigitalSkyAuth;
  if (!Auth) return;

  if (PAGE === 'cabinet' && window.DigitalSkyCabinet && window.DigitalSkyCabinet.bind) {
    window.DigitalSkyCabinet.bind();
  }

  document.querySelectorAll('[data-toggle-pass]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.getAttribute('data-toggle-pass'));
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  const tabs = [...document.querySelectorAll('[data-auth-tab]')];
  const panels = [...document.querySelectorAll('[data-auth-panel]')];
  const title = document.getElementById('auth-title');
  const personTypeInput = document.getElementById('reg-person-type');
  const personTypeBtns = [...document.querySelectorAll('[data-person-type]')];
  const vtbRegLabel = document.getElementById('vtb-reg-label');

  const setPersonType = (type) => {
    const mode = type === 'organization' ? 'organization' : 'individual';
    if (personTypeInput) personTypeInput.value = mode;
    personTypeBtns.forEach(b => b.classList.toggle('is-active', b.dataset.personType === mode));
    document.querySelectorAll('[data-reg-block]').forEach(block => {
      block.hidden = block.getAttribute('data-reg-block') !== mode;
    });
    if (vtbRegLabel) {
      vtbRegLabel.textContent = mode === 'organization'
        ? 'Регистрация через ВТБ · организация'
        : 'Регистрация через ВТБ · клиент';
    }
  };

  personTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => setPersonType(btn.dataset.personType));
  });
  setPersonType(personTypeInput ? personTypeInput.value : 'individual');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.authTab;
      tabs.forEach(t => {
        const on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
      });
      panels.forEach(p => p.classList.toggle('is-active', p.dataset.authPanel === mode));
      if (title) {
        title.textContent = mode === 'register' ? 'Регистрация' : 'Вход в систему';
      }
      const lead = document.getElementById('auth-lead');
      if (lead) {
        lead.textContent = mode === 'register'
          ? 'Выберите физическое лицо (клиент ВТБ) или организацию РФ.'
          : 'Доступ для клиентов ВТБ и организаций РФ.';
      }
      showAuthError('');
      const info = document.getElementById('auth-info');
      if (info) { info.textContent = ''; info.classList.remove('is-visible'); }
    });
  });

  const showInfo = (msg) => {
    const box = document.getElementById('auth-info');
    if (!box) return;
    box.textContent = msg || '';
    box.classList.toggle('is-visible', Boolean(msg));
  };

  const openVtbModal = (mode) => {
    const vtbModal = document.getElementById('vtb-modal');
    const modalTitle = document.getElementById('vtb-modal-title');
    const modalText = document.getElementById('vtb-modal-text');
    const modalBrand = document.getElementById('vtb-modal-brand');
    if (!vtbModal) return;
    const isReg = mode === 'register';
    if (modalBrand) modalBrand.textContent = isReg ? 'Регистрация через ВТБ' : 'Вход через ВТБ';
    if (modalTitle) modalTitle.textContent = 'Идентификация ВТБ пока недоступна';
    if (modalText) {
      modalText.textContent = isReg
        ? 'Подключение банковской идентификации ВТБ ещё не выполнено. Зарегистрируйтесь формой на этой странице: физлицо — клиент ВТБ, организация — по ОПФ РФ.'
        : 'Подключение входа через ВТБ ещё не выполнено. Войдите логином и паролем после регистрации.';
    }
    vtbModal.hidden = false;
    showAuthError('');
    showInfo(isReg ? 'Регистрация через ВТБ пока недоступна.' : 'Вход через ВТБ пока недоступен.');
  };

  const loginForm = document.getElementById('form-login');
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      showAuthError('');
      showInfo('');
      const fd = new FormData(loginForm);
      const btn = loginForm.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Вход…'; }
      try {
        const res = await Auth.login(fd.get('login'), fd.get('password'));
        if (!res.ok) { showAuthError(res.error); return; }
        location.href = link('cabinet/');
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Войти в кабинет'; }
      }
    });
  }

  const regForm = document.getElementById('form-register');
  if (regForm) {
    regForm.addEventListener('submit', async e => {
      e.preventDefault();
      showAuthError('');
      showInfo('');
      const fd = new FormData(regForm);
      const personType = String(fd.get('personType') || 'individual');
      const isOrg = personType === 'organization';
      const btn = regForm.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Создание…'; }
      try {
        const res = await Auth.register({
          personType,
          name: isOrg ? fd.get('nameOrg') : fd.get('name'),
          org: fd.get('org'),
          orgType: fd.get('orgType'),
          email: isOrg ? fd.get('emailOrg') : fd.get('email'),
          phone: isOrg ? fd.get('phoneOrg') : fd.get('phone'),
          inn: isOrg ? fd.get('inn') : fd.get('innIndividual'),
          ogrn: fd.get('ogrn'),
          vtbClient: isOrg ? false : Boolean(fd.get('vtbClient')),
          orgVtbClient: Boolean(fd.get('orgVtbClient')),
          login: fd.get('login'),
          password: fd.get('password'),
          password2: fd.get('password2')
        });
        if (!res.ok) { showAuthError(res.error); return; }
        location.href = link('cabinet/');
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Создать учётную запись'; }
      }
    });
  }

  document.querySelectorAll('[data-vtb-mode]').forEach(btn => {
    btn.addEventListener('click', () => openVtbModal(btn.getAttribute('data-vtb-mode')));
  });

  const vtbModal = document.getElementById('vtb-modal');
  const vtbClose = document.getElementById('vtb-modal-close');
  if (vtbClose && vtbModal) {
    vtbClose.addEventListener('click', () => { vtbModal.hidden = true; });
    vtbModal.addEventListener('click', e => {
      if (e.target === vtbModal) vtbModal.hidden = true;
    });
  }
}

function bindInteractions() {
  // Prerender/smoke stubs provide a minimal document
  if (typeof document.querySelectorAll !== 'function' || typeof document.querySelector !== 'function') return;

  bindAuthUi();

  const menu = document.getElementById('mobile-menu');
  const nav = document.getElementById('main-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const o = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(o));
      menu.textContent = o ? '✕' : '☰';
    });
    if (typeof nav.querySelectorAll === 'function') {
      nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        menu.textContent = '☰';
      }));
    }
  }

  document.querySelectorAll('.interactive-stepper').forEach(group => {
    let current = 0;
    const tabs = [...group.querySelectorAll('[data-step]')];
    const panel = group.querySelector('#step-detail') || group.querySelector('.step-detail');
    const back = group.querySelector('#step-back');
    const next = group.querySelector('#step-next');
    const draw = () => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === current));
        tab.tabIndex = i === current ? 0 : -1;
      });
      if (panel) {
        panel.innerHTML = stepDetail(current);
        panel.setAttribute('aria-labelledby', `step-tab-${current}`);
      }
      if (back) back.disabled = current === 0;
      if (next) next.disabled = current === D.steps.length - 1;
    };
    tabs.forEach(tab => tab.addEventListener('click', () => {
      current = Number(tab.dataset.step);
      draw();
    }));
    tabs.forEach(tab => tab.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        current = e.key === 'ArrowRight'
          ? Math.min(D.steps.length - 1, current + 1)
          : Math.max(0, current - 1);
        draw();
        tabs[current].focus();
      }
    }));
    if (back) back.addEventListener('click', () => { current = Math.max(0, current - 1); draw(); });
    if (next) next.addEventListener('click', () => { current = Math.min(D.steps.length - 1, current + 1); draw(); });
    draw();
  });

  const sel = document.getElementById('forecast-field');
  if (sel) {
    sel.addEventListener('change', () => {
      const graphic = document.getElementById('forecast-graphic');
      if (graphic) graphic.innerHTML = forecastChart(sel.value);
    });
  }

  const csvBtn = document.getElementById('export-finance');
  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      const rows = [
        ['Год', 'Банки', 'Транзакции, млн', 'Интеграция, млн ₽', 'Комиссии, млн ₽', 'Валовой доход, млн ₽', 'OPEX, млн ₽', 'Операционный поток, млн ₽'],
        ...D.funding.forecast.map(y => [y.year, y.banks, y.tx, y.integration, y.fees, y.total, y.opex, y.profit])
      ];
      const bom = '\ufeff';
      const txt = bom + rows.map(row => row.join(';')).join('\r\n');
      const blob = new Blob([txt], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'digital-sky-forecast-from-diploma.csv';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    });
  }

  document.querySelectorAll('.proof-open').forEach(b => b.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Просмотр изображения проекта');
    overlay.innerHTML = `<div class="lightbox-inner"><button class="close-lightbox" type="button" aria-label="Закрыть">×</button><img src="${link('assets/prototype/' + b.dataset.image)}" alt="${b.dataset.caption}"><p>${b.dataset.caption} · Из дипломной работы Digital Sky</p></div>`;
    document.body.append(overlay);
    document.body.style.overflow = 'hidden';
    const close = () => {
      overlay.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', key);
      b.focus();
    };
    const key = e => { if (e.key === 'Escape') close(); };
    overlay.querySelector('.close-lightbox').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', key);
    overlay.querySelector('.close-lightbox').focus();
  }));

  // Research subnav active section
  const subnav = document.querySelector('.research-subnav');
  if (subnav) {
    const links = [...subnav.querySelectorAll('a[href^="#"]')];
    const sections = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    const setActive = () => {
      let current = sections[0];
      const y = window.scrollY + 160;
      sections.forEach(s => { if (s.offsetTop <= y) current = s; });
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + (current && current.id)));
    };
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  // Earth CBDC corridor (homepage)
  const globeRoot = document.getElementById('earth-globe');
  if (globeRoot && window.DigitalSkyGlobe) {
    window.DigitalSkyGlobe.initEarthGlobe(globeRoot);
  }

  // Reveal on scroll
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    document.querySelectorAll('.section .card, .visual-panel, .metric-tile, .doc-card, .model, .info-step').forEach(el => {
      el.classList.add('reveal');
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
}

if (D && app) mount();
})();
