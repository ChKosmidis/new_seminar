from playwright.sync_api import sync_playwright, expect
import re

def verify_refinements():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to see the full layout
        page = browser.new_page(viewport={"width": 1400, "height": 3000})

        # Navigate to the served app
        page.goto("http://localhost:3000/")

        # 1. Verify Floating Navbar & Controls
        navbar = page.locator("nav.fixed.top-6")
        expect(navbar).to_be_visible()

        # Check for Theme Toggle (Sun/Moon icon)
        # We can check for the button that toggles theme
        theme_btn = navbar.locator("button[aria-label='Toggle theme']")
        expect(theme_btn).to_be_visible()
        print("Theme Toggle Visible")

        # Check for Language Toggle (RU/EN)
        lang_btn = navbar.locator("button[aria-label='Toggle language']")
        expect(lang_btn).to_be_visible()
        # Verify default text is RU or EN
        print(f"Language Toggle Text: {lang_btn.inner_text()}")

        # 2. Verify Hero Text Animation
        # We look for the span with variants (framer motion adds style="opacity: ...")
        # Since it's animated, we wait a bit for it to be visible
        page.wait_for_timeout(1000)
        hero_title = page.locator("h1")
        expect(hero_title).to_be_visible()

        # Check if text is split (contains spans)
        spans = hero_title.locator("span").count()
        if spans > 10:
             print(f"Hero Title is split into {spans} characters/blocks - Animation structure confirmed.")
        else:
             print("Warning: Hero Title might not be split correctly.")

        # 3. Verify Footer
        footer = page.locator("footer")
        expect(footer).to_be_visible()

        # Check for Swiss Style footer elements - Specific Selector for Brand
        brand = footer.locator("a.text-2xl.font-bold")
        expect(brand).to_be_visible()
        expect(brand).to_contain_text("NKO.MANAGEMENT")

        nav_header = footer.locator("text=Навигация")
        expect(nav_header).to_be_visible()
        print("Footer Structure Verified")

        # Take a full page screenshot
        page.screenshot(path="verification/refinement_check.png", full_page=True)
        print("Screenshot saved to verification/refinement_check.png")

        browser.close()

if __name__ == "__main__":
    verify_refinements()
