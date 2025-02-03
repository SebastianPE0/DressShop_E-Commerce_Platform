const app = require('./app');
const connectDB = require('./src/config/db');
const config = require('./src/config/env');


connectDB();
//TEST YML 9
app.listen(config.appPort, () => {
  console.log(`GetCategoryById service running on port ${config.appPort}`);
});
