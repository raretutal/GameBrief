# 🎮 GameBrief

![Vue.js](https://img.shields.io/badge/vue-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/supabase-%233ECF8E.svg?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)

A web application built with Vue 3 and Vite.

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

```bash
npm install
```

### Running App

```bash
npm run dev
```


# 📁 Project Structure
Use this guide to determine where to place new code and files within the project:

- **src/assets/** */: Contains static styling assets like global CSS and image files.

- **src/components/**: Contains reusable Vue components (e.g., buttons, form inputs, icons) used across multiple pages.

- **src/router**/: Contains Vue Router configuration, route definitions, and navigation guards.

- **src/services**/: Contains API handlers, database queries (e.g., Supabase interactions), and external integrations.

- **src/stores/** */: Contains Pinia state management files for managing global application state.

- **src/views/** */: Contains top-level, full-page Vue components that map directly to specific routes.

- **public/** */: Contains static files served directly to the browser without Vite processing (e.g., favicon.ico).