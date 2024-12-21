const VisitorEntry = require('../Models/VisitorEntry.model');

// Function to create a new visitor entry
const createVisitorEntry = async (req, res) => {
  try {
    const { visitor_Id, whom_to_meet, purpose_of_meet, created_by } = req.body;

    // Create a new VisitorEntry
    const newVisitorEntry = await VisitorEntry.create({
      visitor_Id,
      whom_to_meet,
      purpose_of_meet,
      created_by,
    });

    res.status(201).json({
      message: 'Visitor entry created successfully!',
      data: newVisitorEntry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating visitor entry' });
  }
};

// Function to get all visitor entries
const getAllVisitorEntries = async (req, res) => {
  try {
    const visitorEntries = await VisitorEntry.findAll();
    res.status(200).json(visitorEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching visitor entries' });
  }
};

const getVisitorEntryById = async (req, res) => {
  try {
    const visitorEntries = await VisitorEntry.findAll({
      where : {
        otp: req.url.id
      }
    });
    res.status(200).json(visitorEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching visitor entries' });
  }
};

// Export the functions
module.exports = { createVisitorEntry, getAllVisitorEntries, getVisitorEntryById };
