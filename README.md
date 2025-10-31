# Parky# Parky

A mobile parking management application built with React Native and Expo.A parking management application with both web and mobile platforms.

## 📱 Project Structure## Prerequisites

````- Node.js 18+ and npm 9+

Parky-1/- For mobile: Expo Go app on your phone, or iOS Simulator/Android Emulator

├── App.js              # Main application component

├── index.js            # App entry point## Project Structure

├── app.json            # Expo configuration

├── babel.config.js     # Babel configuration```

├── package.json        # DependenciesParky-1/

├── assets/             # App icons and splash screens├── src/                    # Web app source code

└── .gitignore│   ├── App.jsx            # Main web app component

```│   ├── main.jsx           # Web app entry point

│   └── index.css          # Web app styles

## 🚀 Prerequisites├── public/                # Web app static assets

│   └── react.svg

- **Node.js** 18+ and npm 9+├── mobile/                # Mobile app (React Native/Expo)

- **Expo Go** app on your phone (iOS or Android)│   ├── App.js             # Mobile app component (WebView wrapper)

- For iOS: Mac with Xcode (for simulator)│   ├── index.js           # Mobile app entry point

- For Android: Android Studio (for emulator)│   ├── app.json           # Expo configuration

│   ├── babel.config.js    # Babel configuration for Expo

## 📦 Installation│   └── package.json       # Mobile app dependencies

├── package.json           # Web app dependencies

```bash├── vite.config.js         # Vite configuration

npm install└── index.html             # Web app HTML template

````

## 🏃 Running the App## Web App (Vite + React)

### Development### Install

`bash`bash

npm startnpm install

```````



This will start the Expo development server and show a QR code.### Run dev server



**Then:**```bash

- **iOS**: Scan QR code with Camera appnpm run dev

- **Android**: Scan QR code with Expo Go app```

- **iOS Simulator**: Press `i`

- **Android Emulator**: Press `a`Then open `http://localhost:5173` in your browser.



### Alternative Commands### Build for production



```bash```bash

npm run android    # Open on Androidnpm run build

npm run ios        # Open on iOS (Mac only)```

```

### Preview production build

## 🛠️ Technology Stack

```bash

- **Expo SDK**: ~54.0.0npm run preview

- **React Native**: 0.76.9```

- **React**: 18.3.1

- **expo-status-bar**: ~3.0.0## Mobile App (Expo + React Native)

- **expo-constants**: ~18.0.0

The mobile app wraps the web application in a WebView. **You must run the web app first!**

## 📝 Development

### Install

The app is a standalone React Native application. All UI development happens in `App.js`.

```bash

To add new dependencies:cd mobile

```bashnpm install

npx expo install <package-name>```

```

### Run mobile app

## 🎨 Assets

**Terminal 1** - Start the web app:

App icons and splash screens should be placed in the `assets/` directory:

- `icon.png` - App icon (1024x1024)```bash

- `splash.png` - Splash screen (1284x2778)npm run dev

- `adaptive-icon.png` - Android adaptive icon (1024x1024)```



Generate assets using:**Terminal 2** - Start the mobile app:

```bash

npx expo install expo-asset```bash

```cd mobile

npm start

Or use online tools like [appicon.co](https://www.appicon.co/)```



## 🔧 ConfigurationThen press:



Edit `app.json` to customize:- `a` for Android emulator

- App name- `i` for iOS simulator (Mac only)

- Bundle identifiers- `w` for web browser

- Platforms (iOS, Android)- Scan QR code with Expo Go app for physical device

- Permissions

- And more...### Configuration



## 📱 Building for ProductionFor physical devices, update the web app URL in `mobile/app.json`:



### iOS```json

```bash"extra": {

npx expo build:ios  "WEB_APP_URL": "http://YOUR_LAN_IP:5173"

```}

```

### Android

```bash## Quick Start (Both Apps)

npx expo build:android

``````bash

# Terminal 1 - Web app

Or use EAS Build (recommended):npm run dev

```bash

npm install -g eas-cli# Terminal 2 - Mobile app

eas build --platform androidnpm run mobile

eas build --platform ios```

```

## Technology Stack

## 📄 License

### Web

MIT

- React 18.3.1
- Vite 5.4.8

### Mobile

- Expo ~54.0.0
- React Native 0.76.6
- React Native WebView 13.12.5
```````
