const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

const cors = require("cors");
app.use(cors());

// Serve static files from the public directory
app.use(express.static(__dirname + "/public"));

// Route for serving the main HTML page
app.get("/", (req, res) => {
    res.sendFile(__dirname, "public", "index.html");
});

// Route for handling POST requests
app.post("/post", (req, res) => {
    try {
        const payload = req.body;

        // Checking if the payload is a valid JSON object
        if (typeof payload === "object" && payload !== null) {
            res.status(200).json(payload);
        } else {
            res.status(400).json({ error: 'Invalid JSON format, Please write correct JSON format.' });
        }
    } catch (error) {
        // Handleing any internal errors and send a response with status code 500
        res.status(500).json({ error: 'Internal server error!' });
    }
});

// Start the server
app.listen(PORT, () => {
    try {
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error(error.message);
    }
});


