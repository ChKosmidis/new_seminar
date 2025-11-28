from playwright.sync_api import sync_playwright, expect

def verify_home_refactor():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to see the full layout
        page = browser.new_page(viewport={"width": 1400, "height": 3000})

        # Navigate to the served app
        page.goto("http://localhost:3000/")

        # 1. Verify HomeHero (Task 1)
        hero_header = page.get_by_role("heading", name="Трёхчасовой практикум по управлению НКО")
        expect(hero_header).to_be_visible()
        print("Hero Header Visible")

        hero_btn = page.get_by_role("button", name="Начать обучение")
        expect(hero_btn).to_be_visible()
        print("Hero CTA Visible")

        # 2. Verify ModuleGrid (Task 2)
        grid_header = page.get_by_role("heading", name="Все разделы семинара")
        expect(grid_header).to_be_visible()
        print("Grid Header Visible")

        mod_1 = page.get_by_text("Start")
        expect(mod_1).to_be_visible()
        print("Module 1 Visible")

        # 3. Verify AIFeedback (Task 4)
        ai_header = page.get_by_role("heading", name="Обратная связь AI")
        expect(ai_header).to_be_visible()
        print("AI Feedback Header Visible")

        page.wait_for_timeout(2000)

        # More specific selector: Look for the 'div' inside the section with the header "Обратная связь AI"
        # Or look for text specific to that terminal if visible, e.g. "ANALYSIS COMPLETE"
        # We can also use .locator().nth(1) since we know it's the second one, but filtering is better.

        feedback_section = page.locator("section").filter(has=page.get_by_role("heading", name="Обратная связь AI"))
        terminal_content = feedback_section.locator("div.bg-\\[\\#111\\]")

        expect(terminal_content).to_be_visible()
        print("AI Terminal Box Visible")

        # 4. Verify CTA (Task 3)
        cta_text = page.get_by_role("heading", name="Хотите провести семинар для своей команды?")
        expect(cta_text).to_be_visible()
        print("CTA Header Visible")

        cta_btn = page.get_by_role("button", name="Запросить участие")
        expect(cta_btn).to_be_visible()
        print("CTA Button Visible")

        # Take a full page screenshot
        page.screenshot(path="verification/home_refactor.png", full_page=True)
        print("Screenshot saved to verification/home_refactor.png")

        browser.close()

if __name__ == "__main__":
    verify_home_refactor()
