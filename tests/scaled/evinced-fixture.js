const base = require("@playwright/test");
const { EvincedSDK } = require("@evinced/js-playwright-sdk");
const fs = require("fs");

fs.mkdirSync("evinced-reports", { recursive: true });

const test = base.test.extend({
  page: async ({ page }, use, testInfo) => {
    if (process.env.EVINCED_ENABLED !== "true") return use(page);

    const ev = new EvincedSDK(page);
    await ev.evStart();

    try {
      await use(page);
    } finally {
      const issues = await ev.evStop().catch(() => []);
      const name = testInfo.title.replace(/[^\w-]+/g, "_");
      await ev.evSaveFile(issues, "html", `evinced-reports/${name}.html`);
    }
  },
});

module.exports = { test, expect: base.expect };
