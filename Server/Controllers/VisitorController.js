const VisitorService = require('../Services/VisitorService');

// Create a new visitor
const createVisitor = async (req, res) => {
  try {
    const visitorData = req.body;
    const newVisitor = await VisitorService.createVisitor(visitorData);
    res.status(201).json({
      message: 'Visitor created successfully',
      data: newVisitor
    });
  } catch (error) {
    console.error('Error in createVisitor:', error);
    res.status(500).json({ message: 'Error creating visitor', error: error.message });
  }
};

// Fetch all visitors
const getAllVisitors = async (req, res) => {
  try {
    const visitors = await VisitorService.getAllVisitors();
    res.status(200).json(visitors);
  } catch (error) {
    console.error('Error in getAllVisitors:', error);
    res.status(500).json({ message: 'Error fetching visitors', error: error.message });
  }
};

// Get a specific visitor by ID
const getVisitorById = async (req, res) => {
  const { id } = req.params;
  try {
    const visitor = await VisitorService.getVisitorById(id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    res.status(200).json(visitor);
  } catch (error) {
    console.error('Error in getVisitorById:', error);
    res.status(500).json({ message: 'Error fetching visitor', error: error.message });
  }
};

// Get a visitor by mobile number
const getVisitorByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const visitor = await VisitorService.getVisitorByMobileNumber(mobileNumber);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    res.status(200).json(visitor);
  } catch (error) {
    console.error('Error in getVisitorByMobileNumber:', error);
    res.status(500).json({ message: 'Error fetching visitor', error: error.message });
  }
};

// Update visitor information
const updateVisitor = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // Ensure the 'photo' field is explicitly set to null if not present in the updateData
    if (!updateData.hasOwnProperty('photo')) {
      updateData.photo = null;
    }

    const updatedVisitor = await VisitorService.updateVisitor(id, updateData);
    res.status(200).json({
      message: 'Visitor updated successfully',
      data: updatedVisitor,
    });
  } catch (error) {
    console.error('Error in updateVisitor:', error);
    res.status(500).json({
      message: 'Error updating visitor',
      error: error.message,
    });
  }
};

// Update visitor by mobile number
const updateVisitorByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;
  const updateData = req.body;

  try {
    // Handle the photo if it exists in the request
    let photoFile = null;
    if (req.files && req.files.photo) {
      // Assuming the photo field name is 'photo' in the form-data
      photoFile = req.files.photo;
    }

    // Call the service function to update the visitor
    const updatedVisitor = await VisitorService.updateVisitorByMobileNumber(mobileNumber, updateData, photoFile);
    
    res.status(200).json({
      message: 'Visitor updated successfully',
      data: updatedVisitor,
    });
  } catch (error) {
    console.error('Error in updateVisitorByMobileNumber:', error);
    res.status(500).json({
      message: 'Error updating visitor',
      error: error.message,
    });
  }
};


// Delete visitor
const deleteVisitor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await VisitorService.deleteVisitor(id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in deleteVisitor:', error);
    res.status(500).json({ message: 'Error deleting visitor', error: error.message });
  }
};

// Mark a visitor as visited
const markAsVisited = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVisitor = await VisitorService.markAsVisited(id);
    res.status(200).json({
      message: 'Visitor marked as visited successfully',
      data: updatedVisitor
    });
  } catch (error) {
    console.error('Error in markAsVisited:', error);
    res.status(500).json({ message: 'Error marking visitor as visited', error: error.message });
  }
};

// Update OTP for a visitor
const updateOTP = async (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;
  try {
    const updatedVisitor = await VisitorService.updateOTP(id, otp);
    res.status(200).json({
      message: 'OTP updated successfully',
      data: updatedVisitor
    });
  } catch (error) {
    console.error('Error in updateOTP:', error);
    res.status(500).json({ message: 'Error updating OTP', error: error.message });
  }
};

module.exports = {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  getVisitorByMobileNumber, // Newly added method
  updateVisitor,
  updateVisitorByMobileNumber, // Newly added method
  deleteVisitor,
  markAsVisited,
  updateOTP
};
