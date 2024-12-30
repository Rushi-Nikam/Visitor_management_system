const Visitor = require('../Models/Visitors.model'); // Adjust path to your model file

// Service to create a new visitor
const createVisitor = async ({
  name,
  address,
  gender,
  photo = null,  // Default is null if photo is not provided
  date_of_birth,
  mobile_number,
  pancard = null,  // Default is null if pancard is not provided
  aadhar_card_number = null,  // Default is null if aadhar_card_number is not provided
  whom_to_meet,
  purpose_of_meet,
  visiting_date,
  otp = null,  // Default OTP is null
  status = 'pending',  // Default status is 'pending'
  visited = 'No',  // Default visited status is 'No'
  created_by
}) => {
  try {
    const newVisitor = await Visitor.create({
      name,
      address,
      gender,
      photo,  // If not provided, it defaults to null
      date_of_birth,
      mobile_number,
      pancard,
      aadhar_card_number,
      whom_to_meet,
      purpose_of_meet,
      visiting_date,
      otp,
      status,
      visited,
      created_by
    });

    return newVisitor; // Return newly created visitor
  } catch (error) {
    throw new Error('Error creating visitor: ' + error.message);
  }
};

// Service to fetch all visitors
const getAllVisitors = async () => {
  try {
    const visitors = await Visitor.findAll(); // Fetch all visitors
    return visitors;
  } catch (error) {
    throw new Error('Error fetching visitors: ' + error.message);
  }
};

// Service to fetch a specific visitor by ID
const getVisitorById = async (id) => {
  try {
    const visitor = await Visitor.findByPk(id); // Find visitor by ID
    if (!visitor) throw new Error('Visitor not found');
    return visitor;
  } catch (error) {
    throw new Error('Error fetching visitor: ' + error.message);
  }
};

// Service to update a visitor
const updateVisitor = async (id, updateData) => {
  try {
    const visitor = await Visitor.findByPk(id); // Find the visitor by ID
    if (!visitor) throw new Error('Visitor not found');

    // Ensure photo is null if not provided in updateData
    if (!updateData.photo) {
      updateData.photo = null;
    }

    // Update only the fields provided in the updateData object
    const updatedVisitor = await visitor.update({
      ...updateData, // Spread the fields to update (fields can be optional)
      updated_date: new Date() // Update the `updated_date` field
    });

    return updatedVisitor;
  } catch (error) {
    throw new Error('Error updating visitor: ' + error.message);
  }
};

const getVisitorByMobileNumber = async (mobileNumber) => {
  try {
    const visitor = await Visitor.findOne({ where: { mobile_number: mobileNumber } }); // Find visitor by mobile number

    if (!visitor) throw new Error('Visitor not found');

    // Assuming 'photo' is a BLOB (binary data)
    const imageBase64 = visitor.photo ? visitor.photo.toString('base64') : null;

    // Return visitor data along with the base64 image if available
    return {
      ...visitor.toJSON(), // Spread the visitor data to include all other fields
      image: imageBase64 ? `data:image/png;base64,${imageBase64}` : null, // Include the base64 image
    };
  } catch (error) {
    throw new Error('Error fetching visitor: ' + error.message);
  }
};


// Service to delete a visitor
const deleteVisitor = async (id) => {
  try {
    const visitor = await Visitor.findByPk(id); // Find the visitor by ID
    if (!visitor) throw new Error('Visitor not found');
    await visitor.destroy(); // Delete visitor from the database
    return { message: 'Visitor deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting visitor: ' + error.message);
  }
};

// Service to mark a visitor as visited
const markAsVisited = async (id) => {
  try {
    const visitor = await Visitor.findByPk(id); // Find the visitor by ID
    if (!visitor) throw new Error('Visitor not found');

    const updatedVisitor = await visitor.update({
      visited: 'Yes', // Update visited status to 'Yes'
      updated_date: new Date() // Update the `updated_date` field
    });

    return updatedVisitor;
  } catch (error) {
    throw new Error('Error marking visitor as visited: ' + error.message);
  }
};

// Service to update OTP for a visitor
const updateOTP = async (id, otp) => {
  try {
    const visitor = await Visitor.findByPk(id); // Find visitor by ID
    if (!visitor) throw new Error('Visitor not found');

    const updatedVisitor = await visitor.update({
      otp, // Update OTP
      updated_date: new Date() // Update the `updated_date` field
    });

    return updatedVisitor;
  } catch (error) {
    throw new Error('Error updating OTP: ' + error.message);
  }
};
const updateVisitorByMobileNumber = async (mobileNumber,updateData,photofile) => {
  try {
    const visitor = await Visitor.findOne({ where: { mobile_number: mobileNumber } }); // Find the visitor by mobile number
    if (!visitor) throw new Error('Visitor not found');
    if(photofile){
      const photoBuffer = await savePhoto(photofile);
      updateData.photo = photoBuffer;
      return photoBuffer;
    }
    // Update only the fields provided in the updateData object
    const updatedVisitor = await visitor.update({
      ...updateData, // Spread the fields to update (fields can be optional)
      updated_date: new Date() // Update the `updated_date` field
    });
    return updatedVisitor;
  } catch (error) {
    throw new Error('Error updating visitor: ' + error.message);
  }
};
const savePhoto = async (photoFile) => {
  // Convert the photo to a Buffer (binary data)
  const buffer = await photoFile.buffer; // Assuming photoFile is a multer file (use .buffer for direct binary data)

  // You can store the buffer as binary data in your database
  return buffer;
};

module.exports = {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
  markAsVisited,
  updateOTP,
  getVisitorByMobileNumber, // Newly added service
  updateVisitorByMobileNumber // Newly added service
};
