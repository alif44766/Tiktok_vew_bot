const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const videoUrl = 'https://vm.tiktok.com/ZS98ChGB63YvN-KaPdM/';

const proxies = [
    'socks5://EZlobIk9YH50_custom_zone_AE_st__city_sid_52974162_time_5:2573895@change5.owlproxy.com:7778',
    'socks5://EZlobIk9YH50_custom_zone_AE_st__city_sid_11124706_time_5:2573895@change5.owlproxy.com:7778',
    'socks5://EZlobIk9YH50_custom_zone_AE_st__city_sid_84600031_time_5:2573895@change5.owlproxy.com:7778'
    // আপনার বাকি প্রক্সিগুলো এখানে একইভাবে যোগ করুন
];

async function runView(proxy) {
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            `--proxy-server=${proxy}`
        ]
    });

    try {
        const page = await browser.newPage();
        
        // SOCKS5 Authentication
        const auth = proxy.split('://')[1].split('@')[0];
        const [username, password] = auth.split(':');
        await page.authenticate({ username, password });

        console.log(`[+] কানেক্ট হচ্ছে: ${username}`);
        
        // টিকটক পেজে যাওয়া
        await page.goto(videoUrl, { waitUntil: 'networkidle2', timeout: 60000 });
        
        // ভিডিও লোড হওয়ার জন্য এবং ভিউ কাউন্ট হওয়ার জন্য ২০ সেকেন্ড ওয়েট
        console.log('--- ভিডিও প্লে হচ্ছে... ---');
        await new Promise(resolve => setTimeout(resolve, 20000)); 

        console.log('[✔] ভিউ সম্পন্ন হয়েছে!');
    } catch (err) {
        console.log(`[!] এরর: ${err.message}`);
    } finally {
        await browser.close();
    }
}

async function start() {
    for (let proxy of proxies) {
        await runView(proxy);
    }
}

start();
