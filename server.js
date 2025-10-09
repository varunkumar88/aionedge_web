const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Set via environment variable
        pass: process.env.EMAIL_PASS || 'your-app-password'     // Gmail App Password
    }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, company, usecase } = req.body;

    // Validate input
    if (!name || !email || !company || !usecase) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: 'varunkumarchalotra@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h2>New Contact Form Submission - AIONedge</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Use Case:</strong> ${usecase}</p>
            <hr>
            <p><em>Submitted from AIONedge website</em></p>
        `,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for mission-vision page
app.get('/mission-vision', (req, res) => {
    res.sendFile(path.join(__dirname, 'mission-vision.html'));
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`AIONedge website is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});
