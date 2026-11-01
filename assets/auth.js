/* Digital Sky — clean auth. No seeded demo users. */
(() => {
'use strict';

const USERS_KEY = 'ds_users_v4_clean';
const SESSION_KEY = 'ds_session_v4';
const ROLE_KEY = 'ds_role_override_v1';
const PROFILE_KEY = 'ds_profiles_v1';

const ORG_TYPES = [
  { id: 'ooo', label: 'ООО — общество с ограниченной ответственностью' },
  { id: 'ao', label: 'АО — акционерное общество' },
  { id: 'pao', label: 'ПАО — публичное акционерное общество' },
  { id: 'ip', label: 'ИП — индивидуальный предприниматель' },
  { id: 'nko', label: 'НКО — некоммерческая организация' },
  { id: 'gup', label: 'ГУП / МУП' },
  { id: 'pk', label: 'Производственный кооператив' },
  { id: 'other', label: 'Иная организационно-правовая форма' }
];

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (_) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadProfiles() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}') || {};
  } catch (_) {
    return {};
  }
}

function saveProfile(login, profile) {
  const all = loadProfiles();
  all[normalizeLogin(login)] = profile;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(all));
}

function getProfile(login) {
  return loadProfiles()[normalizeLogin(login)] || null;
}

function normalizeLogin(login) {
  return String(login || '').trim().toLowerCase();
}

function findUser(loginOrEmail) {
  const key = normalizeLogin(loginOrEmail);
  return loadUsers().find(u =>
    normalizeLogin(u.login) === key || normalizeLogin(u.email) === key
  );
}

function emptyWorkspace() {
  return {
    wallets: [
      { id: 'w-rub', code: 'RUB-CBDC', title: 'Цифровой рубль', sub: 'CBDC РФ', bal: 0, reserved: 0, limit: 0, symbol: '₽', color: '#004CBC' }
    ],
    counterparties: [],
    operations: [],
    approvals: [],
    documents: [],
    notifications: []
  };
}

function publicUser(user) {
  const profile = getProfile(user.login) || {};
  return {
    login: user.login,
    email: user.email || '',
    name: user.name,
    org: user.org || '',
    orgType: user.orgType || '',
    orgTypeLabel: user.orgTypeLabel || '',
    phone: user.phone || '',
    inn: user.inn || '',
    ogrn: user.ogrn || '',
    personType: user.personType || 'individual',
    vtbClient: Boolean(user.vtbClient),
    card: user.card || '—',
    role: localStorage.getItem(ROLE_KEY) || user.role || 'client',
    provider: user.provider || 'local',
    workspace: profile.workspace || emptyWorkspace()
  };
}

function firebaseBridge() {
  return window.DigitalSkyFirebase && window.DigitalSkyFirebase.enabled && window.DigitalSkyFirebase.ready
    ? window.DigitalSkyFirebase
    : null;
}

function currentUser() {
  try {
    const fb = firebaseBridge();
    if (fb && fb.auth && fb.auth.currentUser) {
      const mapped = fb.currentUser();
      const local = findUser(mapped.email || mapped.login);
      return local ? publicUser(local) : { ...mapped, personType: 'individual', workspace: emptyWorkspace() };
    }
    const login = localStorage.getItem(SESSION_KEY);
    if (!login) return null;
    const user = findUser(login);
    return user ? publicUser(user) : null;
  } catch (_) {
    return null;
  }
}

function setRole(role) {
  if (['client', 'bank', 'cbr', 'admin'].includes(role)) {
    localStorage.setItem(ROLE_KEY, role);
  }
}

function validateInn(inn, personType) {
  const digits = String(inn || '').replace(/\D/g, '');
  if (personType === 'individual') {
    if (!digits) return true;
    return digits.length === 12;
  }
  return digits.length === 10 || digits.length === 12;
}

function validateOgrn(ogrn, orgType) {
  const digits = String(ogrn || '').replace(/\D/g, '');
  if (!digits) return false;
  if (orgType === 'ip') return digits.length === 15;
  return digits.length === 13;
}

async function login(login, password) {
  const fb = firebaseBridge();
  const looksEmail = String(login || '').includes('@');

  if (fb && looksEmail) {
    try {
      const user = await fb.login(String(login).trim(), String(password));
      localStorage.setItem(SESSION_KEY, user.login);
      localStorage.removeItem(ROLE_KEY);
      return { ok: true, user, backend: 'firebase' };
    } catch (_) {
      return { ok: false, error: 'Неверный email или пароль.' };
    }
  }

  const user = findUser(login);
  if (!user || String(user.password) !== String(password)) {
    return { ok: false, error: 'Неверный логин или пароль.' };
  }
  localStorage.setItem(SESSION_KEY, user.login);
  localStorage.removeItem(ROLE_KEY);
  return { ok: true, user: publicUser(user), backend: 'local' };
}

