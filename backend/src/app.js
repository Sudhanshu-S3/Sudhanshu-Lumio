import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import summaryRoutes from './api/routes/summary.routes.js';
import shareRoutes from './api/routes/share.routes.js';

// Allow only known origins (Vercel + local dev + env-provided)
const allowList = new Set([
  'https://sudhanshu-lumio.vercel.app',
  'http://localhost:3000',
  ...(Array.isArray(config?.ALLOWED_ORIGINS) ? config.ALLOWED_ORIGINS : []),
]);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // server-to-server or curl
    if (allowList.has(origin)) return cb(null, true);
    return cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400,
  optionsSuccessStatus: 204,
};

// Mount CORS BEFORE any routes
const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());


// Health
app.get('/', (req, res) => {
  res.status(200).json({ message: 'AI Summarizer Backend is running!' });
});

app.use('/api/summary', summaryRoutes);
app.use('/api/share', shareRoutes);

// Optional: JSON error for CORS denials/others
app.use((err, req, res, next) => {
  if (err && err.message && err.message.toLowerCase().includes('cors')) {
    return res.status(403).json({ error: 'CORS policy: origin not allowed' });
  }
  next(err);
});

export default app;