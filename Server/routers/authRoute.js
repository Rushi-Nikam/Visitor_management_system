const express = require('express');
const { body, validationResult } = require('express-validator'); // Middleware for request validation
const loginController = require('../Controllers/authController'); // Import login controller

const authRoute = express.Router();

// Middleware for validating login request body
const validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
];

// POST route for login
authRoute.post(
  '/login',
  validateLogin,
  (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next(); // Proceed to controller if validation passes
  },
  loginController
);

module.exports = authRoute;
