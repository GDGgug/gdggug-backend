import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if MongoDB URI is defined
if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const MONGODB_URI = process.env.MONGODB_URI;

// Log the MongoDB connection string (without credentials)
const sanitizedUri = MONGODB_URI.replace(
  /mongodb(\+srv)?:\/\/[^:]+:[^@]+@/,
  'mongodb$1://****:****@'
);
console.log('🔌 Attempting to connect to MongoDB:', sanitizedUri);

// Connection options
const options: mongoose.ConnectOptions = {
  // Add any additional options here
};

// Connect to MongoDB
export const connectToDatabase = async (): Promise<typeof mongoose> => {
  try {
    const connection = await mongoose.connect(MONGODB_URI, options);
    console.log(`✅ MongoDB connected successfully`);
    console.log(`📊 Connected to database: ${connection.connection.name}`);
    console.log(`🖥️ Database host: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('💡 Tips:');
    console.log('  1. Check if your MongoDB URI is correct');
    console.log('  2. Ensure MongoDB is running');
    console.log('  3. Check if IP whitelist includes your current IP');
    console.log('  4. Verify database user credentials');
    process.exit(1);
  }
};

// Add event listeners for connection status
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});
