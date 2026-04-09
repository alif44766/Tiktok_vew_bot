import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def run_tiktok_bot():
    video_url = "https://www.tiktok.com/@waliullah3949/video/7626670219246734613"
    user_agent = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
    
    chrome_options = Options()
    chrome_options.add_argument("--headless") # গিটহাবের জন্য মাস্ট
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument(f"user-agent={user_agent}")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    # কুকিজ সেটআপ
    driver.get("https://www.tiktok.com")
    time.sleep(5)
    
    # আপনার দেওয়া কুকিজ ডাটা
    cookies = [
        {'name': 's_v_web_id', 'value': 'verify_mnr83x5a_pxmg9ARm_wqNr_4Cuu_9KCG_q1OKhSsRuy0H', 'domain': '.tiktok.com'},
        {'name': 'tt_ticket_guard_has_set_public_key', 'value': '1', 'domain': '.tiktok.com'},
        {'name': 'tiktok_webapp_theme', 'value': 'dark', 'domain': '.tiktok.com'}
    ]

    for cookie in cookies:
        driver.add_cookie(cookie)

    driver.refresh()
    time.sleep(5)

    # ২ বার লুপ চলবে
    for cycle in range(2):
        print(f"Cycle {cycle + 1} starting...")
        
        # ৫০টি ট্যাব (৫টি ব্যাচে ১০টি করে ট্যাব যাতে ক্র্যাশ না করে)
        for batch in range(5): 
            print(f"Opening batch {batch + 1} (10 tabs)...")
            for i in range(10):
                driver.execute_script(f"window.open('{video_url}', '_blank');")
            
            time.sleep(5) # ৫ সেকেন্ড ভিডিও চলবে

            # নতুন ট্যাবগুলো বন্ধ করা
            handles = driver.window_handles
            for handle in handles[1:]:
                driver.switch_to.window(handle)
                driver.close()
            driver.switch_to.window(handles[0])
            
        print(f"Cycle {cycle + 1} completed.")

    driver.quit()

if __name__ == "__main__":
    run_tiktok_bot()
    
