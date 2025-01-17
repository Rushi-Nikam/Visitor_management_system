const express = require('express');
const VisitorController = require('../Controllers/VisitorController');

const upload = require('../Middleware/upload');
const router = express.Router();
// Set up multer storage (e.g., save in memory for file handling)

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Route to create a new visitor
router.post('/visitors', VisitorController.createVisitor);

// Route to fetch all visitors
router.get('/visitors', VisitorController.getAllVisitors);

// Route to fetch a specific visitor by ID
router.get('/visitors/:id', VisitorController.getVisitorById);

// Route to fetch a visitor by mobile number
router.get('/visitor/:mobileNumber',upload.single('photo'), VisitorController.getVisitorByMobileNumber);
router.get('/visitor/otp/:otp',upload.single('photo'), VisitorController.getVisitorByOtp);

// Route to update visitor information by ID
router.put('/visitors/:id', VisitorController.updateVisitor);

// Route to update a visitor by mobile number (with optional photo upload)
router.put('/visitor/:mobileNumber', upload.single('photo'), VisitorController.updateVisitorByMobileNumber);

router.put('/visitor/otp/:otp', upload.single('photo'), VisitorController.updateVisitorByOtp);

// Route to mark a visitor as visited by ID
router.put('/visitors/:id/mark-visited', VisitorController.markAsVisited);

// Route to update OTP for a visitor by ID
router.put('/visitors/:id/update-otp', VisitorController.updateOTP);

// Route to delete a visitor by ID
router.delete('/visitors/:id', VisitorController.deleteVisitor);

module.exports = router;
