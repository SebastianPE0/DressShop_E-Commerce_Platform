const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/env');


connectDB();
//TEST YML 9
app.listen(config.appPort, () => {
  console.log(`GetCategoryById service running on port ${config.appPort}`);
});
