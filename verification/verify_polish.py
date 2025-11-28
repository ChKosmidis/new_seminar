from playwright.sync_api import sync_playwright, expect
import re

def verify_polish():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to see the full layout
        page = browser.new_page(viewport={"width": 1400, "height": 3000})

        # Navigate to the served app
        page.goto("http://localhost:3000/")

        # 1. Verify Floating Navbar
        navbar = page.locator("nav.fixed.top-6")
        expect(navbar).to_be_visible()
        print("Floating Navbar Visible")

        # 2. Verify Hero Animation & New Terminal
        # Check if the text actually appears (animation final state)
        hero_header = page.get_by_role("heading", name="Трёхчасовой практикум по управлению НКО")
        expect(hero_header).to_be_visible()

        # Check the new Terminal content
        terminal = page.locator("div").filter(has_text="SYSTEM_STATUS: ONLINE").first
        expect(terminal).to_be_visible()
        print("Hero Terminal with SYSTEM_STATUS Visible")

        # 3. Verify ModuleGrid Hover Effect
        # Find the card that contains "Start"
        module_card = page.locator(".group").filter(has_text="Start").first

        # Check if it has the group class for hover effects (using regex to match 'group' anywhere in class string)
        expect(module_card).to_have_class(re.compile(r"group"))

        # Hover over the card to trigger the effect for the screenshot
        module_card.hover()
        print("Hovered over Module Card")

        # 4. Verify CTA Centering
        # We can check computed styles or just rely on the screenshot visual
        cta_section = page.locator("section.bg-\\[\\#FF4500\\]")
        cta_container = cta_section.locator("div.flex-col.items-center")
        expect(cta_container).to_be_visible()
        print("CTA Centered Container Visible")

        # Take a full page screenshot
        page.screenshot(path="verification/polish_refactor.png", full_page=True)
        print("Screenshot saved to verification/polish_refactor.png")

        browser.close()

if __name__ == "__main__":
    verify_polish()
