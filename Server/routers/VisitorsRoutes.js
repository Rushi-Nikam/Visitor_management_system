const express = require('express');
const router = express.Router();
const VisitorController = require('../Controllers/VisitorController');
const multer = require('multer');

// Set up multer storage (e.g., save in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to create a new visitor
router.post('/visitors', VisitorController.createVisitor);

// Route to fetch all visitors
router.get('/visitors', VisitorController.getAllVisitors);

// Route to fetch a specific visitor by ID
router.get('/visitors/:id', VisitorController.getVisitorById);

// Route to update visitor information
router.put('/visitors/:id', VisitorController.updateVisitor);

// Route to delete a visitor
router.delete('/visitors/:id', VisitorController.deleteVisitor);

// Route to fetch a visitor by mobile number
router.get('/visitor/:mobileNumber', VisitorController.getVisitorByMobileNumber);

// Route to update a visitor by mobile number (with optional photo upload)
router.put('/visitor/:mobileNumber', upload.single('photo'), VisitorController.updateVisitorByMobileNumber);

// Route to mark a visitor as visited
router.put('/visitors/:id/mark-visited', VisitorController.markAsVisited);

// Route to update OTP for a visitor
router.put('/visitors/:id/update-otp', VisitorController.updateOTP);

module.exports = router;
