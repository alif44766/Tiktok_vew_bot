const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const videoUrl = 'https://vm.tiktok.com/ZS98ChGB63YvN-KaPdM/';

const rawProxies = [
    'socks5://change5.owlproxy.com:7778:EZlobIk9YH50_custom_zone_AE_st__city_sid_52974162_time_5:2573895',
    'socks5://change5.owlproxy.com:7778:EZlobIk9YH50_custom_zone_AE_st__city_sid_11124706_time_5:2573895',
    'socks5://change5.owlproxy.com:7778:EZlobIk9YH50_custom_zone_AE_st__city_sid_84600031_time_5:2573895',
    'socks5://change5.owlproxy.com:7778:EZlobIk9YH50_custom_zone_AL_st__city_sid_16459351_time_5:2573895',
    'socks5://change5.owlproxy.com:7778:EZlobIk9YH50_custom_zone_AL_st__city_sid_41265629_time_5:2573895'
];

async function runView(rawProxy) {
    // প্রক্সি ডাটা আলাদা করা (Host:Port এবং User:Pass)
    const parts = rawProxy.split(':');
    const proxyHost = `${parts[1].replace('//', '')}:${parts[2]}`;
    const proxyUser = parts[3];
    const proxyPass = parts[4];

    console.log(`\n[#] কানেক্ট হচ্ছে: ${proxyHost} (User: ${proxyUser})`);

    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            `--proxy-server=socks5://${proxyHost}` // এখানে শুধু হোস্ট ও পোর্ট থাকবে
        ]
    });

    try {
        const page = await browser.newPage();
        
        // প্রক্সি ইউজার ও পাসওয়ার্ড দিয়ে লগ-ইন
        await page.authenticate({
            username: proxyUser,
            password: proxyPass
        });

        await page.setViewport({ width: 1280, height: 720 });
        
        // ভিডিও লিঙ্কে যাওয়া
        await page.goto(videoUrl, { waitUntil: 'networkidle2', timeout: 60000 });
        
        console.log('--- ভিডিও দেখা হচ্ছে (২০ সেকেন্ড)... ---');
        await new Promise(resolve => setTimeout(resolve, 20000)); 

        console.log('[✔] সাকসেস!');
    } catch (err) {
        console.log(`[!] এরর: ${err.message}`);
    } finally {
        await browser.close();
    }
}

async function start() {
    for (let i = 0; i < rawProxies.length; i++) {
        console.log(`\n--- প্রসেস নং: ${i + 1} ---`);
        await runView(rawProxies[i]);
    }
    console.log("\n[!] কাজ শেষ।");
}

start();
