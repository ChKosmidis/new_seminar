from playwright.sync_api import sync_playwright, expect
import time

def verify_visual_updates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate 1920x1080
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        # Navigate to localhost
        url = "http://localhost:8080"
        print(f"Navigating to: {url}")
        page.goto(url)
        time.sleep(2) # Allow for loading and animations

        # 1. Verify Hero Stacking
        hero_section = page.locator("#root > div > section").first
        # We need to find the container with gap-y-12.
        # Note: Tailwind classes might be compiled/minified but usually class names persist in DOM unless obfuscated.
        # We look for the div containing the H1.
        hero_h1 = page.get_by_role("heading", level=1)
        hero_text_container = hero_h1.locator("..") # Parent div

        # Check class attribute
        classes = hero_text_container.get_attribute("class")
        print(f"Hero text container classes: {classes}")
        if "gap-y-12" in classes:
            print("Hero text container has correct class 'gap-y-12'")
        else:
            print("Hero text container MISSING class 'gap-y-12'")

        page.screenshot(path="verification/hero_stacking.png")
        print("Hero screenshot saved.")

        # 2. Verify AI Feedback Light Mode
        ai_section = page.locator("#ai-feedback")
        ai_section.scroll_into_view_if_needed()
        time.sleep(1)

        # Check background color
        bg_color = ai_section.evaluate("element => getComputedStyle(element).backgroundColor")
        print(f"AI Feedback Light Mode Background: {bg_color}")
        # Expecting rgb(242, 242, 238) which is #F2F2EE

        page.screenshot(path="verification/ai_feedback_light.png")
        print("AI Feedback Light Mode screenshot saved.")

        # 3. Verify CTA Button
        # The CTA section is the one with orange background
        # We can look for the button with text "Запросить участие" or translation key
        # Since we don't know the exact text (translation), let's look for the last section button
        cta_btn = page.locator("section").last.get_by_role("button")

        # Check parent container
        cta_container = cta_btn.locator("..").locator("..") # Button is in <a> which is in <div>
        # Wait, structure is div > a > button.
        # So button parent is a, a parent is div.
        cta_div = cta_btn.locator("xpath=../..")

        div_classes = cta_div.get_attribute("class")
        print(f"CTA wrapper classes: {div_classes}")

        if "mt-12" in div_classes:
             print("CTA Button container has correct class 'mt-12'")
        else:
             print("CTA Button container MISSING class 'mt-12'")

        page.screenshot(path="verification/cta_button.png")
        print("CTA screenshot saved.")

        # 4. Verify AI Feedback Dark Mode
        theme_btn = page.get_by_text("🌙") # Should be sun in light mode?
        # In light mode, the button shows "🌙" to switch to dark?
        # Code: theme === "dark" ? "🌙" : "☀️"
        # So in light mode it shows sun "☀️"?
        # Wait, usually "Switch to Dark" shows a Moon.
        # Code says: `theme === "dark" ? "🌙" : "☀️"`
        # If theme is light, it shows Sun? That seems inverted or I'm misreading.
        # Usually: Icon shows current state or target state.
        # If theme is light, I see Sun.
        # Let's try to find either.

        theme_btn = page.get_by_text("☀️")
        if theme_btn.count() == 0:
             theme_btn = page.get_by_text("🌙")

        if theme_btn.count() > 0:
            print("Clicking theme toggle...")
            theme_btn.click()
            time.sleep(1)

            ai_section.scroll_into_view_if_needed()
            time.sleep(1)

            bg_color_dark = ai_section.evaluate("element => getComputedStyle(element).backgroundColor")
            print(f"AI Feedback Dark Mode Background: {bg_color_dark}")
            # Expecting rgb(10, 10, 10) which is #0A0A0A

            page.screenshot(path="verification/ai_feedback_dark.png")
            print("AI Feedback Dark Mode screenshot saved.")
        else:
            print("Could not find theme toggle button")

        browser.close()

if __name__ == "__main__":
    verify_visual_updates()
