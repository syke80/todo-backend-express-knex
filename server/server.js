const app = require('./app.js');

const port = process.env.PORT || 5000;

async function shutdown() {
  await app.close();
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

app.listen(port, () => console.log(`Listening on port ${port}`));