async function register(payload) {
  const personType = payload.personType === 'organization' ? 'organization' : 'individual';
  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim().toLowerCase();
  const phone = String(payload.phone || '').trim();
  const login = String(payload.login || '').trim();
  const password = String(payload.password || '');
  const password2 = String(payload.password2 || '');
  const orgType = String(payload.orgType || '').trim();
  const org = String(payload.org || '').trim();
  const inn = String(payload.inn || '').replace(/\s/g, '');
  const ogrn = String(payload.ogrn || '').replace(/\s/g, '');
  const vtbClient = Boolean(payload.vtbClient);

  if (name.length < 2) {
    return { ok: false, error: personType === 'organization' ? 'Укажите контактное лицо.' : 'Укажите ФИО.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Укажите корректный email.' };
  if (phone && !/^[\d+\-\s()]{10,20}$/.test(phone)) return { ok: false, error: 'Проверьте формат телефона.' };
  if (login.length < 3) return { ok: false, error: 'Логин: минимум 3 символа.' };
  if (!/^[a-zA-Z0-9._-]+$/.test(login)) return { ok: false, error: 'Логин: латиница, цифры, . _ -' };
  if (password.length < 8) return { ok: false, error: 'Пароль: минимум 8 символов.' };
  if (!/[A-Za-zА-Яа-я]/.test(password) || !/\d/.test(password)) {
    return { ok: false, error: 'Пароль должен содержать буквы и цифры.' };
  }
  if (password !== password2) return { ok: false, error: 'Пароли не совпадают.' };

  if (personType === 'individual') {
    if (!vtbClient) return { ok: false, error: 'Для физлица требуется подтверждение статуса клиента ВТБ.' };
    if (inn && !validateInn(inn, 'individual')) return { ok: false, error: 'ИНН физлица: 12 цифр.' };
  } else {
    if (!orgType) return { ok: false, error: 'Выберите организационно-правовую форму.' };
    if (org.length < 2) return { ok: false, error: 'Укажите наименование организации.' };
    if (!validateInn(inn, 'organization')) return { ok: false, error: 'ИНН организации: 10 или 12 цифр.' };
    if (!validateOgrn(ogrn, orgType)) {
      return { ok: false, error: orgType === 'ip' ? 'ОГРНИП: 15 цифр.' : 'ОГРН: 13 цифр.' };
    }
  }

  const users = loadUsers();
  if (users.some(u => normalizeLogin(u.login) === normalizeLogin(login))) {
    return { ok: false, error: 'Такой логин уже занят.' };
  }
  if (users.some(u => normalizeLogin(u.email) === email)) {
    return { ok: false, error: 'Email уже зарегистрирован.' };
  }

  const fb = firebaseBridge();
  if (fb) {
    try {
      await fb.register({ email, password, name });
    } catch (err) {
      if (err && err.code === 'auth/email-already-in-use') {
        return { ok: false, error: 'Email уже зарегистрирован.' };
      }
      return { ok: false, error: 'Не удалось создать аккаунт в Firebase.' };
    }
  }

  const orgTypeLabel = (ORG_TYPES.find(t => t.id === orgType) || {}).label || '';
  const user = {
    login,
    email,
    password,
    name,
    phone,
    personType,
    orgType,
    orgTypeLabel,
    org: personType === 'organization' ? org : (vtbClient ? 'Клиент ВТБ' : ''),
    inn,
    ogrn,
    vtbClient: personType === 'individual' ? true : Boolean(payload.orgVtbClient),
    role: 'client',
    card: '—',
    provider: fb ? 'firebase' : 'local',
    createdAt: Date.now()
  };
  users.push(user);
  saveUsers(users);
  saveProfile(login, { workspace: emptyWorkspace() });
  localStorage.setItem(SESSION_KEY, user.login);
  localStorage.removeItem(ROLE_KEY);
  return { ok: true, user: publicUser(user), backend: fb ? 'firebase' : 'local' };
}

async function logout() {
  const fb = firebaseBridge();
  if (fb) {
    try { await fb.logout(); } catch (_) {}
  }
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(ROLE_KEY);
}

// Drop legacy seeded stores so the stand starts clean.
try {
  localStorage.removeItem('ds_users_v2');
  localStorage.removeItem('ds_users_v3');
  localStorage.removeItem('ds_session_v2');
  localStorage.removeItem('ds_session_v3');
} catch (_) {}

window.DigitalSkyAuth = {
  login,
  register,
  logout,
  currentUser,
  loadUsers,
  setRole,
  getProfile,
  saveProfile,
  emptyWorkspace,
  ORG_TYPES,
  firebaseEnabled: () => Boolean(firebaseBridge())
};
})();
