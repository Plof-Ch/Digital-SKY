/* Digital Sky — multi-role VTB-style cabinet UI. */
(() => {
'use strict';

let CTX = null;
const Auth = () => window.DigitalSkyAuth;
const D = () => CTX || (window.DigitalSkyCabinetData && window.DigitalSkyCabinetData.forUser(null)) || {
  wallets: [], rates: [], counterparties: [], operations: [], approvals: [], documents: [], folders: [],
  bankQueue: [], complianceCases: [], adminOrgs: [], audit: [],
  org: { name: '', short: '', inn: '', bank: '' },
  nodeMetrics: { uptime: '—', latency: '—', banks: 0, ops: '0', success: '—', critical: 0, volume: '0,00 ₽', throughput: '0', load: 0 },
  money: (n) => Number(n || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
};

const S = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
const ICONS = {
  home: `<svg ${S}><path d="M4 10.2 12 3.5l8 6.7"/><path d="M6.5 9.5V20h4.2v-5.2h2.6V20h4.2V9.5"/></svg>`,
  pay: `<svg ${S}><rect x="3.5" y="6" width="17" height="12.5" rx="2.2"/><path d="M3.5 10h17"/><path d="M7.5 14h4"/></svg>`,
  users: `<svg ${S}><circle cx="9" cy="8" r="3"/><path d="M3.8 19c.7-2.8 2.7-4.2 5.2-4.2s4.5 1.4 5.2 4.2"/><circle cx="17" cy="9" r="2.3"/><path d="M14.2 19c.4-1.7 1.5-2.9 3.3-3.3"/></svg>`,
  wallet: `<svg ${S}><path d="M4 8.2h14.5A2.5 2.5 0 0 1 21 10.7v6.3A2.5 2.5 0 0 1 18.5 19.5H5.5A2.5 2.5 0 0 1 3 17V7.8A2.3 2.3 0 0 1 5.3 5.5H16"/><circle cx="16.5" cy="14" r="1.1"/></svg>`,
  fx: `<svg ${S}><path d="M7 8h9.5"/><path d="M7 12h6.5"/><path d="M7 16h9.5"/><path d="m16.2 5.5 2.8 2.5-2.8 2.5"/><path d="m7.8 13.5-2.8 2.5 2.8 2.5"/></svg>`,
  docs: `<svg ${S}><path d="M7 3.5h7.2L19 8.3V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"/><path d="M14 3.5V8h5"/><path d="M9 13h6.5M9 16.5h4.5"/></svg>`,
  check: `<svg ${S}><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8.2 12.1 2.4 2.4 5.2-5.3"/></svg>`,
  chart: `<svg ${S}><path d="M4 19.5h16"/><path d="M7 16.5V10"/><path d="M12 16.5V6.5"/><path d="M17 16.5v-4"/></svg>`,
  hist: `<svg ${S}><circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3.2 2"/></svg>`,
  set: `<svg ${S}><circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M16.3 6.1l1.6-1.6M6.1 17.9l1.6-1.6"/></svg>`,
  shield: `<svg ${S}><path d="M12 3.2 4.8 6.2v5.1c0 4.8 3 8.1 7.2 9.7 4.2-1.6 7.2-4.9 7.2-9.7V6.2L12 3.2Z"/><path d="m9.2 12 1.9 1.9 3.8-3.9"/></svg>`,
  node: `<svg ${S}><circle cx="12" cy="12" r="2.6"/><circle cx="5.2" cy="7" r="1.8"/><circle cx="18.8" cy="7" r="1.8"/><circle cx="5.2" cy="17" r="1.8"/><circle cx="18.8" cy="17" r="1.8"/><path d="m6.8 8.2 3.4 2.4M13.8 10.6l3.4-2.4M6.8 15.8l3.4-2.4M13.8 13.4l3.4 2.4"/></svg>`,
  queue: `<svg ${S}><path d="M4.5 7h15"/><path d="M4.5 12h11"/><path d="M4.5 17h13"/></svg>`,
  plane: `<svg ${S}><path d="m4 11.2 15.5-6.4-6.8 16.2-2.2-6.8L4 11.2Z"/></svg>`,
  bell: `<svg ${S}><path d="M7 16.5h10"/><path d="M6.2 16.5a6.5 6.5 0 0 1-1-3.3V11a6.8 6.8 0 0 1 13.6 0v2.2c0 1.2.3 2.3 1 3.3"/><path d="M10.2 18.8a1.8 1.8 0 0 0 3.6 0"/></svg>`,
  help: `<svg ${S}><circle cx="12" cy="12" r="8"/><path d="M9.6 9.4a2.4 2.4 0 1 1 3.5 2.1c-.8.5-1.3 1-1.3 2"/><path d="M12 16.7h.01"/></svg>`,
  more: `<svg ${S}><circle cx="6" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18" cy="12" r="1.3"/></svg>`,
  menu: `<svg ${S}><path d="M4.5 7h15M4.5 12h15M4.5 17h15"/></svg>`,
  close: `<svg ${S}><path d="m7 7 10 10M17 7 7 17"/></svg>`
};

const MOBILE_TABS = {
  client: [['home', 'Главная', 'home'], ['payments', 'Платежи', 'pay'], ['wallets', 'Кошельки', 'wallet'], ['documents', 'Документы', 'docs'], ['more', 'Ещё', 'more']],
  bank: [['home', 'Главная', 'home'], ['queue', 'Очередь', 'queue'], ['compliance', 'Комплаенс', 'shield'], ['liquidity', 'Счета', 'wallet'], ['more', 'Ещё', 'more']],
  cbr: [['home', 'Главная', 'home'], ['node', 'Узел', 'node'], ['confirmations', 'Очередь', 'check'], ['corridors', 'Маршруты', 'fx'], ['more', 'Ещё', 'more']],
  admin: [['home', 'Главная', 'home'], ['orgs', 'Орг.', 'users'], ['users', 'Юзеры', 'users'], ['audit', 'Аудит', 'hist'], ['more', 'Ещё', 'more']]
};

const MENUS = {
  client: [
    ['home', 'Главная', 'home'],
    ['payments', 'Платежи', 'pay'],
    ['counterparties', 'Контрагенты', 'users'],
    ['wallets', 'Кошельки', 'wallet'],
    ['fx', 'Курсы и конвертация', 'fx'],
    ['documents', 'Документы', 'docs'],
    ['approvals', 'Согласования', 'check'],
    ['history', 'История операций', 'hist'],
    ['reports', 'Отчёты', 'chart'],
    ['settings', 'Настройки', 'set']
  ],
  bank: [
    ['home', 'Главная', 'home'],
    ['queue', 'Очередь операций', 'queue'],
    ['compliance', 'KYC/AML и комплаенс', 'shield'],
    ['clients', 'Клиенты', 'users'],
    ['partners', 'Банки-контрагенты', 'node'],
    ['liquidity', 'Кошельки и счета', 'wallet'],
    ['fx', 'Курсы и конвертация', 'fx'],
    ['reports', 'Отчёты', 'chart'],
    ['settings', 'Настройки', 'set']
  ],
  cbr: [
    ['home', 'Главная', 'home'],
    ['node', 'Национальный узел', 'node'],
    ['confirmations', 'Очереди подтверждений', 'check'],
    ['corridors', 'Корреспондентские маршруты', 'fx'],
    ['ops', 'Мониторинг', 'chart'],
    ['reports', 'Отчёты', 'chart'],
    ['settings', 'Настройки', 'set']
  ],
  admin: [
    ['home', 'Главная', 'home'],
    ['orgs', 'Организации', 'users'],
    ['users', 'Пользователи', 'users'],
    ['corridors', 'Коридоры и валюты', 'fx'],
    ['policies', 'Правила проверок', 'shield'],
    ['monitoring', 'Состояние системы', 'node'],
    ['audit', 'Журнал аудита', 'hist'],
    ['settings', 'Настройки', 'set']
  ]
};

const ROLE_META = {
  client: { cabinet: 'Личный кабинет', org: 'Профиль', roleLabel: 'Пользователь', initials: 'П' },
  bank: { cabinet: 'Кабинет коммерческого банка', org: 'Банк', roleLabel: 'Оператор банка', initials: 'Б' },
  cbr: { cabinet: 'Кабинет центрального банка', org: 'Центральный банк', roleLabel: 'Администратор', initials: 'Ц' },
  admin: { cabinet: 'Администрирование платформы', org: 'Digital Sky', roleLabel: 'Администратор', initials: 'А' }
};

function roleOf(user) {
  return (user && user.role) || 'client';
}

function money(n) {
  return D().money(n);
}

function emptyBlock(title, text) {
  return `<div class="ds-card"><div class="ds-empty"><strong style="display:block;margin-bottom:6px;color:#0B1F44">${title}</strong>${text}</div></div>`;
}

function initialsOf(user) {
  const parts = String(user && user.name || 'П').trim().split(/\s+/);
  const a = (parts[0] || 'П').slice(0, 1);
  const b = (parts[1] || parts[0] || '').slice(0, 1);
  return (a + b).toUpperCase();
}

function statusPill(s) {
  const map = {
    done: ['ok', 'Исполнен'],
    processing: ['info', 'В обработке'],
    rejected: ['bad', 'Отклонён'],
    wait: ['warn', 'Ожидает'],
    review: ['info', 'На рассмотрении'],
    compliance: ['bad', 'Комплаенс'],
    active: ['ok', 'Активен'],
    attention: ['warn', 'Внимание'],
    approval: ['warn', 'На согласовании'],
    update: ['warn', 'Требует обновления'],
    ok: ['ok', 'OK'],
    hold: ['warn', 'Резерв'],
    low: ['ok', 'Низкий'],
    medium: ['warn', 'Средний'],
    high: ['bad', 'Высокий'],
    connected: ['ok', 'Подключён'],
    process: ['info', 'В процессе']
  };
  const [cls, label] = map[s] || ['muted', s];
  return `<span class="ds-pill ${cls}">${label}</span>`;
}

function toast(msg) {
  let el = document.getElementById('ds-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'ds-toast';
    el.className = 'ds-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 2600);
}

function logoUrl() {
  return (window.DS_BASE || './') + 'assets/brand/logo.png';
}

function shell(user, role, page, body) {
  const meta = ROLE_META[role] || ROLE_META.client;
  const menu = MENUS[role] || MENUS.client;
  const tabs = MOBILE_TABS[role] || MOBILE_TABS.client;
  const name = user.name || 'Пользователь';
  const orgLabel = (D().org && D().org.name) || user.org || meta.org;
  const roleLabel = user.personType === 'organization'
    ? 'Представитель организации'
    : (user.vtbClient ? 'Клиент ВТБ' : meta.roleLabel);
  const cabinetLabel = user.personType === 'organization' ? 'Кабинет организации' : 'Личный кабинет';
  const activePage = page === 'payments-new' ? 'payments' : page;
  const tabActive = (id) => {
    if (id === 'more') return !tabs.slice(0, 4).some(t => t[0] === activePage);
    return activePage === id;
  };
  return `<div class="ds-app" data-role="${role}">
    <aside class="ds-side" id="ds-side">
      <div class="ds-brand">
        <div class="ds-brand-mark" aria-hidden="true"><img src="${logoUrl()}" alt="" width="36" height="36" decoding="async"></div>
        <div>
          <strong>Digital Sky</strong>
          <span>Платформа трансграничных платежей на базе ЦВЦБ</span>
        </div>
        <button class="ds-side-close" type="button" id="ds-side-close" aria-label="Закрыть меню">${ICONS.close}</button>
      </div>
      <nav class="ds-nav" aria-label="Разделы кабинета">
        ${menu.map(([id, label, icon]) =>
          `<button type="button" data-ds-nav="${id}" class="${activePage === id ? 'is-active' : ''}">
            <span class="ico" aria-hidden="true">${ICONS[icon] || ICONS.home}</span>
            <span>${label}</span>
          </button>`
        ).join('')}
      </nav>
      <div class="ds-side-foot">
        <button class="ds-logout" type="button" id="cab-logout">Выход</button>
      </div>
    </aside>
    <div class="ds-side-backdrop" id="ds-side-backdrop" hidden></div>
    <div class="ds-main">
      <header class="ds-top">
        <div class="ds-top-left">
          <button class="ds-iconbtn ds-mobile-only" type="button" id="ds-menu-open" aria-label="Меню">${ICONS.menu}</button>
          <div class="ds-crumb hide-phone">${cabinetLabel} / <button class="ds-org-select" type="button">${orgLabel}</button></div>
          <div class="ds-mobile-title ds-mobile-only"><img src="${logoUrl()}" alt="" width="22" height="22"><strong>Digital Sky</strong></div>
          <div class="ds-status hide-phone"><i></i> Система работает</div>
        </div>
        <div class="ds-top-right">
          <button class="ds-iconbtn" type="button" aria-label="Уведомления" data-ds-nav="${role === 'client' ? 'approvals' : 'home'}">${ICONS.bell}</button>
          <button class="ds-iconbtn hide-phone" type="button" aria-label="Справка">${ICONS.help}</button>
          <div class="ds-userpill">
            <div class="ds-avatar">${initialsOf(user)}</div>
            <div class="meta hide-phone"><b>${name}</b><span>${roleLabel}</span></div>
          </div>
        </div>
      </header>
      <div class="ds-scroll">${body}</div>
      <nav class="ds-bottom" aria-label="Мобильная навигация">
        ${tabs.map(([id, label, icon]) =>
          `<button type="button" class="${tabActive(id) ? 'is-active' : ''}" data-ds-${id === 'more' ? 'more' : 'nav'}="${id === 'more' ? '1' : id}">
            <span class="ico" aria-hidden="true">${ICONS[icon]}</span>
            <span>${label}</span>
          </button>`
        ).join('')}
      </nav>
    </div>
  </div>`;
}

/* ——— Client pages ——— */
function pageClientHome() {
  const { wallets, operations, approvals, org } = D();
  const rub = (wallets && wallets[0]) || { bal: 0, symbol: '₽' };
  const opsRows = (operations || []).slice(0, 5);
  return `<div class="ds-grid ds-grid-dashboard">
    <div class="ds-hero ds-area-hero">
      <div style="font-size:13px;opacity:.85">Общий баланс в цифровых рублях</div>
      <div class="amount">${money(rub.bal)} ₽</div>
      <div class="sub">${org && org.name ? org.name : 'Профиль'} · данные вашего аккаунта</div>
    </div>
    <div class="ds-area-actions ds-actions">
      <button class="ds-action primary" type="button" data-ds-nav="payments-new"><span class="act-ico">${ICONS.plane}</span><strong>Новый перевод</strong></button>
      <button class="ds-action" type="button" data-ds-nav="counterparties"><span class="act-ico">${ICONS.users}</span><strong>Контрагенты</strong></button>
      <button class="ds-action" type="button" data-ds-nav="history"><span class="act-ico">${ICONS.hist}</span><strong>История</strong></button>
      <button class="ds-action" type="button" data-ds-nav="documents"><span class="act-ico">${ICONS.docs}</span><strong>Документы</strong></button>
    </div>
    <div class="ds-card ds-area-wallets">
      <div class="ds-card-hd"><h3>Балансы по кошелькам</h3><button class="ds-btn ghost sm" type="button" data-ds-nav="wallets">Все</button></div>
      ${(wallets || []).length ? wallets.slice(0, 3).map(w => `<div class="ds-wallet-row">
        <div class="ds-wallet-left"><i class="ds-dot" style="background:${w.color}"></i><div><b>${w.title}</b><span>${w.sub}</span></div></div>
        <strong>${money(w.bal)} ${w.symbol}</strong>
      </div>`).join('') : '<div class="ds-empty">Кошельки пока не подключены.</div>'}
    </div>
    <div class="ds-card ds-area-status">
      <h3>Статусы платежей</h3>
      <div class="ds-empty">Операций пока нет.</div>
    </div>
    <div class="ds-card ds-area-rates">
      <div class="ds-card-hd"><h3>Курсы ЦВЦБ</h3><button class="ds-btn ghost sm" type="button" data-ds-nav="fx">Открыть</button></div>
      <div class="ds-empty">Котировки появятся после подключения источника курса.</div>
    </div>
    <div class="ds-card ds-area-ops">
      <div class="ds-card-hd"><h3>Последние операции</h3><button class="ds-btn ghost sm" type="button" data-ds-nav="history">История</button></div>
      ${opsRows.length ? `<div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Дата</th><th>Контрагент</th><th>Направление</th><th>Сумма</th><th>Статус</th></tr></thead>
      <tbody>${opsRows.map(o => `<tr data-row data-ds-nav="history"><td>${o.dt}</td><td>${o.cp}</td><td>${o.dir === 'out' ? 'Исходящий' : 'Входящий'}</td><td>${money(o.amount)} ${o.cur}</td><td>${statusPill(o.status)}</td></tr>`).join('')}</tbody></table></div>`
      : '<div class="ds-empty">История пуста. Создайте первый перевод.</div>'}
    </div>
    <div class="ds-area-side">
      <div class="ds-approve-card">
        <p>${(approvals || []).length ? `${approvals.length} платеж(ей) ожидают согласования` : 'Нет платежей на согласовании'}</p>
        <button type="button" data-ds-nav="approvals">К согласованию →</button>
      </div>
      <div class="ds-card">
        <h3>Динамика операций</h3>
        <div class="ds-empty">Недостаточно данных для графика.</div>
      </div>
    </div>
  </div>`;
}

function pagePayments() {
  const ops = D().operations || [];
  return `<div class="ds-page-hd"><div><h1>Платежи</h1><p>Трансграничные переводы вашего профиля.</p></div>
    <button class="ds-btn primary" type="button" data-ds-nav="payments-new">${ICONS.plane} Новый перевод</button></div>
    <div class="ds-tabs">
      <button type="button" class="is-active">Все</button>
      <button type="button">В обработке</button>
      <button type="button">Исполнены</button>
      <button type="button">Черновики</button>
    </div>
    ${ops.length ? `<div class="ds-card"><div class="ds-table-wrap"><table class="ds-table">
      <thead><tr><th>ID</th><th>Дата</th><th>Контрагент</th><th>Маршрут</th><th>Сумма</th><th>Комиссия</th><th>Статус</th><th></th></tr></thead>
      <tbody>${ops.map(o => `<tr>
        <td><b>${o.id}</b></td><td>${o.dt}</td><td>${o.cp}</td><td>${o.from} → ${o.to}</td>
        <td>${money(o.amount)} ${o.cur}</td><td>${money(o.commission)} ₽</td><td>${statusPill(o.status)}</td>
        <td><button class="ds-btn ghost sm" type="button" data-ds-open-op="${o.id}">Открыть</button></td>
      </tr>`).join('')}</tbody>
    </table></div></div>` : emptyBlock('Платежей пока нет', 'Создайте первый трансграничный перевод.')}`;
}

function pagePaymentsNew() {
  const w = (D().wallets && D().wallets[0]) || { bal: 0 };
  return `<div class="ds-page-hd"><div><h1>Трансграничный перевод</h1><p>Создание платежа. Поля заполняются вами, шаблонных реквизитов нет.</p></div>
    <button class="ds-btn ghost" type="button" data-ds-nav="payments">К списку</button></div>
  <div class="ds-stepper">
    <div class="ds-step is-active"><b>1. Создание</b>Параметры перевода</div>
    <div class="ds-step"><b>2. Проверка</b>KYC / AML</div>
    <div class="ds-step"><b>3. Подтверждение</b>Согласование</div>
    <div class="ds-step"><b>4. Расчёт</b>PvP</div>
  </div>
  <div class="ds-layout-form">
    <div class="ds-card">
      <h3>Параметры перевода</h3>
      <div class="ds-field"><label>Кошелёк списания</label>
        <select id="pay-wallet"><option>Цифровой рубль (CBDC РФ) — ${money(w.bal)} ₽</option></select>
      </div>
      <div class="ds-seg"><button type="button" class="is-active">Поиск контрагента</button><button type="button">Новый получатель</button></div>
      <div class="ds-field"><label>Получатель</label><input id="pay-cp" placeholder="Наименование получателя"></div>
      <div class="ds-row-2">
        <div class="ds-field"><label>Страна</label><select><option value="">Выберите страну</option><option>Китай (CN)</option><option>ОАЭ (AE)</option><option>Индия (IN)</option></select></div>
        <div class="ds-field"><label>Банк получателя</label><input placeholder="Банк получателя"></div>
      </div>
      <div class="ds-row-2">
        <div class="ds-field"><label>Валюта зачисления</label><select><option>Цифровой юань (e-CNY)</option><option>Цифровой дирхам (e-AED)</option></select></div>
        <div class="ds-field"><label>Сумма списания, ₽</label><input id="pay-amount" type="text" placeholder="0,00"></div>
      </div>
      <div class="ds-field"><label>Назначение платежа</label><textarea id="pay-purpose" placeholder="Назначение платежа"></textarea></div>
      <div class="ds-field"><label>Договор / инвойс</label><input placeholder="Номер и дата договора"></div>
    </div>
    <div class="ds-card ds-summary">
      <h3>Сводка перевода</h3>
      <div class="line"><span>Курс</span><b>Будет рассчитан</b></div>
      <div class="line"><span>Комиссия</span><b>—</b></div>
      <div class="line"><span>Маршрут</span><b>Не выбран</b></div>
      <div class="line"><span>KYC/AML</span><b>Ожидает проверки</b></div>
      <button class="ds-btn primary" type="button" id="pay-submit" style="width:100%;justify-content:center;margin-top:16px">${ICONS.plane} Отправить на проверку</button>
    </div>
  </div>`;
}

function pageCounterparties() {
  const list = D().counterparties || [];
  return `<div class="ds-page-hd"><div><h1>Контрагенты</h1><p>Справочник получателей вашего профиля.</p></div>
    <button class="ds-btn primary" type="button" id="cp-add">+ Добавить контрагента</button></div>
  <div class="ds-grid ds-grid-4" style="margin-bottom:14px">
    <div class="ds-kpi"><div class="label">Всего</div><div class="val">${list.length}</div></div>
    <div class="ds-kpi"><div class="label">Иностранные</div><div class="val">0</div></div>
    <div class="ds-kpi"><div class="label">Резиденты РФ</div><div class="val">0</div></div>
    <div class="ds-kpi"><div class="label">Верифицированы</div><div class="val">0</div></div>
  </div>
  ${list.length ? `<div class="ds-card"><div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Контрагент</th><th>Статус</th><th>Страна</th><th>Банк</th><th>Валюты</th><th>Риск</th></tr></thead>
  <tbody>${list.map(c => `<tr data-row><td><b>${c.name}</b></td><td>${statusPill(c.status || 'active')}</td><td>${c.country || '—'}</td><td>${c.bank || '—'}</td><td>${(c.currencies || []).join(', ')}</td><td>${statusPill(c.risk || 'low')}</td></tr>`).join('')}</tbody></table></div></div>`
    : emptyBlock('Контрагентов пока нет', 'Добавьте первого получателя для переводов.')}`;
}

function pageWallets() {
  const wallets = D().wallets || [];
  return `<div class="ds-hero" style="margin-bottom:14px"><h1>Кошельки и курсы</h1><p>Ваши цифровые кошельки и конвертация.</p></div>
  <div class="ds-wallet-cards" style="margin-bottom:14px">
    ${wallets.map(w => `<div class="ds-wcard" style="--c:${w.color}">
      <div class="t">${w.title} · ${w.sub}</div>
      <div class="a">${money(w.bal)} ${w.symbol}</div>
      <div class="m"><span>Резерв: ${money(w.reserved)} ${w.symbol}</span><span>Дневной лимит: ${money(w.limit)} ${w.symbol}</span></div>
      <div class="btns">
        <button class="ds-btn primary sm" type="button" data-ds-nav="payments-new">Перевод</button>
        <button class="ds-btn ghost sm" type="button" data-ds-nav="fx">Конвертация</button>
      </div>
    </div>`).join('') || '<div class="ds-card"><div class="ds-empty">Кошельки не подключены.</div></div>'}
  </div>
  <div class="ds-layout-form">
    <div class="ds-card">
      <div class="ds-card-hd"><h3>Курсы ЦВЦБ</h3></div>
      ${emptyBlock('Нет котировок', 'Источник курса ещё не подключён.')}
    </div>
    <div class="ds-card">
      <h3>Конвертация</h3>
      <div class="ds-field"><label>Списать с кошелька</label><select><option>Цифровой рубль (CBDC РФ)</option></select></div>
      <div class="ds-field"><label>Конвертировать в</label><select><option>Цифровой юань (e-CNY)</option></select></div>
      <div class="ds-field"><label>Сумма</label><input placeholder="0,00"></div>
      <div class="ds-summary">
        <div class="line"><span>Курс</span><b>—</b></div>
        <div class="line"><span>Комиссия</span><b>—</b></div>
        <div class="line"><span>К зачислению</span><b>—</b></div>
      </div>
      <button class="ds-btn primary" type="button" id="fx-convert" style="width:100%;justify-content:center;margin-top:12px">Конвертировать</button>
    </div>
  </div>`;
}

function pageFx() { return pageWallets(); }

function pageDocuments() {
  const folders = D().folders || [];
  const documents = D().documents || [];
  const approvals = D().approvals || [];
  return `<div class="ds-hero" style="margin-bottom:14px"><h1>Документы и согласования</h1><p>Файлы и подписи вашего профиля.</p></div>
  <div class="ds-folder-row">${folders.map(f => `<button class="ds-folder" type="button"><strong>${f.title}</strong><span>${f.count} файлов</span></button>`).join('')}</div>
  <div class="ds-filters" style="margin-bottom:14px">
    <button class="ds-btn primary sm" type="button">Загрузить документ</button>
    <input placeholder="Поиск по документам" style="flex:1;min-width:180px">
  </div>
  ${documents.length || approvals.length
    ? `<div class="ds-card">${documents.length ? 'Документы загружены' : ''}${approvals.length ? 'Есть согласования' : ''}</div>`
    : emptyBlock('Документов пока нет', 'Загрузите договор или инвойс, когда будете готовы.')}`;
}

function pageApprovals() { return pageDocuments(); }

function pageHistory() {
  const ops = D().operations || [];
  return `<div class="ds-hero" style="margin-bottom:14px"><h1>История операций</h1><p>Реестр платежей вашего профиля.</p></div>
  <div class="ds-filters">
    <input type="text" placeholder="Период" style="min-width:200px">
    <select><option>Валюта</option></select>
    <select><option>Статус</option></select>
    <input placeholder="Контрагент / ID" style="flex:1;min-width:140px">
    <button class="ds-btn ghost sm" type="button">Сбросить</button>
  </div>
  ${ops.length
    ? `<div class="ds-card"><div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Дата</th><th>ID</th><th>Контрагент</th><th>Направление</th><th>Сумма</th><th>Статус</th></tr></thead>
    <tbody>${ops.map(x => `<tr><td>${x.dt}</td><td><b>${x.id}</b></td><td>${x.cp}</td><td>${x.dir === 'out' ? 'Исходящий' : 'Входящий'}</td><td>${money(x.amount)} ${x.cur}</td><td>${statusPill(x.status)}</td></tr>`).join('')}</tbody></table></div></div>`
    : emptyBlock('История пуста', 'Здесь появятся ваши операции после первого платежа.')}`;
}

function pageReports() {
  return `<div class="ds-page-hd"><div><h1>Отчёты</h1><p>Аналитика по операциям вашего профиля.</p></div></div>
  <div class="ds-grid ds-grid-4" style="margin-bottom:14px">
    <div class="ds-kpi"><div class="label">Оборот 7 дней</div><div class="val">0 ₽</div></div>
    <div class="ds-kpi"><div class="label">Успешность</div><div class="val">—</div></div>
    <div class="ds-kpi"><div class="label">Среднее время</div><div class="val">—</div></div>
    <div class="ds-kpi"><div class="label">Комиссии</div><div class="val">0 ₽</div></div>
  </div>
  ${emptyBlock('Нет данных для отчёта', 'Отчёты появятся после первых операций.')}`;
}

function pageSettings(user) {
  const isOrg = user.personType === 'organization';
  return `<div class="ds-page-hd"><div><h1>Настройки</h1><p>Профиль и безопасность сессии.</p></div></div>
  <div class="ds-grid ds-grid-2">
    <div class="ds-card">
      <h3>Профиль</h3>
      <div class="ds-summary">
        <div class="line"><span>${isOrg ? 'Контакт' : 'ФИО'}</span><b>${user.name || '—'}</b></div>
        <div class="line"><span>Тип</span><b>${isOrg ? 'Организация' : 'Физическое лицо'}</b></div>
        <div class="line"><span>Логин</span><b>${user.login}</b></div>
        <div class="line"><span>Email</span><b>${user.email || '—'}</b></div>
        <div class="line"><span>${isOrg ? 'Организация' : 'Статус'}</span><b>${isOrg ? (user.org || '—') : (user.vtbClient ? 'Клиент ВТБ' : '—')}</b></div>
        ${isOrg ? `<div class="line"><span>ОПФ</span><b>${user.orgTypeLabel || user.orgType || '—'}</b></div>
        <div class="line"><span>ИНН</span><b>${user.inn || '—'}</b></div>
        <div class="line"><span>ОГРН</span><b>${user.ogrn || '—'}</b></div>` : `<div class="line"><span>ИНН</span><b>${user.inn || '—'}</b></div>`}
      </div>
    </div>
    <div class="ds-card">
      <h3>Безопасность</h3>
      <p style="font-size:13px;color:#6B7A90">Сессия хранится локально в браузере до подключения серверной авторизации.</p>
      <button class="ds-btn ghost" type="button" id="cab-logout-2" style="margin-top:10px">Завершить сессию</button>
    </div>
  </div>`;
}

/* ——— Bank ——— */
function pageBankHome() {
  return `<div class="ds-page-hd"><div><h1>Кабинет банка</h1><p>Очередь и мониторинг обслуживаемых клиентов.</p></div></div>
  <div class="ds-grid ds-grid-4" style="margin-bottom:14px">
    <div class="ds-kpi"><div class="label">Ожидают оплаты</div><div class="val">0</div></div>
    <div class="ds-kpi"><div class="label">На рассмотрении</div><div class="val">0</div></div>
    <div class="ds-kpi"><div class="label">Доступная ликвидность</div><div class="val">0 ₽</div></div>
    <div class="ds-kpi"><div class="label">С пометкой риска</div><div class="val">0</div></div>
  </div>
  ${emptyBlock('Очередь пуста', 'Операции появятся после реальных заявок клиентов.')}`;
}

function pageQueue() {
  const q = D().bankQueue || [];
  return `<div class="ds-page-hd"><div><h1>Очередь операций</h1><p>Входящие и исходящие платежи клиентов банка.</p></div></div>
  ${q.length ? `<div class="ds-card"><div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>ID</th><th>Клиент</th><th>Контрагент</th><th>Маршрут</th><th>Сумма</th><th>Статус</th></tr></thead>
  <tbody>${q.map(r => `<tr><td><b>${r.id}</b></td><td>${r.client}</td><td>${r.cp}</td><td>${r.route}</td><td>${r.amount}</td><td>${statusPill(r.risk || 'wait')}</td></tr>`).join('')}</tbody></table></div></div>`
  : emptyBlock('Очередь пуста', 'Заявки появятся после операций клиентов.')}`;
}

function pageCompliance() {
  const cases = D().complianceCases || [];
  return `<div class="ds-page-hd"><div><h1>KYC / AML</h1><p>Кейсы комплаенса по операциям.</p></div></div>
  ${cases.length ? `<div class="ds-card"><div class="ds-case-list">${cases.map(c => `<button class="ds-case" type="button"><b>№ ${c.id}</b><div class="row"><span>${c.client}</span>${statusPill(c.risk)}</div></button>`).join('')}</div></div>`
  : emptyBlock('Кейсов нет', 'Очередь комплаенса пуста.')}`;
}

function pageBankClients() {
  return `<div class="ds-page-hd"><div><h1>Клиенты банка</h1><p>Юрлица и физлица на обслуживании.</p></div></div>
  ${emptyBlock('Клиентов пока нет', 'Список заполняется из зарегистрированных профилей.')}`;
}

function pagePartners() {
  return `<div class="ds-page-hd"><div><h1>Банки-контрагенты</h1><p>Маршруты и доступность партнёров.</p></div></div>
  ${emptyBlock('Партнёры не подключены', 'Добавьте корреспондентские банки после интеграции.')}`;
}

function pageLiquidity() {
  return `<div class="ds-page-hd"><div><h1>Ликвидность и резервы</h1><p>Расчётные позиции банка.</p></div></div>
  <div class="ds-grid ds-grid-3">
    <div class="ds-kpi"><div class="label">RUB-CBDC доступно</div><div class="val">0</div></div>
    <div class="ds-kpi"><div class="label">В резерве</div><div class="val">0</div></div>
    <div class="ds-kpi"><div class="label">Буфер e-CNY</div><div class="val">0</div></div>
  </div>`;
}

/* ——— CBR ——— */
function pageCbrHome() {
  const m = D().nodeMetrics;
  return `<div class="ds-hero" style="margin-bottom:14px"><h1>Национальный узел ЦВЦБ</h1><p>Состояние узла · uptime ${m.uptime} · latency ${m.latency}</p>
    <div class="sub">Только своя юрисдикция</div></div>
  <div class="ds-grid ds-grid-4" style="margin-bottom:14px">
    <div class="ds-kpi"><div class="label">Активные банки</div><div class="val">${m.banks}</div></div>
    <div class="ds-kpi"><div class="label">Операции в обработке</div><div class="val">${m.ops}</div></div>
    <div class="ds-kpi"><div class="label">Успешность расчётов</div><div class="val">${m.success}</div></div>
    <div class="ds-kpi"><div class="label">Критические события</div><div class="val">${m.critical}</div></div>
  </div>
  <div class="ds-grid ds-grid-3">
    <div class="ds-card"><h3>Объём расчётов</h3><div style="font-size:22px;font-weight:700">${m.volume}</div></div>
    <div class="ds-card"><h3>Пропускная способность</h3><div style="font-size:22px;font-weight:700">${m.throughput}</div></div>
    <div class="ds-card"><h3>Очереди подтверждений</h3>
      <div class="ds-summary">
        <div class="line"><span>Ожидают</span><b>0</b></div>
        <div class="line"><span>В обработке</span><b>0</b></div>
        <div class="line"><span>Просрочено</span><b>0</b></div>
      </div>
    </div>
  </div>`;
}

function pageNode() { return pageCbrHome(); }

function pageConfirmations() {
  return `<div class="ds-page-hd"><div><h1>Очереди подтверждений</h1><p>Автоподтверждения узла.</p></div></div>
  ${emptyBlock('Подтверждений нет', 'Очередь пуста.')}`;
}

function pageCorridors() {
  return `<div class="ds-page-hd"><div><h1>Валютные коридоры</h1><p>Доступные маршруты расчётов.</p></div></div>
  ${emptyBlock('Коридоры не настроены', 'Маршруты появятся после подключения партнёров.')}`;
}

function pageOps() {
  return `<div class="ds-page-hd"><div><h1>Мониторинг операций</h1><p>Агрегаты по своей валютной юрисдикции.</p></div></div>
  <div class="ds-card"><div class="ds-empty">Телеметрия узла и инциденты отображаются в разделе «Национальный узел».</div></div>`;
}

/* ——— Admin ——— */
function pageAdminHome() {
  const users = (Auth() && Auth().loadUsers && Auth().loadUsers()) || [];
  return `<div class="ds-hero" style="margin-bottom:14px"><h1>Администрирование платформы</h1><p>Организации, пользователи и аудит.</p></div>
  <div class="ds-grid ds-grid-3" style="margin-bottom:14px">
    <div class="ds-kpi"><div class="label">Организации</div><div class="val">${users.filter(u => u.personType === 'organization').length}</div></div>
    <div class="ds-kpi"><div class="label">Пользователи</div><div class="val">${users.length}</div></div>
    <div class="ds-kpi"><div class="label">События аудита</div><div class="val">${(D().audit || []).length}</div></div>
  </div>
  <div class="ds-grid ds-grid-2">
    <button class="ds-card" type="button" data-ds-nav="orgs" style="cursor:pointer;text-align:left"><h3>Организации</h3><p style="margin:0;color:#6B7A90;font-size:13px">Зарегистрированные юрлица</p></button>
    <button class="ds-card" type="button" data-ds-nav="users" style="cursor:pointer;text-align:left"><h3>Пользователи</h3><p style="margin:0;color:#6B7A90;font-size:13px">Учётные записи системы</p></button>
  </div>`;
}

function pageOrgs() {
  const rows = ((Auth() && Auth().loadUsers && Auth().loadUsers()) || []).filter(u => u.personType === 'organization');
  return `<div class="ds-page-hd"><div><h1>Организации</h1><p>Зарегистрированные юридические лица РФ.</p></div></div>
  ${rows.length ? `<div class="ds-card"><div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Название</th><th>ОПФ</th><th>ИНН</th><th>ОГРН</th><th>ВТБ</th></tr></thead>
  <tbody>${rows.map(r => `<tr><td><b>${r.org || '—'}</b></td><td>${r.orgTypeLabel || r.orgType || '—'}</td><td>${r.inn || '—'}</td><td>${r.ogrn || '—'}</td><td>${r.vtbClient ? 'Да' : '—'}</td></tr>`).join('')}</tbody></table></div></div>`
  : emptyBlock('Организаций нет', 'Список пуст до первой регистрации юрлица.')}`;
}

function pageUsers() {
  const rows = (Auth() && Auth().loadUsers && Auth().loadUsers()) || [];
  return `<div class="ds-page-hd"><div><h1>Пользователи</h1><p>Зарегистрированные учётные записи.</p></div></div>
  ${rows.length ? `<div class="ds-card"><div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Пользователь</th><th>Тип</th><th>Организация / статус</th><th>Email</th></tr></thead>
  <tbody>${rows.map(r => `<tr><td>${r.name}</td><td>${r.personType === 'organization' ? 'Организация' : 'Физлицо'}</td><td>${r.org || (r.vtbClient ? 'Клиент ВТБ' : '—')}</td><td>${r.email || '—'}</td></tr>`).join('')}</tbody></table></div></div>`
  : emptyBlock('Пользователей нет', 'Зарегистрируйте первую учётную запись.')}`;
}

function pagePolicies() {
  return `<div class="ds-page-hd"><div><h1>Правила проверок</h1><p>Политики AML / KYC и лимиты.</p></div></div>
  ${emptyBlock('Политики не заданы', 'Правила появятся после настройки комплаенса.')}`;
}

function pageMonitoring() {
  return pageCbrHome();
}

function pageAudit() {
  const rows = D().audit || [];
  return `<div class="ds-page-hd"><div><h1>Журнал аудита</h1><p>События системы.</p></div></div>
  ${rows.length ? `<div class="ds-card"><div class="ds-table-wrap"><table class="ds-table"><thead><tr><th>Дата</th><th>Событие</th><th>Актор</th><th>Результат</th></tr></thead>
  <tbody>${rows.map(a => `<tr><td>${a.dt}</td><td>${a.event}</td><td>${a.actor}</td><td>${a.result === 'ok' ? statusPill('ok') : statusPill('rejected')}</td></tr>`).join('')}</tbody></table></div></div>`
  : emptyBlock('Журнал пуст', 'События аудита пока не зафиксированы.')}`;
}

const PAGES = {
  client: {
    home: pageClientHome, payments: pagePayments, 'payments-new': pagePaymentsNew,
    counterparties: pageCounterparties, wallets: pageWallets, fx: pageFx,
    documents: pageDocuments, approvals: pageApprovals, history: pageHistory,
    reports: pageReports, settings: pageSettings
  },
  bank: {
    home: pageBankHome, queue: pageQueue, compliance: pageCompliance,
    clients: pageBankClients, partners: pagePartners, liquidity: pageLiquidity,
    fx: pageFx, reports: pageReports, settings: pageSettings
  },
  cbr: {
    home: pageCbrHome, node: pageNode, confirmations: pageConfirmations,
    corridors: pageCorridors, ops: pageOps, reports: pageReports, settings: pageSettings
  },
  admin: {
    home: pageAdminHome, orgs: pageOrgs, users: pageUsers, corridors: pageCorridors,
    policies: pagePolicies, monitoring: pageMonitoring, audit: pageAudit,
    settings: pageSettings
  }
};

const state = { role: null, page: 'home' };

function render(user) {
  CTX = (window.DigitalSkyCabinetData && window.DigitalSkyCabinetData.forUser(user)) || null;
  // Clean product mode: registered users work in client cabinet only.
  const role = 'client';
  state.role = role;
  const pages = PAGES[role];
  if (!pages[state.page]) state.page = 'home';
  const bodyFn = pages[state.page];
  const body = bodyFn.length ? bodyFn(user) : bodyFn();
  return shell(user, role, state.page === 'payments-new' ? 'payments' : state.page, body);
}

function navigate(page) {
  state.page = page;
  window.DigitalSkyCabinet.remount();
}

function setSideOpen(open) {
  const side = document.getElementById('ds-side');
  const backdrop = document.getElementById('ds-side-backdrop');
  if (!side || !backdrop) return;
  side.classList.toggle('is-open', open);
  backdrop.hidden = !open;
  document.body.classList.toggle('ds-side-open', open);
}

function bind() {
  document.querySelectorAll('[data-ds-nav]').forEach(el => {
    el.addEventListener('click', () => {
      setSideOpen(false);
      navigate(el.getAttribute('data-ds-nav'));
    });
  });
  document.querySelectorAll('[data-ds-more]').forEach(el => {
    el.addEventListener('click', () => setSideOpen(true));
  });
  const openBtn = document.getElementById('ds-menu-open');
  const closeBtn = document.getElementById('ds-side-close');
  const backdrop = document.getElementById('ds-side-backdrop');
  if (openBtn) openBtn.addEventListener('click', () => setSideOpen(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setSideOpen(false));
  if (backdrop) backdrop.addEventListener('click', () => setSideOpen(false));

  document.querySelectorAll('[data-ds-role]').forEach(el => {
    el.addEventListener('click', () => {
      state.role = el.getAttribute('data-ds-role');
      state.page = 'home';
      if (Auth() && Auth().setRole) Auth().setRole(state.role);
      window.DigitalSkyCabinet.remount();
    });
  });
  const logout = document.getElementById('cab-logout');
  const logout2 = document.getElementById('cab-logout-2');
  const goAuth = () => { Auth() && Auth().logout(); location.href = (window.DS_BASE || './') + 'auth/'; };
  if (logout) logout.addEventListener('click', goAuth);
  if (logout2) logout2.addEventListener('click', goAuth);

  const paySubmit = document.getElementById('pay-submit');
  if (paySubmit) paySubmit.addEventListener('click', () => {
    toast('Заявка сохранена как черновик. Банковская обработка пока не подключена.');
    navigate('payments');
  });
  const fx = document.getElementById('fx-convert');
  if (fx) fx.addEventListener('click', () => toast('Источник курса ещё не подключён.'));
  document.querySelectorAll('[data-approve]').forEach(b => b.addEventListener('click', () => toast('Согласование сохранено.')));
  document.querySelectorAll('[data-reject]').forEach(b => b.addEventListener('click', () => toast('Платёж отклонён.')));
  document.querySelectorAll('[data-bank-confirm]').forEach(b => b.addEventListener('click', () => toast('Операция подтверждена.')));
  document.querySelectorAll('[data-aml-ok]').forEach(b => b.addEventListener('click', () => toast('Кейс допущен.')));
  document.querySelectorAll('[data-aml-bad]').forEach(b => b.addEventListener('click', () => toast('Кейс отклонён.')));
  const dl = document.getElementById('dl-receipt');
  if (dl) dl.addEventListener('click', () => toast('Квитанция пока недоступна.'));
  const cpAdd = document.getElementById('cp-add');
  if (cpAdd) cpAdd.addEventListener('click', () => toast('Добавление контрагента будет доступно после сохранения формы.'));
}

window.DigitalSkyCabinet = {
  render,
  bind,
  navigate,
  state,
  remount() {
    const user = Auth() && Auth().currentUser();
    if (!user) { location.replace((window.DS_BASE || './') + 'auth/'); return; }
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = `<main id="main-content">${render(user)}</main>`;
    document.body.classList.add('is-app-shell');
    bind();
  }
};
})();
