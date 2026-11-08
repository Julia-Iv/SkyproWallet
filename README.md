**SkyproWallet** — это современное и интуитивно понятное веб-приложение для персонального финансового учета и анализа расходов. Проект помогает пользователям контролировать свои финансы, отслеживать транзакции в реальном времени и наглядно анализировать статьи расходов с помощью интерактивных графиков и гибкого календаря периодов.

## 🔥 Основной функционал

* **Анализ расходов:** Наглядная столбчатая диаграмма, отображающая суммы по ключевым категориям (Еда, Транспорт, Жилье, Развлечения, Образование, Другое).
* **Интерактивный календарь:** Кастомный прокручиваемый календарь (Period Calendar) с поддержкой выбора как одиночного дня, так и диапазона дат для глубокой аналитики.
* **Нулевой баланс без просадок:** Умное отображение категорий с нулевыми расходами (`0 ₽`) в виде аккуратных цветных полос на базовой линии без искажения сетки.
* **Динамическое переключение:** Автоматический пересчет общей суммы и мгновенное обновление диаграммы прямо в браузере при выборе любого периода.
* **Интеграция с API:** Автоматический сбор, парсинг и валидация данных о транзакциях, поступающих с бэкенд-сервера.

## 🛠 Технологический стек

* **Frontend:** React (v19+), JavaScript (ES6+)
* **Стилизация:** Styled Components (для изоляции стилей компонентов)
* **Графика и Диаграммы:** Recharts (адаптивные SVG-визуализации)
* **API клиент:** Асинхронный кастомный модуль авторизации и запросов (`api.js`)

## Установка зависимостей
Установите все необходимые библиотеки, включая `recharts` и `styled-components`:

##Запуск проекта в режиме разработки
```bash
npm run dev

После запуска откройте [http://localhost:5173]

## 📂 Структура ключевых компонентов личного кабинета

* **`AnalysisPage.jsx`** — Главный родительский модуль страницы аналитики. Отвечает за загрузку транзакций с бэкенда, хранение выбранного диапазона дат в стейте и реактивную фильтрацию данных с помощью `useMemo`.

* **`PeriodCalendar.jsx`** — Компонент календаря. Генерирует сетку месяцев, обрабатывает логику первого (старт) и второго (конец периода) кликов, переводя данные в чистые объекты `Date` без временных сдвигов.

* **`AnalysisChart.jsx`** — Модуль визуализации. Построен на базе `recharts` с кастомными SVG-лейблами над столбцами. Полностью очищен от дефолтных контуров и рамок для соответствия минималистичному макету.

* **`AnalysisPage.styled.js`** — Файл стилей Styled Components, содержащий анимации, ховер-эффекты и адаптивную разметку (Grid/Flexbox).


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
