const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/env');


connectDB();
//TEST YML
app.listen(config.appPort, () => {
  console.log(`GetCategoryById service running on port ${config.appPort}`);
});
