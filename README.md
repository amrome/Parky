# Parky - Alyamamah University Parking App 🚗# Parky# Parky

A comprehensive parking management mobile application for Alyamamah University students, built with React Native and Expo.A mobile parking management application built with React Native and Expo.A parking management application with both web and mobile platforms.

## 📱 Features## 📱 Project Structure## Prerequisites

### Current Features````- Node.js 18+ and npm 9+

- **Interactive Parking Map**: View all available parking slots across campus

- **Real-Time Availability**: Green/Red indicators for slot status (future: hardware sensor integration)Parky-1/- For mobile: Expo Go app on your phone, or iOS Simulator/Android Emulator

- **Zone Filtering**: Filter by Left Wing (Tuwaiq Building) and Right Wing (DEF Building)

- **Search Functionality**: Find slots by number or building name├── App.js # Main application component

- **Slot Details**: View complete information about each parking spot

- **Booking & Checkout**: Reserve slots with duration selection and payment├── index.js # App entry point## Project Structure

- **My Bookings**: Track active, upcoming, and past parking sessions

- **User Profile**: Student wallet, statistics, and settings├── app.json # Expo configuration

- **Bottom Navigation**: Easy access to all main features

├── babel.config.js # Babel configuration```

### Planned Features (Future Implementation)

- 🎥 **Car Detection Integration**: Hardware sensors to automatically detect slot occupancy├── package.json # DependenciesParky-1/

- 🗺️ **Interactive Campus Map**: Real campus map with pinch-to-zoom

- 📍 **GPS Navigation**: Turn-by-turn directions to your reserved slot├── assets/ # App icons and splash screens├── src/ # Web app source code

- 🔔 **Push Notifications**: Alerts for slot availability and booking reminders

- 📷 **QR Code Verification**: Scan QR to confirm parking└── .gitignore│ ├── App.jsx # Main web app component

- 💳 **Payment Integration**: Credit cards, Apple Pay, Student wallet

- 🔐 **Authentication**: University email login system```│ ├── main.jsx # Web app entry point

## 🏗️ Project Structure│ └── index.css # Web app styles

`````## 🚀 Prerequisites├── public/                # Web app static assets

Parky-1/

├── App.js                      # Main app with navigation setup│   └── react.svg

├── index.js                    # App entry point

├── app.json                    # Expo configuration- **Node.js** 18+ and npm 9+├── mobile/                # Mobile app (React Native/Expo)

├── babel.config.js             # Babel configuration

├── package.json                # Dependencies- **Expo Go** app on your phone (iOS or Android)│   ├── App.js             # Mobile app component (WebView wrapper)

│

├── screens/                    # All screen components- For iOS: Mac with Xcode (for simulator)│   ├── index.js           # Mobile app entry point

│   ├── HomeScreen.js          # Main parking map & slot list

│   ├── SlotDetailsScreen.js   # Individual slot information- For Android: Android Studio (for emulator)│   ├── app.json           # Expo configuration

│   ├── CheckoutScreen.js      # Payment & booking confirmation

│   ├── MyBookingsScreen.js    # Active & past bookings│   ├── babel.config.js    # Babel configuration for Expo

│   └── ProfileScreen.js       # User profile & settings

│## 📦 Installation│   └── package.json       # Mobile app dependencies

├── components/                 # Reusable UI components

│   ├── ParkingSlot.js         # Individual slot card├── package.json           # Web app dependencies

│   └── SlotIndicator.js       # Status indicator (green/red light)

│```bash├── vite.config.js         # Vite configuration

├── utils/                      # Helper functions & data

│   └── parkingData.js         # Mock parking slot data & helpersnpm install└── index.html             # Web app HTML template

│

└── assets/                     # Images and icons````

    ├── images/                # Campus maps, backgrounds

    └── icons/                 # Navigation icons## 🏃 Running the App## Web App (Vite + React)

`````

### Development### Install

## 🚀 Getting Started

`bash`bash

### Prerequisites

- Node.js 18+ and npmnpm startnpm install

- Expo Go app on your phone (iOS or Android)

- Expo CLI: `npm install -g expo-cli` (optional)```````

### Installation

1. **Install dependencies:**This will start the Expo development server and show a QR code.### Run dev server

   ```bash

   npm install

   ```

**Then:**```bash

2. **Start the development server:**

   ````bash- **iOS**: Scan QR code with Camera appnpm run dev

   npm start

   ```- **Android**: Scan QR code with Expo Go app```

   ````

3. **Run on your device:**- **iOS Simulator**: Press `i`

   - Scan the QR code with Expo Go (Android) or Camera app (iOS)

   - Or press `a` for Android emulator / `i` for iOS simulator- **Android Emulator**: Press `a`Then open `http://localhost:5173` in your browser.

## 📊 Mock Data

The app currently uses mock data in `utils/parkingData.js` with:### Alternative Commands### Build for production

- **45 parking slots** (20 in Left Wing, 25 in Right Wing)

- **Random availability** to demonstrate the UI

- **Helper functions** for filtering and statistics

`bash`bash

### Modifying Parking Data

npm run android # Open on Androidnpm run build

Edit `utils/parkingData.js` to:

- Add/remove parking slotsnpm run ios # Open on iOS (Mac only)```

- Change pricing

