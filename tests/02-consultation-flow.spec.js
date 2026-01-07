const { test, expect } = require("@playwright/test");
const { EvincedSDK } = require("@evinced/js-playwright-sdk");
const fs = require("fs");

test.setTimeout(90000);

test("Consultation flow + validations + continuous Evinced scan", async ({ page }) => {
  // 1) Create a folder for the Evinced HTML reports (if it doesn't exist)
  fs.mkdirSync("evinced-reports", { recursive: true });

  // 2) Start Evinced continuous scanning (so it captures all page states)
  const evinced = new EvincedSDK(page);
  await evinced.evStart();

  try {
    // 3) Open the website in a desktop-size window
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("https://a11y-audits.com/");
    await expect(page.locator("body")).toBeVisible();

    // 4) Click the Consultation button/link
    const consultation = page.locator("a,button", { hasText: /consultation/i }).first();
    await expect(consultation).toBeVisible({ timeout: 15000 });
    await consultation.click();

    // 5) Click the "Next" step button 
    const nextButton = page
      .locator("button,input[type='submit']")
      .filter({ hasText: /next|continue|submit|book|schedule/i })
      .first();

    await expect(nextButton).toBeVisible({ timeout: 15000 });
    await nextButton.click();

    // 6) Validate that the error messages exist in the page HTML
    const errorIds = ["#name-error", "#email-error", "#phone-error"];
    const errorTexts = [
      /full name is required/i,
      /email address is required/i,
      /phone number is required/i,
    ];

    for (let i = 0; i < errorIds.length; i++) {
      const error = page.locator(errorIds[i]);
      await expect(error).toContainText(errorTexts[i]);
      await expect(error).toHaveAttribute("aria-hidden", "true");
    }
  } finally {

    // 7) Always stop scanning and save the HTML report (even if the test fails)
    const issues = await evinced.evStop().catch(() => []);
    await evinced.evSaveFile(
      issues,
      "html",
      "evinced-reports/consultation-flow-report.html"
    );
  }
});
