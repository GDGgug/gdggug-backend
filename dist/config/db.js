"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Check if MongoDB URI is defined
if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}
const MONGODB_URI = process.env.MONGODB_URI;
// Log the MongoDB connection string (without credentials)
const sanitizedUri = MONGODB_URI.replace(/mongodb(\+srv)?:\/\/[^:]+:[^@]+@/, 'mongodb$1://****:****@');
console.log('🔌 Attempting to connect to MongoDB:', sanitizedUri);
// Connection options
const options = {
// Add any additional options here
};
// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        const connection = await mongoose_1.default.connect(MONGODB_URI, options);
        console.log(`✅ MongoDB connected successfully`);
        console.log(`📊 Connected to database: ${connection.connection.name}`);
        console.log(`🖥️ Database host: ${connection.connection.host}`);
        return connection;
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        console.log('💡 Tips:');
        console.log('  1. Check if your MongoDB URI is correct');
        console.log('  2. Ensure MongoDB is running');
        console.log('  3. Check if IP whitelist includes your current IP');
        console.log('  4. Verify database user credentials');
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
// Add event listeners for connection status
mongoose_1.default.connection.on('connected', () => {
    console.log('✅ MongoDB connected successfully');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
});
mongoose_1.default.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
});
