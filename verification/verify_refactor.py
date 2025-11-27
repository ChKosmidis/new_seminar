from playwright.sync_api import sync_playwright

def verify_home_refactor():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to see the full layout and Swiss Grid effect
        page = browser.new_page(viewport={"width": 1920, "height": 1080})

        try:
            # Navigate to the home page
            page.goto("http://localhost:5173")

            # Wait for main element to ensure loading
            page.wait_for_selector('h1', timeout=10000)

            # --- Hero Section Screenshot ---
            # Wait for animation
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/refactor_hero.png")
            print("Hero screenshot saved.")

            # --- Scroll to Program Grid ---
            # Using the section ID
            page.locator('#sections-map').scroll_into_view_if_needed()
            page.wait_for_timeout(1000) # Wait for animation
            page.screenshot(path="verification/refactor_program_grid.png")
            print("Program Grid screenshot saved.")

            # --- Scroll to AI Feedback ---
            page.locator('#ai-feedback').scroll_into_view_if_needed()
            page.wait_for_timeout(1000)
            # Try to force dark mode if possible or just check default
            # Taking screenshot of AI feedback
            page.screenshot(path="verification/refactor_ai_feedback.png")
            print("AI Feedback screenshot saved.")

            # --- Dark Mode Check ---
            # Find the theme toggle and click it
            toggle = page.locator('button[aria-label="Switch to dark mode"], button.themeToggle')
            # Assuming the aria-label might be different based on current state, let's try a selector based on the module css if needed
            # But based on code: aria-label={theme === "dark" ? ... : ...}
            # Let's try clicking the button in the header
            page.locator('header button').last.click() # Usually theme toggle is last
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/refactor_dark_mode.png")
            print("Dark mode screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_home_refactor()