- Update zone names```

- Modify building information

### Preview production build

Example slot structure:

````javascript## 🛠️ Technology Stack

{

  id: 'RW-01',```bash

  zone: 'right-wing',

  row: 1,- **Expo SDK**: ~54.0.0npm run preview

  position: 1,

  status: 'available', // 'available', 'occupied', 'reserved'- **React Native**: 0.76.9```

  price: 5,

  building: 'DEF'- **React**: 18.3.1

}

```- **expo-status-bar**: ~3.0.0## Mobile App (Expo + React Native)



## 🎨 Adding Campus Maps- **expo-constants**: ~18.0.0



To add your campus map images:The mobile app wraps the web application in a WebView. **You must run the web app first!**



1. Save your map images to `assets/images/`## 📝 Development

   - Main map: `campus-map.png`

   - Left wing: `left-wing-map.png`### Install

   - Right wing: `right-wing-map.png`

The app is a standalone React Native application. All UI development happens in `App.js`.

2. Update the map placeholder in `screens/HomeScreen.js`:

   ```javascript```bash

   import { Image } from 'react-native';

   To add new dependencies:cd mobile

   <Image

     source={require('../assets/images/campus-map.png')}```bashnpm install

     style={styles.mapImage}

     resizeMode="contain"npx expo install <package-name>```

   />

````

## 🔧 Technology Stack### Run mobile app

- **React Native**: 0.81.5## 🎨 Assets

- **Expo SDK**: 54.0.0

- **React Navigation**: 7.x**Terminal 1** - Start the web app:

  - Stack Navigator (for screen flow)

  - Bottom Tab Navigator (for main navigation)App icons and splash screens should be placed in the `assets/` directory:

- **React**: 19.1.0

- `icon.png` - App icon (1024x1024)```bash

## 📱 Navigation Structure

- `splash.png` - Splash screen (1284x2778)npm run dev

```````

BottomTabs- `adaptive-icon.png` - Android adaptive icon (1024x1024)```

├── Home Tab

│   └── Stack Navigator

│       ├── HomeScreen

│       ├── SlotDetailsScreenGenerate assets using:**Terminal 2** - Start the mobile app:

│       └── CheckoutScreen

├── MyBookings Tab```bash

│   └── MyBookingsScreen

└── Profile Tabnpx expo install expo-asset```bash

    └── ProfileScreen

``````cd mobile



## 🔮 Future Hardware Integrationnpm start



### Car Detection SensorsOr use online tools like [appicon.co](https://www.appicon.co/)```



The app is designed to integrate with IoT car detection sensors:



**Planned Setup:**## 🔧 ConfigurationThen press:

1. **Sensors**: Ultrasonic or infrared sensors at each slot

2. **Microcontroller**: ESP32/Arduino to process sensor data

3. **Backend API**: Real-time database (Firebase/AWS) to update slot status

4. **App Integration**: WebSocket connection for live updatesEdit `app.json` to customize:- `a` for Android emulator



**Implementation Area (marked with comments):**- App name- `i` for iOS simulator (Mac only)

- `utils/parkingData.js` - Replace mock data with API calls

- `screens/HomeScreen.js` - Add real-time data subscription- Bundle identifiers- `w` for web browser

- Create `utils/api.js` for backend communication

- Platforms (iOS, Android)- Scan QR code with Expo Go app for physical device

## 📝 Development Notes

- Permissions

### To Add More Screens:

1. Create screen file in `screens/`- And more...### Configuration

2. Import in `App.js`

3. Add to navigation structure



### To Add More Components:## 📱 Building for ProductionFor physical devices, update the web app URL in `mobile/app.json`:

1. Create component in `components/`

2. Import where needed

3. Pass props for customization

### iOS```json

### Color Scheme:

- Primary: `#007AFF` (Blue)```bash"extra": {

- Success/Available: `#4CAF50` (Green)

- Error/Occupied: `#F44336` (Red)npx expo build:ios  "WEB_APP_URL": "http://YOUR_LAN_IP:5173"

- Warning/Reserved: `#FFC107` (Yellow)

- Background: `#F5F5F5` (Light Gray)```}



## 🐛 Troubleshooting```



**Metro bundler errors:**### Android

```bash

npx expo start -c  # Clear cache```bash## Quick Start (Both Apps)

```````

npx expo build:android

**Navigation issues:**

```bash``````bash

rm -rf node_modules

npm install# Terminal 1 - Web app

````

Or use EAS Build (recommended):npm run dev

**Babel errors:**

- Ensure `babel-preset-expo` version matches Expo SDK```bash



## 📄 Licensenpm install -g eas-cli# Terminal 2 - Mobile app



MITeas build --platform androidnpm run mobile



## 👥 Contributorseas build --platform ios```



- Amro - Initial implementation```



## 🎯 Roadmap## Technology Stack



- [ ] Add real campus map images## 📄 License

- [ ] Implement authentication system

- [ ] Integrate payment processing### Web

- [ ] Connect to backend API

- [ ] Add car detection sensor integrationMIT

- [ ] Implement push notifications

- [ ] Add QR code generation- React 18.3.1

- [ ] GPS navigation to parking spot- Vite 5.4.8

- [ ] Dark mode support

- [ ] Multi-language support (Arabic/English)### Mobile



---- Expo ~54.0.0

- React Native 0.76.6

**Made with ❤️ for Alyamamah University Students**- React Native WebView 13.12.5

````
