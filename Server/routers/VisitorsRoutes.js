const express = require('express');
const {createVisitorEntry ,getAllVisitorEntries} = require('../Controllers/VisitorEntryController');
const router = express.Router();


router.post('/visitor-entry',createVisitorEntry);
router.get('/visitor-entries',getAllVisitorEntries);

module.exports = router;