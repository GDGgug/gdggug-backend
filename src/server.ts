import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db';
import eventRoutes from './routes/eventRoutes';
import newsRoutes from './routes/newsRoutes';
import teamRoutes from './routes/teamRoutes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Enhanced logging middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://gdg-gug.vercel.app', 'https://gdg-gug-website.onrender.com', 'http://localhost:5173'] 
    : ['http://localhost:5173', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

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
    app.get('/api/health', (req: express.Request, res: express.Response) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
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
