require('dotenv').config();
const axioses = require('axios');
// const http = require('https');


const sendOtp = async (otp) => {
    let body = {
        "route": "q",
        "message": "Otp " + otp + " visitor invitation at PR tech",
        "schedule_time": null,
        "flash": 0,
        "numbers": "8796618992",
    }

    await axioses({
        method: 'post',
        url: process.env.SMS_URL,
        data: body,
        headers: {
            "authorization": process.env.KEY,
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};

module.exports = {sendOtp};