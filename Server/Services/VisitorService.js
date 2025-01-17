const Visitor = require('../Models/Visitors.model'); // Adjust path to your model file
const sharp = require('sharp'); // For image manipulation (if required)
const path = require('path');
const fs = require('fs');
const { sendOtp } = require('../Services/otpService'); 
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
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    // Send OTP
    await sendOtp(otpCode, mobile_number);

    // Save visitor data to database
    const newVisitor = await Visitor.create({
      name,
      address,
      gender,
      photo,  
      date_of_birth,
      mobile_number,
      pancard,
      aadhar_card_number,
      whom_to_meet,
      purpose_of_meet,
      visiting_date,
      otp: otpCode,
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
    // const imageBase64 = visitor.photo ? visitor.photo.toString('base64') : null;

    // Return visitor data along with the base64 image if available
    return {
      ...visitor.toJSON(),
      photoUrl: visitor.photo ? ` http://localhost:3000${visitor.photo}` : null,
    };
  } catch (error) {
    throw new Error('Error fetching visitor: ' + error.message);
  }
};
const getVisitorByOtp = async (otp) => {
  try {
    const visitor = await Visitor.findOne({
      where: { otp },
    });

    if (!visitor) throw new Error('Invalid OTP');

    // Check if OTP has expired
    const currentTime = new Date();
    if (visitor.otp_expires_at && visitor.otp_expires_at < currentTime) {
      throw new Error('OTP has expired');
    }

    return {
      ...visitor.toJSON(),
      photoUrl: visitor.photo ? `http://localhost:3000${visitor.photo}` : null,
    };
  } catch (error) {
    throw new Error(`Error fetching visitor: ${error.message}`);
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

// Service to update visitor's photo and other fields by mobile number
const updateVisitorByMobileNumber = async (mobileNumber, updateData, photoFile) => {
  try {
    const visitor = await Visitor.findOne({ where: { mobile_number: mobileNumber } }); // Find the visitor by mobile number
    if (!visitor) throw new Error('Visitor not found');

    // If a photo file is provided, process it
    if (photoFile) {
      const photopath = await savePhoto(photoFile); // Save the photo as a buffer
      updateData.photo = photopath; // Add the photo buffer to the update data
    }

    // Update only the fields provided in the updateData object
    const updatedVisitor = await visitor.update({
      ...updateData, // Spread the fields to update (fields can be optional)
      updated_date: new Date() // Update the `updated_date` field
    });

    return updatedVisitor;
  } catch (error) {
    throw new Error('Error updating visitor by mobile number: ' + error.message);
  }
};
const updateVisitorByOtp = async (otp, updateData, photoFile) => {
  try {
    const visitor = await Visitor.findOne({ where: { otp: otp } }); // Find the visitor by mobile number
    if (!visitor) throw new Error('Visitor not found');

    // If a photo file is provided, process it
    if (photoFile) {
      const photopath = await savePhoto(photoFile); // Save the photo as a buffer
      updateData.photo = photopath; // Add the photo buffer to the update data
    }

    // Update only the fields provided in the updateData object
    const updatedVisitor = await visitor.update({
      ...updateData, // Spread the fields to update (fields can be optional)
      updated_date: new Date() // Update the `updated_date` field
    });

    return updatedVisitor;
  } catch (error) {
    throw new Error('Error updating visitor by mobile number: ' + error.message);
  }
};

// Function to save the photo as PNG (or in any other format you prefer)
// Save photo to a specific directory
const savePhoto = async (photoFile) => {
  try {
    const photoPath = `/uploads/visitor_photos/${Date.now()}-${photoFile.originalname}`;
    const fullPath = path.join(__dirname, '..', photoPath);

    // Save the photo using Sharp
    await sharp(photoFile)
      .toFile(fullPath);

    return photoPath; // Return relative path to the saved photo
  } catch (error) {
    throw new Error('Error saving photo: ' + error.message);
  }
};

module.exports = {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
  markAsVisited,
  updateOTP,
  getVisitorByMobileNumber,
  updateVisitorByMobileNumber,
  updateVisitorByOtp,
  getVisitorByOtp
};
