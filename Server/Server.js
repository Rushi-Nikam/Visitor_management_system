require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoute = require('./routers/userRoute');
const authRoutes = require('./routers/authRoute');
const roleRoutes = require('./routers/RoleRoute');
const visitorRouter = require('./routers/VisitorsRoutes');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3000;

// // CORS Configuration
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN || 'http://localhost:8081', // You can load this from the .env file
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
// };

app.use(cors());  // Apply CORS middleware with dynamic options

// Body Parsing Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Test route
app.get('/', (req, res) => {
  res.send('Hello, welcome to the API!');
});

// API Routes
app.use('/api', roleRoutes);
app.use('/api/user', userRoute);
app.use('/api/visit', visitorRouter);
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.stack}`);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`SERVER is running on http://localhost:${PORT}`);
});
