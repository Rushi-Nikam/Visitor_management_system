const express = require('express');
const {createVisitorEntry ,getAllVisitorEntries} = require('../Controllers/VisitorEntryController');
const VisitorEntryRoute = express.Router();


VisitorEntryRoute.post('/visitor-entry',createVisitorEntry);
VisitorEntryRoute.get('/visitor-entries',getAllVisitorEntries);

module.exports = VisitorEntryRoute;