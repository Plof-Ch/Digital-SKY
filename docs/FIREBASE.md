# Firebase — Digital Sky

Проект: **digital-sky-bee31**

- Hosting: https://digital-sky-bee31.web.app
- Console: https://console.firebase.google.com/project/digital-sky-bee31/overview
- Конфиг: `assets/firebase-config.js` (`enabled: true`)

## Authentication

1. Откройте [Authentication → Sign-in method](https://console.firebase.google.com/project/digital-sky-bee31/authentication/providers).
2. Включите **Email/Password**.
3. (Опционально) Authorized domains: добавьте свой домен, если используете не `*.web.app` / `*.firebaseapp.com`.

После этого регистрация/вход по email идут через Firebase. Локальный fallback остаётся для логинов без email.

«Войти через ВТБ» — UI-заглушка до банковской OpenID-интеграции.

## Деплой

```bash
firebase use digital-sky-bee31
firebase deploy --only hosting
```
