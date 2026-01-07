// Utility function to update status badge
function updateStatus(elementId, status, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = status;
        element.className = `status-badge ${className}`;
    }
}

// Utility function to display data
function displayData(elementId, data) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = data;
        element.style.display = 'block';
    }
}

// Geolocation Permission
async function requestGeolocation() {
    try {
        updateStatus('geolocation-status', 'Requesting...', 'pending');
        
        if (!navigator.geolocation) {
            updateStatus('geolocation-status', 'Not Supported', 'denied');
            displayData('geolocation-data', '<p class="error">Geolocation is not supported by your browser</p>');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                updateStatus('geolocation-status', 'Granted', 'granted');
                const data = `
                    <h3>Location Data:</h3>
                    <ul>
                        <li><strong>Latitude:</strong> ${position.coords.latitude}</li>
                        <li><strong>Longitude:</strong> ${position.coords.longitude}</li>
                        <li><strong>Accuracy:</strong> ${position.coords.accuracy} meters</li>
                        <li><strong>Altitude:</strong> ${position.coords.altitude || 'N/A'}</li>
                        <li><strong>Speed:</strong> ${position.coords.speed || 'N/A'}</li>
                        <li><strong>Timestamp:</strong> ${new Date(position.timestamp).toLocaleString()}</li>
                    </ul>
                `;
                displayData('geolocation-data', data);
            },
            (error) => {
                updateStatus('geolocation-status', 'Denied', 'denied');
                displayData('geolocation-data', `<p class="error">Error: ${error.message}</p>`);
            }
        );
    } catch (error) {
        updateStatus('geolocation-status', 'Error', 'denied');
        displayData('geolocation-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

// Notifications Permission
async function requestNotifications() {
    try {
        updateStatus('notifications-status', 'Requesting...', 'pending');
        
        if (!('Notification' in window)) {
            updateStatus('notifications-status', 'Not Supported', 'denied');
            displayData('notifications-data', '<p class="error">Notifications are not supported by your browser</p>');
            return;
        }

        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
            updateStatus('notifications-status', 'Granted', 'granted');
            new Notification('Permission Granted!', {
                body: 'You have granted notification permission',
                icon: '🔔'
            });
            displayData('notifications-data', `
                <h3>Notification Permission:</h3>
                <ul>
                    <li><strong>Status:</strong> Granted</li>
                    <li><strong>Can send notifications:</strong> Yes</li>
                    <li><strong>Test notification sent!</strong></li>
                </ul>
            `);
        } else {
            updateStatus('notifications-status', 'Denied', 'denied');
            displayData('notifications-data', '<p class="error">Notification permission was denied</p>');
        }
    } catch (error) {
        updateStatus('notifications-status', 'Error', 'denied');
        displayData('notifications-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

// Camera Permission
async function requestCamera() {
    try {
        updateStatus('camera-status', 'Requesting...', 'pending');
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            updateStatus('camera-status', 'Not Supported', 'denied');
            displayData('camera-data', '<p class="error">Camera access is not supported by your browser</p>');
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        updateStatus('camera-status', 'Granted', 'granted');
        
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.autoplay = true;
        videoElement.style.maxWidth = '100%';
        videoElement.style.borderRadius = '8px';
        
        const tracks = stream.getVideoTracks();
        const settings = tracks[0].getSettings();
        
        const data = `
            <h3>Camera Access Granted:</h3>
            <ul>
                <li><strong>Device:</strong> ${tracks[0].label}</li>
                <li><strong>Resolution:</strong> ${settings.width}x${settings.height}</li>
                <li><strong>Frame Rate:</strong> ${settings.frameRate} fps</li>
                <li><strong>Facing Mode:</strong> ${settings.facingMode || 'N/A'}</li>
            </ul>
            <div id="camera-preview"></div>
            <button onclick="stopCamera()" class="stop-btn">Stop Camera</button>
        `;
        displayData('camera-data', data);
        document.getElementById('camera-preview').appendChild(videoElement);
        
        window.cameraStream = stream;
    } catch (error) {
        updateStatus('camera-status', 'Denied', 'denied');
        displayData('camera-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

function stopCamera() {
    if (window.cameraStream) {
        window.cameraStream.getTracks().forEach(track => track.stop());
        displayData('camera-data', '<p>Camera stopped</p>');
    }
}

// Microphone Permission
async function requestMicrophone() {
    try {
        updateStatus('microphone-status', 'Requesting...', 'pending');
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            updateStatus('microphone-status', 'Not Supported', 'denied');
            displayData('microphone-data', '<p class="error">Microphone access is not supported by your browser</p>');
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        updateStatus('microphone-status', 'Granted', 'granted');
        
        const tracks = stream.getAudioTracks();
        const settings = tracks[0].getSettings();
        
        const data = `
            <h3>Microphone Access Granted:</h3>
            <ul>
                <li><strong>Device:</strong> ${tracks[0].label}</li>
                <li><strong>Sample Rate:</strong> ${settings.sampleRate || 'N/A'} Hz</li>
                <li><strong>Channel Count:</strong> ${settings.channelCount || 'N/A'}</li>
                <li><strong>Echo Cancellation:</strong> ${settings.echoCancellation || 'N/A'}</li>
                <li><strong>Noise Suppression:</strong> ${settings.noiseSuppression || 'N/A'}</li>
            </ul>
            <button onclick="stopMicrophone()" class="stop-btn">Stop Microphone</button>
        `;
        displayData('microphone-data', data);
        
        window.microphoneStream = stream;
    } catch (error) {
        updateStatus('microphone-status', 'Denied', 'denied');
        displayData('microphone-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

function stopMicrophone() {
    if (window.microphoneStream) {
        window.microphoneStream.getTracks().forEach(track => track.stop());
        displayData('microphone-data', '<p>Microphone stopped</p>');
    }
}

// Clipboard Permission
async function requestClipboard() {
    try {
        updateStatus('clipboard-status', 'Requesting...', 'pending');
        
        if (!navigator.clipboard) {
            updateStatus('clipboard-status', 'Not Supported', 'denied');
            displayData('clipboard-data', '<p class="error">Clipboard API is not supported by your browser</p>');
            return;
        }

        // Try to read clipboard
        const text = await navigator.clipboard.readText();
        updateStatus('clipboard-status', 'Granted', 'granted');
        
        const data = `
            <h3>Clipboard Access Granted:</h3>
            <ul>
                <li><strong>Can read clipboard:</strong> Yes</li>
                <li><strong>Can write clipboard:</strong> Yes</li>
                <li><strong>Current clipboard content:</strong> ${text || '(empty)'}</li>
            </ul>
            <button onclick="testClipboardWrite()" class="action-btn">Write Test to Clipboard</button>
        `;
        displayData('clipboard-data', data);
    } catch (error) {
        updateStatus('clipboard-status', 'Denied', 'denied');
        displayData('clipboard-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

async function testClipboardWrite() {
    try {
        await navigator.clipboard.writeText('Test text from Browser Permissions Demo');
        alert('Text written to clipboard!');
    } catch (error) {
        alert('Failed to write to clipboard: ' + error.message);
    }
}

// MIDI Permission
async function requestMIDI() {
    try {
        updateStatus('midi-status', 'Requesting...', 'pending');
        
        if (!navigator.requestMIDIAccess) {
            updateStatus('midi-status', 'Not Supported', 'denied');
            displayData('midi-data', '<p class="error">Web MIDI API is not supported by your browser</p>');
            return;
        }

        const midiAccess = await navigator.requestMIDIAccess();
        updateStatus('midi-status', 'Granted', 'granted');
        
        const inputs = Array.from(midiAccess.inputs.values());
        const outputs = Array.from(midiAccess.outputs.values());
        
        const data = `
            <h3>MIDI Access Granted:</h3>
            <ul>
                <li><strong>Input devices:</strong> ${inputs.length}</li>
                <li><strong>Output devices:</strong> ${outputs.length}</li>
                ${inputs.map(input => `<li>Input: ${input.name}</li>`).join('')}
                ${outputs.map(output => `<li>Output: ${output.name}</li>`).join('')}
            </ul>
        `;
        displayData('midi-data', data);
    } catch (error) {
        updateStatus('midi-status', 'Denied', 'denied');
        displayData('midi-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

// Motion Sensors Permission
async function requestMotionSensors() {
    try {
        updateStatus('motion-status', 'Requesting...', 'pending');
        
        if (typeof DeviceMotionEvent === 'undefined') {
            updateStatus('motion-status', 'Not Supported', 'denied');
            displayData('motion-data', '<p class="error">Motion sensors are not supported by your browser</p>');
            return;
        }

        // For iOS 13+ we need to request permission
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            const permission = await DeviceMotionEvent.requestPermission();
            if (permission !== 'granted') {
                updateStatus('motion-status', 'Denied', 'denied');
                displayData('motion-data', '<p class="error">Motion sensor permission was denied</p>');
                return;
            }
        }

        updateStatus('motion-status', 'Granted', 'granted');
        
        const dataContainer = document.createElement('div');
        dataContainer.innerHTML = `
            <h3>Motion Sensor Data:</h3>
            <div id="motion-live-data">
                <p>Waiting for sensor data...</p>
            </div>
            <button onclick="stopMotionSensors()" class="stop-btn">Stop Monitoring</button>
        `;
        displayData('motion-data', dataContainer.innerHTML);
        
        window.motionHandler = (event) => {
            const liveData = document.getElementById('motion-live-data');
            if (liveData) {
                liveData.innerHTML = `
                    <ul>
                        <li><strong>Acceleration X:</strong> ${event.acceleration?.x?.toFixed(2) || 'N/A'}</li>
                        <li><strong>Acceleration Y:</strong> ${event.acceleration?.y?.toFixed(2) || 'N/A'}</li>
                        <li><strong>Acceleration Z:</strong> ${event.acceleration?.z?.toFixed(2) || 'N/A'}</li>
                        <li><strong>Rotation Alpha:</strong> ${event.rotationRate?.alpha?.toFixed(2) || 'N/A'}°/s</li>
                        <li><strong>Rotation Beta:</strong> ${event.rotationRate?.beta?.toFixed(2) || 'N/A'}°/s</li>
                        <li><strong>Rotation Gamma:</strong> ${event.rotationRate?.gamma?.toFixed(2) || 'N/A'}°/s</li>
                    </ul>
                `;
            }
        };
        
        window.addEventListener('devicemotion', window.motionHandler);
    } catch (error) {
        updateStatus('motion-status', 'Denied', 'denied');
        displayData('motion-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

function stopMotionSensors() {
    if (window.motionHandler) {
        window.removeEventListener('devicemotion', window.motionHandler);
        displayData('motion-data', '<p>Motion sensor monitoring stopped</p>');
    }
}

// Persistent Storage Permission
async function requestPersistentStorage() {
    try {
        updateStatus('storage-status', 'Requesting...', 'pending');
        
        if (!navigator.storage || !navigator.storage.persist) {
            updateStatus('storage-status', 'Not Supported', 'denied');
            displayData('storage-data', '<p class="error">Persistent Storage API is not supported by your browser</p>');
            return;
        }

        const isPersisted = await navigator.storage.persist();
        const estimate = await navigator.storage.estimate();
        
        if (isPersisted) {
            updateStatus('storage-status', 'Granted', 'granted');
        } else {
            updateStatus('storage-status', 'Denied', 'denied');
        }
        
        const data = `
            <h3>Storage Information:</h3>
            <ul>
                <li><strong>Persistent:</strong> ${isPersisted ? 'Yes' : 'No'}</li>
                <li><strong>Usage:</strong> ${(estimate.usage / 1024 / 1024).toFixed(2)} MB</li>
                <li><strong>Quota:</strong> ${(estimate.quota / 1024 / 1024).toFixed(2)} MB</li>
                <li><strong>Percentage Used:</strong> ${((estimate.usage / estimate.quota) * 100).toFixed(2)}%</li>
            </ul>
        `;
        displayData('storage-data', data);
    } catch (error) {
        updateStatus('storage-status', 'Error', 'denied');
        displayData('storage-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

// Background Sync Permission
async function requestBackgroundSync() {
    try {
        updateStatus('background-sync-status', 'Requesting...', 'pending');
        
        if (!('serviceWorker' in navigator) || !('sync' in ServiceWorkerRegistration.prototype)) {
            updateStatus('background-sync-status', 'Not Supported', 'denied');
            displayData('background-sync-data', '<p class="error">Background Sync is not supported by your browser</p>');
            return;
        }

        updateStatus('background-sync-status', 'Supported', 'granted');
        displayData('background-sync-data', `
            <h3>Background Sync:</h3>
            <ul>
                <li><strong>API Available:</strong> Yes</li>
                <li><strong>Note:</strong> Requires a Service Worker to be registered</li>
                <li><strong>Use case:</strong> Sync data when connection is restored</li>
            </ul>
        `);
    } catch (error) {
        updateStatus('background-sync-status', 'Error', 'denied');
        displayData('background-sync-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

// Bluetooth Permission
async function requestBluetooth() {
    try {
        updateStatus('bluetooth-status', 'Requesting...', 'pending');
        
        if (!navigator.bluetooth) {
            updateStatus('bluetooth-status', 'Not Supported', 'denied');
            displayData('bluetooth-data', '<p class="error">Web Bluetooth API is not supported by your browser</p>');
            return;
        }

        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service']
        });
        
        updateStatus('bluetooth-status', 'Granted', 'granted');
        
        const data = `
            <h3>Bluetooth Device Selected:</h3>
            <ul>
                <li><strong>Device Name:</strong> ${device.name || 'Unknown'}</li>
                <li><strong>Device ID:</strong> ${device.id}</li>
                <li><strong>Connected:</strong> ${device.gatt?.connected ? 'Yes' : 'No'}</li>
            </ul>
        `;
        displayData('bluetooth-data', data);
    } catch (error) {
        updateStatus('bluetooth-status', 'Denied', 'denied');
        displayData('bluetooth-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

// USB Permission
async function requestUSB() {
    try {
        updateStatus('usb-status', 'Requesting...', 'pending');
        
        if (!navigator.usb) {
            updateStatus('usb-status', 'Not Supported', 'denied');
            displayData('usb-data', '<p class="error">WebUSB API is not supported by your browser</p>');
            return;
        }

        const device = await navigator.usb.requestDevice({ filters: [] });
        updateStatus('usb-status', 'Granted', 'granted');
        
        const data = `
            <h3>USB Device Selected:</h3>
            <ul>
                <li><strong>Product Name:</strong> ${device.productName || 'Unknown'}</li>
                <li><strong>Manufacturer:</strong> ${device.manufacturerName || 'Unknown'}</li>
                <li><strong>Serial Number:</strong> ${device.serialNumber || 'N/A'}</li>
                <li><strong>Vendor ID:</strong> ${device.vendorId}</li>
                <li><strong>Product ID:</strong> ${device.productId}</li>
            </ul>
        `;
        displayData('usb-data', data);
    } catch (error) {
        updateStatus('usb-status', 'Denied', 'denied');
        displayData('usb-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

// Idle Detection Permission
async function requestIdleDetection() {
    try {
        updateStatus('idle-status', 'Requesting...', 'pending');
        
        if (!('IdleDetector' in window)) {
            updateStatus('idle-status', 'Not Supported', 'denied');
            displayData('idle-data', '<p class="error">Idle Detection API is not supported by your browser</p>');
            return;
        }

        const permission = await IdleDetector.requestPermission();
        
        if (permission !== 'granted') {
            updateStatus('idle-status', 'Denied', 'denied');
            displayData('idle-data', '<p class="error">Idle detection permission was denied</p>');
            return;
        }

        updateStatus('idle-status', 'Granted', 'granted');
        
        const idleDetector = new IdleDetector();
        idleDetector.addEventListener('change', () => {
            const idleData = document.getElementById('idle-data');
            if (idleData) {
                idleData.innerHTML = `
                    <h3>Idle Detection Active:</h3>
                    <ul>
                        <li><strong>User State:</strong> ${idleDetector.userState}</li>
                        <li><strong>Screen State:</strong> ${idleDetector.screenState}</li>
                    </ul>
                    <button onclick="stopIdleDetection()" class="stop-btn">Stop Detection</button>
                `;
            }
        });
        
        await idleDetector.start({ threshold: 60000 });
        window.idleDetector = idleDetector;
        
        displayData('idle-data', `
            <h3>Idle Detection Started:</h3>
            <p>Monitoring your activity...</p>
        `);
    } catch (error) {
        updateStatus('idle-status', 'Error', 'denied');
        displayData('idle-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

function stopIdleDetection() {
    if (window.idleDetector) {
        window.idleDetector.stop();
        displayData('idle-data', '<p>Idle detection stopped</p>');
    }
}

// Screen Wake Lock Permission
async function requestWakeLock() {
    try {
        updateStatus('wake-lock-status', 'Requesting...', 'pending');
        
        if (!('wakeLock' in navigator)) {
            updateStatus('wake-lock-status', 'Not Supported', 'denied');
            displayData('wake-lock-data', '<p class="error">Screen Wake Lock API is not supported by your browser</p>');
            return;
        }

        const wakeLock = await navigator.wakeLock.request('screen');
        updateStatus('wake-lock-status', 'Granted', 'granted');
        
        wakeLock.addEventListener('release', () => {
            displayData('wake-lock-data', '<p>Wake lock has been released</p>');
        });
        
        const data = `
            <h3>Screen Wake Lock Active:</h3>
            <ul>
                <li><strong>Type:</strong> ${wakeLock.type}</li>
                <li><strong>Status:</strong> Active - Screen will not turn off</li>
            </ul>
            <button onclick="releaseWakeLock()" class="stop-btn">Release Wake Lock</button>
        `;
        displayData('wake-lock-data', data);
        
        window.wakeLock = wakeLock;
    } catch (error) {
        updateStatus('wake-lock-status', 'Denied', 'denied');
        displayData('wake-lock-data', `<p class="error">Error: ${error.message}</p>`);
    }
}

async function releaseWakeLock() {
    if (window.wakeLock) {
        await window.wakeLock.release();
        window.wakeLock = null;
        displayData('wake-lock-data', '<p>Wake lock released</p>');
    }
}

// Display browser information that doesn't require permissions
function displayBrowserInfo() {
    const browserInfo = document.getElementById('browser-info');
    
    const info = `
        <div class="info-item">
            <strong>User Agent:</strong>
            <p>${navigator.userAgent}</p>
        </div>
        <div class="info-item">
            <strong>Platform:</strong>
            <p>${navigator.platform}</p>
        </div>
        <div class="info-item">
            <strong>Language:</strong>
            <p>${navigator.language}</p>
        </div>
        <div class="info-item">
            <strong>Languages:</strong>
            <p>${navigator.languages.join(', ')}</p>
        </div>
        <div class="info-item">
            <strong>Online Status:</strong>
            <p>${navigator.onLine ? 'Online' : 'Offline'}</p>
        </div>
        <div class="info-item">
            <strong>Hardware Concurrency (CPU Cores):</strong>
            <p>${navigator.hardwareConcurrency || 'N/A'}</p>
        </div>
        <div class="info-item">
            <strong>Device Memory:</strong>
            <p>${navigator.deviceMemory || 'N/A'} GB</p>
        </div>
        <div class="info-item">
            <strong>Max Touch Points:</strong>
            <p>${navigator.maxTouchPoints}</p>
        </div>
        <div class="info-item">
            <strong>Cookies Enabled:</strong>
            <p>${navigator.cookieEnabled ? 'Yes' : 'No'}</p>
        </div>
        <div class="info-item">
            <strong>Do Not Track:</strong>
            <p>${navigator.doNotTrack || 'Not set'}</p>
        </div>
        <div class="info-item">
            <strong>Screen Resolution:</strong>
            <p>${screen.width} x ${screen.height}</p>
        </div>
        <div class="info-item">
            <strong>Color Depth:</strong>
            <p>${screen.colorDepth} bits</p>
        </div>
        <div class="info-item">
            <strong>Timezone:</strong>
            <p>${Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
        </div>
        <div class="info-item">
            <strong>Local Time:</strong>
            <p>${new Date().toLocaleString()}</p>
        </div>
    `;
    
    browserInfo.innerHTML = info;
}

// Auto-request all permissions on first page load
async function autoRequestPermissions() {
    // Check if permissions were already requested
    const permissionsRequested = localStorage.getItem('permissionsRequested');
    
    if (permissionsRequested === 'true') {
        // Permissions already requested in a previous session
        return;
    }
    
    // Mark that we've requested permissions
    localStorage.setItem('permissionsRequested', 'true');
    
    // Request permissions that don't require user interaction
    // We'll request them sequentially to avoid overwhelming the user
    const permissionsToRequest = [
        { name: 'Geolocation', func: requestGeolocation },
        { name: 'Notifications', func: requestNotifications },
        { name: 'Clipboard', func: requestClipboard },
        { name: 'MIDI', func: requestMIDI },
        { name: 'Persistent Storage', func: requestPersistentStorage },
        { name: 'Background Sync', func: requestBackgroundSync },
        { name: 'Idle Detection', func: requestIdleDetection },
        { name: 'Wake Lock', func: requestWakeLock }
    ];
    
    // Request permissions with a small delay between each to avoid browser throttling
    for (const permission of permissionsToRequest) {
        try {
            await permission.func();
            // Small delay to avoid overwhelming the browser
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            // Continue even if one permission fails
            console.log(`Auto-request failed for ${permission.name}:`, error);
        }
    }
}

// Initialize browser info on page load
document.addEventListener('DOMContentLoaded', () => {
    displayBrowserInfo();
    
    // Auto-request permissions on first load
    autoRequestPermissions();
});
