const server = require('./app');
const config = require('dotenv').config();

const PORT = process.env.APP_PORT || 80;

server.listen(PORT).then(({ url }) => {
  console.log(`GraphQL Gateway running at ${url}`);
});
