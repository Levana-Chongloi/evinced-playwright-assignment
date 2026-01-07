const { setCredentials } = require("@evinced/js-playwright-sdk");

async function globalSetup() {
  await setCredentials({
    serviceId: process.env.EVINCED_SERVICE_ID,
    secret: process.env.EVINCED_API_KEY,
  });
}

module.exports = globalSetup;
