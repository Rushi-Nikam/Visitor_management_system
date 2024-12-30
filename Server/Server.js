require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoute = require('./routers/userRoute');
const authRoutes = require('./routers/authRoute');
const roleRoutes = require('./routers/RoleRoute');
const visitorRouter = require('./routers/VisitorsRoutes');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors()); // You may want to configure this for a specific frontend URL
app.use(express.json()); // No need for body-parser as express.json() works fine for JSON payloads

app.use(cors({
  origin: ['http://localhost:8081/'], // Replace with your React Native app's development server address
}));
// Test route

app.get('/', (req, res) => {
  res.send("hii");
});

// API routes
app.use('/api', roleRoutes);
app.use('/api/user', userRoute);
app.use('/api/visit', visitorRouter);
app.use('/api/auth', authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`SERVER is running on http://localhost:${PORT}`);
});
