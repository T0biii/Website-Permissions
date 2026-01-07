# Browser Permissions Demo - Awareness Tool 🔒

A comprehensive educational web application that demonstrates all browser permissions and the data they can access. This tool helps users understand what permissions websites can request and raises awareness about the importance of carefully considering permission requests.

## 🎯 Purpose

This proof-of-concept application demonstrates:
- All major browser permissions that websites can request
- What data each permission can access
- The importance of being selective with permission grants
- Real-time display of information accessible through each permission

## 🚀 Features

### Permissions Demonstrated

1. **📍 Geolocation** - Access to physical location coordinates
2. **🔔 Notifications** - Send notifications even when not on the page
3. **📷 Camera** - Access to camera for video capture
4. **🎤 Microphone** - Access to microphone for audio recording
5. **📋 Clipboard** - Read and write clipboard data
6. **🎹 MIDI Devices** - Access to MIDI musical instruments
7. **📱 Motion Sensors** - Access to accelerometer and gyroscope data
8. **💾 Persistent Storage** - Store data permanently on device
9. **🔄 Background Sync** - Sync data in the background
10. **📶 Bluetooth** - Access to nearby Bluetooth devices
11. **🔌 USB Devices** - Access to USB devices
12. **⏱️ Idle Detection** - Detect when user is idle or away
13. **🔆 Screen Wake Lock** - Prevent screen from turning off

### Browser Information Display

The application also displays information that doesn't require permissions:
- User Agent
- Platform & Operating System
- Language preferences
- Hardware specifications (CPU cores, memory)
- Screen resolution
- Timezone and local time
- And more...

## 📖 How to Use

1. **Open the Application**: Simply open `index.html` in a modern web browser
2. **Auto-Request on First Visit**: On your first visit, the application will automatically request several permissions (Geolocation, Notifications, Clipboard, MIDI, Persistent Storage, Background Sync, Idle Detection, and Wake Lock) to demonstrate the permission prompts
3. **Review Permissions**: Read the description for each permission
4. **Manual Request**: Click the "Request Permission" button for any permission you want to test manually
5. **Grant or Deny**: Your browser will prompt you to grant or deny the permission
6. **View Data**: If granted, see what data the website can access

**Note**: Permissions are only auto-requested on the first visit. Subsequent visits won't trigger automatic permission requests unless you clear your browser's local storage.

## 🌐 Browser Compatibility

This application works best in modern browsers that support the latest web APIs:
- Chrome/Edge (recommended for full feature support)
- Firefox (most features supported)
- Safari (some features may be limited)

Note: Some permissions may not be available in all browsers or may require specific conditions (e.g., HTTPS).

## ⚠️ Privacy & Security

**Important Notes:**
- This is an educational tool designed to demonstrate browser capabilities
- Always carefully review what permissions you grant to websites
- Only grant permissions to websites you trust
- Review and revoke permissions regularly in your browser settings
- This tool does NOT store or transmit any data

## 🛠️ Technical Details

- Pure HTML, CSS, and JavaScript (no frameworks required)
- Uses modern Web APIs:
  - Geolocation API
  - Notifications API
  - MediaDevices API
  - Clipboard API
  - Web MIDI API
  - Generic Sensor API
  - Storage API
  - Web Bluetooth API
  - WebUSB API
  - Idle Detection API
  - Screen Wake Lock API

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new permissions to demonstrate
- Improve documentation
- Enhance the user interface

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Remember:** Always be cautious about granting permissions to websites. Each permission gives the website access to sensitive data or capabilities on your device.