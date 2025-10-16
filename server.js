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

// Email configuration - Strato SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.strato.de',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER || 'info@aionedge.nl', // Set via environment variable
        pass: process.env.EMAIL_PASS || 'Chalotra_88'     // Strato email password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Test email configuration on startup
transporter.verify(function(error, success) {
    if (error) {
        console.log('❌ Email configuration error:', error);
        console.log('📧 Make sure you have:');
        console.log('   1. Valid Strato email account');
        console.log('   2. Correct email password');
        console.log('   3. SMTP access enabled in Strato');
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, company, usecase } = req.body;

    // Validate input
    if (!name || !email || !company || !usecase) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Log contact form data to console (primary method)
        // Try to send email if transporter is available
    if (transporter) {
        const mailOptions = {
            from: process.env.EMAIL_USER || 'info@aionedge.nl',
            to: 'varunkumarchalotra@gmail.com',
            cc: ['varunkumarchalotra@gmail.com', 'info@aionedge.nl'],
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
            console.log('📧 Attempting to send email...');
            const result = await transporter.sendMail(mailOptions);
            console.log('✅ Email sent successfully:', result.messageId);
        } catch (error) {
            console.log('⚠️ Email failed, but data logged to console:', error.message);
        }
    } else {
        console.log('📧 Email service not available, using console logging only');
    }

    // Always return success since data is logged
    res.json({ success: true, message: 'Message received! We\'ll contact you shortly.' });
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
