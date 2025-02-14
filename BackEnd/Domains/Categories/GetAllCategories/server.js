const app = require("./app");
const connectDB = require("./src/config/db");
const config = require("./src/config/env");

// Connect to MongoDB and Up the server (TEST 2)
connectDB();
app.listen(config.appPort, () => {
  console.log(` GetAllCategories service running on port ${config.appPort}`);
});
