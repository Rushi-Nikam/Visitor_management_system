const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path')
const multer = require("multer");
const cors = require('cors')
const app = express();
// Middleware to parse JSON body data
app.use(bodyparser.json());
app.use(express.json());

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save files to 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid filename conflicts
    },
  });
  const upload = multer({ dest: 'uploads/' })

// POST route to add a new visitor
app.post("/add-visitor", upload.single("photo"), (req, res) => {
    const newVisitor = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        address: req.body.address,
        purposeOfMeet: req.body.purposeOfMeet,
        personToMeet: req.body.personToMeet,
        photo: req.file ? req.file.path : null, // Save the file path to the visitor object
        primaryPhone: req.body.primaryPhone,
        aadhar: req.body.aadhar,
        secondaryPhone: req.body.secondaryPhone,
        pancard: req.body.pancard,
        date: req.body.date,
      };

      const dataFilePath = path.join(__dirname, 'Visitors.json');
    // Read the existing visitors data from Visitors.json
    fs.readFile('Visitors.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading file" });
        }

        let visitors = [];

        if (data.length > 0) {
            // Parse existing visitors data if available
            visitors = JSON.parse(data);
        }

        // Add the new visitor to the list
        visitors.push(newVisitor);

        // Write the updated visitors list back to the file
        fs.writeFile("Visitors.json", JSON.stringify(visitors, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: "Error writing file" });
            }

            res.status(200).json({ message: "Visitor added successfully" });
        });
    });
});

app.get('/api/visitors', (req, res) => {
    const filePath = path.join(__dirname, 'Visitors.json');
  
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading the visitors file' });
      }
      // Send the contents of the JSON file as the response
      res.status(200).json(JSON.parse(data));
    });
  });
// Set up the server to listen on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
