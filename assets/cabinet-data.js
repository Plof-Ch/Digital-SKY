/* Digital Sky — clean cabinet datasets (no template business data). */
(() => {
'use strict';

function money(n, digits = 2) {
  return Number(n || 0).toLocaleString('ru-RU', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function workspaceOf(user) {
  const Auth = window.DigitalSkyAuth;
  if (user && user.workspace) return user.workspace;
  if (Auth && Auth.emptyWorkspace) return Auth.emptyWorkspace();
  return {
    wallets: [{ id: 'w-rub', code: 'RUB-CBDC', title: 'Цифровой рубль', sub: 'CBDC РФ', bal: 0, reserved: 0, limit: 0, symbol: '₽', color: '#004CBC' }],
    counterparties: [],
    operations: [],
    approvals: [],
    documents: [],
    notifications: []
  };
}

function forUser(user) {
  const ws = workspaceOf(user);
  const isOrg = user && user.personType === 'organization';
  return {
    org: {
      name: isOrg ? (user.org || 'Организация') : (user && user.vtbClient ? 'Клиент ВТБ' : 'Физическое лицо'),
      short: isOrg ? (user.org || 'Организация') : (user && user.name) || 'Пользователь',
      inn: (user && user.inn) || '—',
      bank: user && user.vtbClient ? 'ВТБ' : '—',
      personType: (user && user.personType) || 'individual',
      orgTypeLabel: (user && user.orgTypeLabel) || ''
    },
    wallets: ws.wallets || [],
    rates: [],
    counterparties: ws.counterparties || [],
    operations: ws.operations || [],
    approvals: ws.approvals || [],
    documents: ws.documents || [],
    folders: [
      { id: 'contracts', title: 'Договоры', count: 0 },
      { id: 'invoices', title: 'Инвойсы', count: 0 },
      { id: 'customs', title: 'Таможня', count: 0 },
      { id: 'receipts', title: 'Квитанции', count: 0 },
      { id: 'forms', title: 'Формы', count: 0 }
    ],
    bankQueue: [],
    complianceCases: [],
    nodeMetrics: {
      uptime: '—', latency: '—', banks: 0, ops: '0', success: '—', critical: 0,
      volume: '0,00 ₽', throughput: '0', load: 0
    },
    adminOrgs: [],
    audit: [],
    money
  };
}

window.DigitalSkyCabinetData = {
  money,
  forUser,
  // legacy no-op getters kept empty for safety
  get org() { return { name: '', short: '', inn: '', bank: '' }; },
  get wallets() { return []; },
  get rates() { return []; },
  get counterparties() { return []; },
  get operations() { return []; },
  get approvals() { return []; },
  get documents() { return []; },
  get folders() { return []; },
  get bankQueue() { return []; },
  get complianceCases() { return []; },
  get nodeMetrics() { return { uptime: '—', latency: '—', banks: 0, ops: '0', success: '—', critical: 0, volume: '0,00 ₽', throughput: '0', load: 0 }; },
  get adminOrgs() { return []; },
  get audit() { return []; }
};
})();
