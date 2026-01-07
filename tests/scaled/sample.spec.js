const { test, expect } = require("./evinced-fixture");

test("Scaled example - Evinced runs automatically", async ({ page }) => {
  await page.goto("https://a11y-audits.com/");
  await expect(page.locator("body")).toBeVisible();
});
