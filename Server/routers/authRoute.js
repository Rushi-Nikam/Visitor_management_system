const express = require('express');
const OtpController = require('../Controllers/otpController');


const otpRoute = express.Router();

// Route to sendOtp
otpRoute.post('/send-otp', OtpController.sendOtp);

module.exports = otpRoute;
