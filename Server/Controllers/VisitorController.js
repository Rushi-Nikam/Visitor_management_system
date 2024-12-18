const Visitor = require('../Models/Visitors.model');
const VisitorEntry = require('../Models/VisitorEntry.model');

// Create a new visitor
const createVisitor = async (req, res) => {
    try {
      const { 
        name, address, gender, date_of_birth, mobile_number, photo, pancard, aadhar_card_number, created_by, whom_to_meet, purpose_of_meet 
      } = req.body;
  
      if (!name || !address || !gender || !date_of_birth || !mobile_number || !created_by || !whom_to_meet || !purpose_of_meet) {
        return res.status(400).json({ message: 'All required fields must be filled' });
      }
  
      // Create the visitor
      const newVisitor = await Visitor.create({
        name,
        address,
        gender,
        date_of_birth,
        mobile_number,
        photo,
        pancard,
        aadhar_card_number,
        created_by,
      });
  
      // After creating visitor, create a visitor entry
      await VisitorEntry.create({
        visitor_id: newVisitor.id, // link the visitor entry with the visitor
        whom_to_meet, 
        purpose_of_meet,
        created_by,
      });
  
      res.status(201).json({
        message: 'Visitor and visitor entry created successfully!',
        data: newVisitor,
      });
  
    } catch (error) {
      console.error('Error in createVisitor:', error); // Log the full error
      res.status(500).json({ message: 'Error creating visitor and entry', error: error.message }); // Include error details in the response
    }
  };

// Get all visitors
const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.findAll();
    res.status(200).json(visitors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching visitors' });
  }
};

// Get a specific visitor by ID
const getVisitorById = async (req, res) => {
  const { id } = req.params;
  try {
    const visitor = await Visitor.findByPk(id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    res.status(200).json(visitor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching visitor' });
  }
};

// Update visitor information
const updateVisitor = async (req, res) => {
    const { id } = req.params;
    const { 
      name, 
      address, 
      gender, 
      visited,
      date_of_birth, 
      mobile_number, 
      photo, 
      pancard, 
      aadhar_card_number, 
      updated_by, 
      whom_to_meet, 
      purpose_of_meet, 
      status, 
      created_by // Assuming you want to update 'created_by' too
    } = req.body;
  
    try {
      // Update Visitor Information
      const visitor = await Visitor.findByPk(id);
      if (!visitor) {
        return res.status(404).json({ message: 'Visitor not found' });
      }
  
      await visitor.update({
        name,
        address,
        gender,
        date_of_birth,
        mobile_number,
        photo,
        pancard,
        aadhar_card_number,
        updated_by,
      });
  
      // Update VisitorEntry Information
      const visitorEntry = await VisitorEntry.findOne({ where: { visitor_id: id } });
      if (!visitorEntry) {
        return res.status(404).json({ message: 'Visitor entry not found' });
      }
  
      await visitorEntry.update({
        whom_to_meet, 
        purpose_of_meet,
        visited,
        status, // Update status field
        created_by, // Optional: You can update the creator if needed
      });
  
      res.status(201).json({
        message: 'Visitor and visitor entry updated successfully!',
        data: visitor,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating visitor and entry', error: error.message });
    }
  };
  

// Delete visitor
const deleteVisitor = async (req, res) => {
  const { id } = req.params;
  try {
    const visitor = await Visitor.findByPk(id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    await visitor.destroy();
    res.status(200).json({ message: 'Visitor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting visitor' });
  }
};

module.exports = {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
};
