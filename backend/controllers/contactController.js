// backend/controllers/contactController.js
import asyncHandler from 'express-async-handler';

// @desc Handle contact form submission
// @route POST /api/contact
// @access Public

export const handleContactForm = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;
  
    console.log('Incoming contact:', { name, email, message }); // <-- ADD THIS
  
    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Please fill in all required fields.');
    }
  
    res.status(200).json({ message: 'Message received. We will get back to you soon!' });
  });
  