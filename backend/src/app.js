import express from 'express';
import cors from 'cors';
import summaryRoutes from './api/routes/summary.routes.js';
import shareRoutes from './api/routes/share.routes.js';

const app = express();

// load frontend origins from env (comma-separated), fall back to default localhost
const envOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(',').map(s => s.trim())
  : [];
const allowedOrigins = ['http://localhost:3000', ...envOrigins].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('CORS policy: origin not allowed'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
}));
app.use(express.json());


//Setup testing
app.get('/', (req,res) => {
    res.status(200).json({message:'AI Summarizer Backend is running!'});
})


app.use('/api/summary', summaryRoutes);
app.use('/api/share', shareRoutes);

export default app;