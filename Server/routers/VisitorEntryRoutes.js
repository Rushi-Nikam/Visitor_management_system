const express = require('express');
const {createVisitorEntry ,getAllVisitorEntries, getVisitorEntryByOtp} = require('../Controllers/VisitorEntryController');
const VisitorEntryRoute = express.Router();


VisitorEntryRoute.post('/visitor-entry',createVisitorEntry);
VisitorEntryRoute.get('/visitor-entries',getAllVisitorEntries);
VisitorEntryRoute.get('/visitor-entries/:id',getVisitorEntryByOtp);

module.exports = VisitorEntryRoute;