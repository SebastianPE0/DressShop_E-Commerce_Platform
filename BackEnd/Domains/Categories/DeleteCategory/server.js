const app = require("./app");
const config = require("./src/config/env");

app.listen(config.port, () => {
  console.log(`✅ DeleteCategory Service running on port ${config.port}`);
});
