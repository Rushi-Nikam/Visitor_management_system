const express = require('express');
const router = express.Router();
const visitorController = require('../Controllers/VisitorController');

router.post('/visitors', visitorController.createVisitor);  // Route to create a visitor and entry
router.get('/visitors', visitorController.getAllVisitors);  // Route to get all visitors
router.get('/visitors/:id', visitorController.getVisitorById);  // Route to get a specific visitor by ID
router.put('/visitors/:id', visitorController.updateVisitor);  // Route to update a visitor
router.delete('/visitors/:id', visitorController.deleteVisitor);  // Route to delete a visitor

module.exports = router;
