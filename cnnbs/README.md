# The Quad Gazette — College News & Notice Board System

A responsive, component-based React + TypeScript front end for campus news, official notices, and events. Built as a Front-End Engineering capstone, mapping every implementation decision back to a course outcome (CO1–CO6).

## Tech stack
React 19 · TypeScript · Vite · React Router · Context API · Bootstrap 5 · Axios-style service layer · Vitest + React Testing Library

## Getting started
```bash
npm install
npm run dev        # start the dev server
npm run build      # production build (tsc + vite build)
npm run test        # run the Vitest/RTL suite
npm run lint        # ESLint
```

Demo admin login: `admin@college.edu` / `admin123`

## Folder structure
```
src/
├── components/   reusable UI: Navbar, Footer, NewsCard, NoticeCard, EventCard,
│                 SearchBar, StatisticsCard, Modal, Pagination, NewsTicker,
│                 SkeletonCard, ErrorBoundary, EmptyState
├── pages/        Home, News, NewsDetail, Notices, Events, About, Contact,
│                 Login, AdminDashboard, NotFound
├── services/     newsService, noticeService, eventService, apiClient
├── hooks/        useFetch, useLocalStorage, useDebouncedValue
├── context/      ThemeContext (dark mode), AuthContext, NotificationContext
├── utils/        validators, formatDate
├── routes/       ProtectedRoute
├── types/        shared TypeScript interfaces & generics
├── data/         typed dummy JSON (news/notices/events/stats)
├── styles/       theme.css — design tokens, light/dark variables
└── __tests__/    component, hook, and routing tests
```

## Course outcome mapping

**CO1 — Front-end foundations.** Component-driven, declarative UI throughout `components/`; unidirectional data flow from services to context to pages to presentational cards; immutable state updates via spread/setState; composition (e.g. `Modal` and `EventCard` compose into `Events`).

**CO2 — JavaScript/TypeScript engineering.** ES modules, arrow functions, destructuring, spread, async/await throughout `services/`; typed generics in `ApiResponse<T>` and `useFetch<T>`; strict interfaces in `types/index.ts`; array methods used across search/sort logic.

**CO3 — React component engineering.** Functional components with `useState`, `useEffect`, `useMemo`, `useCallback`; controlled forms (Login, Contact, Event Registration); reusable News/Notice/Event modules; Bootstrap 5 plus a custom CSS-variable design system for responsive layout.

**CO4 — State architecture & API engineering.** `ThemeContext`, `AuthContext`, `NotificationContext` for global/shared state; a typed service layer (`newsService`, `noticeService`, `eventService`) simulating Axios calls with latency, loading states, skeleton screens, and a class-based `ErrorBoundary`; local-storage backed caching in `apiClient.ts`; client-side search/filter/sort.

**CO5 — Routing, forms, accessibility, performance.** React Router with a protected `/admin` route (`ProtectedRoute`) and a dynamic `/news/:id` route; three validated forms with inline error messages; ARIA labels, a skip-link, semantic landmarks, and visible focus states; `React.memo` on card components, `useMemo`/`useCallback` for derived state, `React.lazy` + `Suspense` code-splitting per route, stable `key` usage in lists.

**CO6 — Build, test, deploy.** Vite build system with ESLint + Prettier; Vitest + React Testing Library tests covering component rendering, form validation, search behaviour, and routing (`src/__tests__/`); a GitHub Actions workflow (`.github/workflows/ci.yml`) running lint, type-check, tests, and build on every push; deployment-ready static `dist/` output for Vercel or Netlify.

## Design notes
The visual identity ("The Quad Gazette") borrows from campus signage and physical pin-boards: an oxblood-and-brass palette on parchment, a serif masthead face (Lora) paired with Inter for body text and a monospace face for date-stamps and the scrolling notice ticker. Notice/news/event cards carry a brass "tack" detail and lift slightly on hover. Dark mode swaps the parchment surface for an ink-toned palette while keeping the brass accent for continuity.
