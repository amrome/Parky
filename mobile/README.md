# Parky Mobile (Expo)

This Expo app wraps the web app in a WebView so you can view it in Expo Go on iOS/Android (and also run as web via Expo).

## Configure the web URL
- During development, start the web app in the repo root:
  ```bash
  npm run dev
  ```
- Set the web app URL for devices on your LAN (recommended):
  - Find your computer's LAN IP (e.g., `192.168.1.50`).
  - Use: `http://<LAN_IP>:5173`
- You can set it via `app.json` extra:
  ```json
  {
    "expo": {
      "extra": { "WEB_APP_URL": "http://192.168.1.50:5173" }
    }
  }
  ```

If not provided, defaults to `http://localhost:5173` (works on simulators but not physical devices).

## Install and run
```bash
cd mobile
npm install
npm run start
```
Scan the QR with Expo Go to view it on device.


