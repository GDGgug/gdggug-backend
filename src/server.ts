const express = require('express');
import { Request, Response, NextFunction } from './types';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db';
import eventRoutes from './routes/eventRoutes';
import newsRoutes from './routes/newsRoutes';
import teamRoutes from './routes/teamRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Define allowed origins
const allowedOrigins = [
  'https://www.gdggug.com',
  'https://gdggug.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://69.62.107.249:3000',
  'http://69.62.107.249:4173',
  'http://69.62.107.249:3001'
];

// CORS configuration
app.use(cors({
  origin: function(origin: any, callback: any) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Backup CORS headers for preflight requests
app.options('*', (req: Request, res: Response) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.status(200).end();
});

// Add headers to all responses as a fallback
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

// Enhanced logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

app.use(express.json());

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB successfully');

    // API Routes
    app.use('/api/events', eventRoutes);
    app.use('/api/news', newsRoutes);
    app.use('/api/team', teamRoutes);

    // Health check endpoint
    app.get('/api/health', (req: Request, res: Response) => {
      res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        cors: {
          origin: req.headers.origin,
          allowedOrigins
        }
      });
    });

    // Start server after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log('Available API endpoints:');
      console.log('- GET /api/events');
      console.log('- GET /api/news');
      console.log('- GET /api/team');
      console.log('- GET /api/health');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    console.log('Tips for troubleshooting:');
    console.log('1. Check if MONGODB_URI is correctly set in your environment');
    console.log('2. Ensure your IP is whitelisted in MongoDB Atlas');
    console.log('3. Verify the database user has correct permissions');
    process.exit(1);
  });

export default app;
