// Stock Tracker Server
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Initialize Express app
const app = express();

// Set port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// API Routes (to be implemented)
// app.use('/api/stocks', require('./routes/stocks'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/portfolio', require('./routes/portfolio'));
// app.use('/api/watchlist', require('./routes/watchlist'));

// Mock API endpoint for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Stock Tracker API is working!' });
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});