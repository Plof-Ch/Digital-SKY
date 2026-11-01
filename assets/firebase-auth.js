/* Optional Firebase Auth bridge. Falls back to local demo auth when disabled. */
(() => {
'use strict';

const cfg = window.DS_FIREBASE || { enabled: false };
let ready = false;
let auth = null;

async function init() {
  if (!cfg.enabled || !cfg.config || !cfg.config.apiKey) {
    window.DigitalSkyFirebase = { ready: false, enabled: false };
    return;
  }
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js');
    const {
      getAuth, onAuthStateChanged, signInWithEmailAndPassword,
      createUserWithEmailAndPassword, updateProfile, signOut
    } = await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js');

    const app = initializeApp(cfg.config);
    auth = getAuth(app);
    ready = true;

    window.DigitalSkyFirebase = {
      ready: true,
      enabled: true,
      auth,
      async login(email, password) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        return mapUser(cred.user);
      },
      async register({ email, password, name }) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(cred.user, { displayName: name });
        return mapUser(cred.user, name);
      },
      async logout() { await signOut(auth); },
      currentUser() { return auth.currentUser ? mapUser(auth.currentUser) : null; },
      onChange(cb) { return onAuthStateChanged(auth, u => cb(u ? mapUser(u) : null)); }
    };
  } catch (err) {
    console.warn('Firebase init failed, using local demo auth.', err);
    window.DigitalSkyFirebase = { ready: false, enabled: false, error: String(err && err.message || err) };
  }
}

function mapUser(u, name) {
  return {
    uid: u.uid,
    login: u.email || u.uid,
    email: u.email || '',
    name: name || u.displayName || (u.email || 'Пользователь'),
    role: 'client',
    card: '—',
    provider: 'firebase'
  };
}

init();
})();
