# Usage Guide

## Quick Start

### Method 1: Direct File Access
1. Download or clone this repository
2. Open `index.html` directly in your web browser
3. Start exploring browser permissions!

### Method 2: Local Web Server (Recommended)
Some permissions require HTTPS or a proper web server. Use one of these methods:

#### Using Python (Built-in)
```bash
# Python 3
python3 -m http.server 8080

# Then open http://localhost:8080 in your browser
```

#### Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8080

# Then open http://localhost:8080 in your browser
```

#### Using PHP
```bash
php -S localhost:8080

# Then open http://localhost:8080 in your browser
```

## How to Use

### First Visit

On your **first visit**, the application will automatically request several permissions to demonstrate how browser permission prompts work:
- 📍 Geolocation
- 🔔 Notifications
- 📋 Clipboard
- 🎹 MIDI Devices
- 💾 Persistent Storage
- 🔄 Background Sync
- ⏱️ Idle Detection
- 🔆 Screen Wake Lock

You can choose to grant or deny each permission as prompted by your browser.

**Note**: Some permissions (Camera, Microphone, Bluetooth, USB) require user interaction and are not auto-requested. You can manually request these by clicking their respective buttons.

### General Usage

1. **Browse Permissions**: Scroll through the different permission cards to see what each permission does

2. **Request Permission**: Click "Request Permission" on any card to trigger the browser's permission prompt

3. **Grant or Deny**: Your browser will ask you to allow or deny the permission

4. **View Data**: If you grant permission, you'll see real-time data that the website can access

5. **Stop Monitoring**: For permissions like camera, microphone, or sensors, use the "Stop" button to release resources

6. **Reset Auto-Requests**: To experience the auto-request feature again, clear your browser's local storage for this site

## Browser Compatibility

### Fully Supported
- **Chrome/Edge 90+**: All permissions work
- **Firefox 85+**: Most permissions work (Bluetooth/USB may be limited)
- **Safari 14+**: Core permissions work (some advanced features limited)

### Partially Supported
- **Mobile Browsers**: Some permissions (USB, Bluetooth) are not available on mobile

## Permission Details

### Always Available
- Geolocation
- Notifications
- Camera
- Microphone
- Clipboard

### May Require HTTPS
- Bluetooth
- USB
- Idle Detection
- Wake Lock

### Requires Service Worker
- Background Sync

### Platform Specific
- Motion Sensors (iOS requires user gesture)
- MIDI (requires connected MIDI device)

## Privacy Notes

⚠️ **Important**: This tool demonstrates what websites CAN access, but:
- No data is stored or transmitted
- All processing happens locally in your browser
- Permissions can be revoked at any time in browser settings
- This is for educational purposes only

## Troubleshooting

### Permission Denied
- Check your browser settings
- Some permissions require HTTPS
- Try using a local server instead of file:// protocol

### Feature Not Supported
- Update your browser to the latest version
- Some features are browser-specific
- Mobile browsers may have limitations

### Camera/Microphone Not Working
- Check if other apps are using the devices
- Grant permission when prompted
- Check browser's site settings

## Additional Resources

- [MDN Web Docs - Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)
- [Can I Use - Browser Compatibility](https://caniuse.com/)
- [Web.dev - Permissions Guide](https://web.dev/permissions/)
