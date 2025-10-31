# Parky

A parking management application with both web and mobile platforms.

## Prerequisites

- Node.js 18+ and npm 9+
- For mobile: Expo Go app on your phone, or iOS Simulator/Android Emulator

## Project Structure

```
Parky-1/
├── src/                    # Web app source code
│   ├── App.jsx            # Main web app component
│   ├── main.jsx           # Web app entry point
│   └── index.css          # Web app styles
├── public/                # Web app static assets
│   └── react.svg
├── mobile/                # Mobile app (React Native/Expo)
│   ├── App.js             # Mobile app component (WebView wrapper)
│   ├── index.js           # Mobile app entry point
│   ├── app.json           # Expo configuration
│   ├── babel.config.js    # Babel configuration for Expo
│   └── package.json       # Mobile app dependencies
├── package.json           # Web app dependencies
├── vite.config.js         # Vite configuration
└── index.html             # Web app HTML template
```

## Web App (Vite + React)

### Install

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Mobile App (Expo + React Native)

The mobile app wraps the web application in a WebView. **You must run the web app first!**

### Install

```bash
cd mobile
npm install
```

### Run mobile app

**Terminal 1** - Start the web app:

```bash
npm run dev
```

**Terminal 2** - Start the mobile app:

```bash
cd mobile
npm start
```

Then press:

- `a` for Android emulator
- `i` for iOS simulator (Mac only)
- `w` for web browser
- Scan QR code with Expo Go app for physical device

### Configuration

For physical devices, update the web app URL in `mobile/app.json`:

```json
"extra": {
  "WEB_APP_URL": "http://YOUR_LAN_IP:5173"
}
```

## Quick Start (Both Apps)

```bash
# Terminal 1 - Web app
npm run dev

# Terminal 2 - Mobile app
npm run mobile
```

## Technology Stack

### Web

- React 18.3.1
- Vite 5.4.8

### Mobile

- Expo ~54.0.0
- React Native 0.76.6
- React Native WebView 13.12.5
