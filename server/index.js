const express = require('express');
const multer = require('multer');
const fs = require('fs');
const tf = require('@tensorflow/tfjs');
 require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const axios = require('axios');

const app = express();
const port = 5000;

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Load the MobileNet model
let model;
mobilenet.load().then((loadedModel) => {
    model = loadedModel;
});

// Function to classify image
async function classifyImage(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    const imageTensor = tf.node.decodeImage(imageBuffer);
    const predictions = await model.classify(imageTensor);
    return predictions;
}

// Function to get location from API
async function getLocation(prediction) {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${prediction}&format=json`);
    if (response.data.length > 0) {
        const { display_name, lat, lon } = response.data[0];
        return { address: display_name, latitude: lat, longitude: lon };
    } else {
        throw new Error('Location not found');
    }
}

// Express route for handling file upload and processing
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        
        const imagePath = req.file.path;
        const predictions = await classifyImage(imagePath);
        fs.unlinkSync(imagePath); // Delete the uploaded file

        const prediction = predictions[0].className; // Get the top prediction
        const location = await getLocation(prediction);

        res.json({ prediction, location });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
