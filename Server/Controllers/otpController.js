const sendOtpService = require('../Services/otpService'); // Import the Role model

const sendOtp = async (req, res) => {
    const { otp } = req.body;
  console.log("in send otp");
    if (!otp) {
      return res.status(400).json({ message: 'OTP name is required' });
    }
  
    try {
      const result = await sendOtpService.sendOtp(otp);
  
      return result;
    } catch (error) {
      console.error(error);
      res.send.json({ message: `Error creating role: ${error.message}` });
    }
  };

  module.exports = {sendOtp};