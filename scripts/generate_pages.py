"""Create static route shells; all page content is in assets/site.js?v=19.
Run python scripts/generate_pages.py after adding a new route.
"""
from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
pages={
 'home':('','Digital Sky — концепция платформы трансграничных расчётов в ЦВЦБ','Исследовательский финтех-проект межбанковской платформы для трансграничных расчётов в цифровых валютах центральных банков.'),
 'platform':('platform','О платформе — Digital Sky','Концепция межбанковской платформы взаимодействия национальных цифровых валют.'),
 'how-it-works':('how-it-works','Как работает Digital Sky — сценарий Россия–Китай','Интерактивный сценарий международной транзакции: банки, центральные банки, цифровой рубль и цифровой юань.'),
 'technology':('technology','Технологии Digital Sky — архитектура и PvP','Трёхуровневая архитектура, интеграционные API, межсистемный PvP и цифровые валюты центральных банков.'),
 'audiences':('audiences','Для кого создаётся Digital Sky','Банки как B2B-клиенты, бизнес как конечный пользователь, центральные банки как участники инфраструктуры.'),
 'security':('security','Безопасность Digital Sky — проектные механизмы','PKI, TLS, API, AML/KYC, SIEM и вопросы проверки технической безопасности концепции.'),
 'research':('research','Исследования Digital Sky — данные, графики и источники','Графики финансового прогноза, модели ЦВЦБ, интерфейсы диплома, технические показатели из курсовой и матрица доказательств.'),
 'roadmap':('roadmap','Развитие Digital Sky — дорожная карта','Документированные результаты проекта и направления будущих испытаний межсистемных расчётов.'),
 'about':('about','О проекте Digital Sky — научная основа','Цели и исследовательская база финтех-проекта трансграничных расчётов.'),
 'contacts':('contacts','Контакты Digital Sky','Контакты исследовательской команды Digital Sky и направления профессионального сотрудничества.'),
 'auth':('auth','Вход и регистрация — Digital Sky','Демонстрационный вход и регистрация в интерфейсе Digital Sky по макету диплома.'),
 'cabinet':('cabinet','Личный кабинет — Digital Sky','Демонстрационный личный кабинет Digital Sky: обзор, переводы и настройки.'),
}
for key,(slug,title,desc) in pages.items():
    depth='../' if slug else './'
    page_dir=root/slug if slug else root
    page_dir.mkdir(parents=True,exist_ok=True)
    html=f'''<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#071329">
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="{desc}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <title>{title}</title>
  <link rel="icon" type="image/png" href="{depth}assets/brand/favicon.png">
  <link rel="apple-touch-icon" href="{depth}assets/brand/apple-touch.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="{depth}assets/style.css?v=31">
  <link rel="stylesheet" href="{depth}assets/auth-ui.css?v=31">
  <link rel="stylesheet" href="{depth}assets/cabinet-ui.css?v=31">
  <script>window.DS_PAGE='{key}';window.DS_BASE='{depth}';</script>
  <script defer src="{depth}assets/site-data.js?v=31"></script>
  <script src="{depth}assets/firebase-config.js?v=31"></script>
  <script defer src="{depth}assets/firebase-auth.js?v=31"></script>
  <script defer src="{depth}assets/auth.js?v=31"></script>
  <script defer src="{depth}assets/cabinet-data.js?v=31"></script>
  <script defer src="{depth}assets/cabinet-app.js?v=31"></script>
  <script defer src="{depth}assets/globe.js?v=31"></script>
  <script defer src="{depth}assets/site.js?v=31"></script>
</head>
<body>
  <div id="app"><noscript><main style="max-width:700px;margin:80px auto;font:16px/1.6 sans-serif;padding:0 24px"><h1>Digital Sky</h1><p>Для просмотра интерактивного сайта включите JavaScript в браузере.</p><p>Digital Sky — исследовательская концепция трансграничных расчётов с цифровыми валютами центральных банков.</p></main></noscript></div>
</body>
</html>
'''
    (page_dir/'index.html').write_text(html,encoding='utf-8')
print('Created',len(pages),'pages')
