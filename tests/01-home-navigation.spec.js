const { test, expect } = require("@playwright/test");
const { EvincedSDK } = require("@evinced/js-playwright-sdk");
const fs = require("fs");

test("Home page navigation + Evinced evAnalyze", async ({ page }) => {
  // 1) Create a folder for the Evinced HTML report (if needed)
  fs.mkdirSync("evinced-reports", { recursive: true });

  // 2) Open the home page
  await page.goto("https://a11y-audits.com/");
  await expect(page.locator("body")).toBeVisible();

  // 3) Run a one-time accessibility scan
  const evinced = new EvincedSDK(page);
  const issues = await evinced.evAnalyze();

  // 4) Save the accessibility report
  await evinced.evSaveFile(
    issues,
    "html",
    "evinced-reports/home-page-report.html"
  );
});
