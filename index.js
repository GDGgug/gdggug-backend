// This file is a simple redirect to the compiled server.js file
// It's used as a fallback for deployment platforms that look for index.js by default

console.log('Starting server from index.js...');
console.log('Redirecting to compiled server at dist/server.js');

try {
  // Attempt to require the compiled server.js file
  require('./dist/server.js');
} catch (error) {
  console.error('Failed to load server:', error);
  console.error('Make sure you have run "npm run build" before starting the server');
  process.exit(1);
}
