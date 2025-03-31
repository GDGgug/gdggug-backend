"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const news_1 = __importDefault(require("./routes/news"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = express();
const port = process.env.PORT || 3001;
// Enhanced logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// CORS configuration
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://gdg-gug.vercel.app', 'https://gdg-gug-website.onrender.com', 'http://localhost:5173']
        : ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
// Connect to MongoDB
(0, db_1.connectToDatabase)()
    .then(() => {
    console.log('Connected to MongoDB successfully');
    // API Routes
    app.use('/api/events', eventRoutes_1.default);
    app.use('/api/news', news_1.default);
    app.use('/api/team', teamRoutes_1.default);
    // Health check endpoint
    app.get('/api/health', (req, res) => {
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
exports.default = app;
