# Parky - React + Vite (JavaScript)

A minimal React app scaffolded with Vite using JavaScript.

## Prerequisites
- Node.js 18+ and npm 9+

## Install
```bash
npm install
```

## Run dev server
```bash
npm run dev
```
Then open the URL shown (e.g., `http://localhost:5173`).

### View in Expo (mobile)
We included a separate Expo app under `mobile/` that wraps this site in a WebView.

1) Start the web app (LAN accessible preferred):
```bash
npm run dev
```
2) In a new terminal, run the Expo app:
```bash
cd mobile
npm install
npm run start
```
3) Scan the QR in Expo Go. If using a physical device, set the LAN URL in `mobile/app.json` → `expo.extra.WEB_APP_URL` (e.g., `http://YOUR_LAN_IP:5173`).

## Build for production
```bash
npm run build
```

## Preview production build
```bash
npm run preview
```

## Project structure
```
.
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/
│  └─ react.svg
└─ src/
   ├─ App.jsx
   ├─ index.css
   └─ main.jsx
```
