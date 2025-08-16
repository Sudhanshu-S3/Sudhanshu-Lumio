import app from './app.js';
import config from './config/index.js';

const port = Number(config?.PORT || process.env.PORT || 3000);

const server = app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('HTTP server interrupted');
    process.exit(0);
  });
});

export default server;