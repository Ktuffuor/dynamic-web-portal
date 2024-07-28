const express = require('express'); // Imports the Express framework into the "express" constant
const app = express(); // Creates an instance of Express application called "app"
const PORT = 4000; // Defines the port number

app.use(express.urlencoded({ extended: true })); // Parses form data sent in the body of post request
app.use(express.static('public')); // Enables clients to access files in the "public" directory directly

let formDataStorage = [];

// Sends the "index.html" file located in the "public" directory as the response
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Sets the view engine for rendering dynamic content to EJS
app.set('view engine', 'ejs');
// Renders the form.ejs file using the EJS templating engine
app.get('/ejs-form', (req, res) => {
res.render('form');
});

// Server-side validation
function validateFormData(data) {
    const { fname, lname, email, country, gender, password, confirmPassword } = data;
    if (!fname || !lname || !email || !country || !gender || !password || !confirmPassword) {
        return false;
    }
    if (password !== confirmPassword) {
        return false;
    }
    return true;
}

// Handles form submission, validates data, and stores it in temporary storage
app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log("Form data received:", formData); // Log received form data
    if (validateFormData(formData)) {
        formDataStorage.push(formData); // Store validated data
        console.log("Validated form data:", formData);
        res.send('Form submitted successfully!');
    } else {
        console.log("Validation failed for form data:", formData);
        res.status(400).send('Validation failed. Please fill in all fields correctly and ensure passwords match.');
    }
});

// Route to view stored form data
app.get('/view-stored-data', (req, res) => {
    res.json(formDataStorage);
});

// Starts the Express server and listens for incoming connections on the specified PORT
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});