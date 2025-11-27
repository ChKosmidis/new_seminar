from playwright.sync_api import sync_playwright

def verify_home_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to local server
            page.goto("http://localhost:5173/")

            # Wait for main element to ensure load
            page.wait_for_selector("h1")

            # Wait a bit for animations (revealing text)
            page.wait_for_timeout(2000)

            # Take screenshot of the Hero section
            page.screenshot(path="verification/home_hero.png")
            print("Screenshot saved to verification/home_hero.png")

            # Scroll down to see other sections (Ticker, Stats, Modules)
            page.evaluate("window.scrollTo(0, 800)")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/home_ticker_stats.png")
            print("Screenshot saved to verification/home_ticker_stats.png")

            page.evaluate("window.scrollTo(0, 1600)")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/home_modules.png")
            print("Screenshot saved to verification/home_modules.png")

            page.evaluate("window.scrollTo(0, 3000)")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/home_ai_feedback.png")
            print("Screenshot saved to verification/home_ai_feedback.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_home_page()
