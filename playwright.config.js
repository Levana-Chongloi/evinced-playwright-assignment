const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  globalSetup: require.resolve("./global.setup.js"),
  testDir: "./tests",
  use: {
    baseURL: "https://a11y-audits.com",
    screenshot: "on",
    trace: "on-first-retry",
  },
  reporter: [["html", { open: "never" }], ["list"]],
});
