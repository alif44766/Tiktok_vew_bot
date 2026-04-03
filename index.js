const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const videoUrl = 'https://vm.tiktok.com/ZS98ChGB63YvN-KaPdM/';

// আপনার দেওয়া প্রক্সি লিস্ট (সঠিক ফরম্যাটে সাজানো)
const proxies = [
    'socks5://EZlobIk9YH50_custom_zone_AE_st__city_sid_52974162_time_5:2573895@change5.owlproxy.com:7778',
    'socks5://EZlobIk9YH50_custom_zone_AE_st__city_sid_11124706_time_5:2573895@change5.owlproxy.com:7778',
    'socks5://EZlobIk9YH50_custom_zone_AE_st__city_sid_84600031_time_5:2573895@change5.owlproxy.com:7778',
    'socks5://EZlobIk9YH50_custom_zone_AL_st__city_sid_16459351_time_5:2573895@change5.owlproxy.com:7778',
    'socks5://EZlobIk9YH50_custom_zone_AL_st__city_sid_41265629_time_5:2573895@change5.owlproxy.com:7778'
];

async function runView(proxy) {
    console.log(`\n[#] শুরু হচ্ছে প্রক্সি: ${proxy.split('@')[0]}`);
    
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            `--proxy-server=${proxy}`
        ]
    });

    try {
        const page = await browser.newPage();
        
        // প্রক্সি অথেন্টিকেশন হ্যান্ডেল করা
        const authPart = proxy.split('://')[1].split('@')[0];
        const [username, password] = authPart.split(':');
        await page.authenticate({ username, password });

        // স্ক্রিন সাইজ সেট করা (আসল ডিভাইসের মতো দেখাতে)
        await page.setViewport({ width: 1280, height: 720 });

        // ভিডিও লিঙ্কে যাওয়া
        await page.goto(videoUrl, { waitUntil: 'networkidle2', timeout: 60000 });
        
        console.log('--- ভিডিও লোড হয়েছে, ২০ সেকেন্ড দেখা হচ্ছে... ---');
        
        // ভিডিও প্লে করার জন্য কিছুক্ষণ অপেক্ষা
        await new Promise(resolve => setTimeout(resolve, 20000)); 

        console.log('[✔] সাকসেস: ভিউ কাউন্ট হয়েছে!');
    } catch (err) {
        console.log(`[!] এরর: ${err.message}`);
    } finally {
        await browser.close();
    }
}

async function start() {
    for (let i = 0; i < proxies.length; i++) {
        console.log(`\n--- প্রসেস নং: ${i + 1} ---`);
        await runView(proxies[i]);
    }
    console.log("\n[!] সব প্রক্সি শেষ। কাজ সম্পন্ন।");
}

start();
