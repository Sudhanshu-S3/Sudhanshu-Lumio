import express from 'express';
import cors from 'cors';
import summaryRoutes from './api/routes/summary.routes.js';
import shareRoutes from './api/routes/share.routes.js';

const app = express();

// Parse FRONTEND_ORIGIN env (comma or space separated). Supports wildcard like https://*.vercel.app
function parseOriginsFromEnv() {
  const raw = process.env.FRONTEND_ORIGIN || '';
  return raw
    .split(/[,\s]+/)
    .map(s => s.trim())
    .filter(Boolean);
}
function patternToRegex(pattern) {
  // escape regex, then make "*" match one subdomain level
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '[^.]+');
  return new RegExp(`^${escaped}$`);
}

const defaultLocal = ['http://localhost:3000'];
const originPatterns = parseOriginsFromEnv();
const originRegexes = originPatterns.filter(p => p.includes('*')).map(patternToRegex);
const exactOrigins = originPatterns.filter(p => !p.includes('*'));
const allowedList = [...defaultLocal, ...exactOrigins];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // curl / server-to-server
    const allowed =
      allowedList.includes(origin) ||
      originRegexes.some(rx => rx.test(origin));
    return callback(null, allowed);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
};

if (process.env.NODE_ENV !== 'test') {
  console.log('CORS allowlist:', JSON.stringify(allowedList), 'patterns:', originPatterns.filter(p => p.includes('*')));
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // explicit preflight
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