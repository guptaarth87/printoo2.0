const express = require('express');
const Feedback = require('../models/feedbackModel'); // Import the Feedback model
const router = express.Router();

// POST /feedback
router.post('/feedback', async (req, res) => {
  const { email, subject, description, rating } = req.body;

  try {
    // Create a new feedback entry in the database
    const feedback = new Feedback({
      email,
      subject,
      description,
      rating,
    });

    // Save feedback to MongoDB
    await feedback.save();

    // Respond with a success message
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    // Respond with an error message in case of failure
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
});

// GET /feedback - Retrieve all feedback
router.get('/feedback', async (req, res) => {
    try {
      // Retrieve all feedback from the database
      const feedbacks = await Feedback.find();
      
      // Respond with the feedback data
      res.status(200).json(feedbacks);
    } catch (error) {
      // Respond with an error message in case of failure
      res.status(500).json({ message: 'Failed to retrieve feedback' });
    }
  });

  
  // DELETE /feedback/:id - Delete feedback by ID
router.delete('/feedback/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the feedback by ID and delete it
      const deletedFeedback = await Feedback.findByIdAndDelete(id);
  
      // If no feedback found, return a 404 error
      if (!deletedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
  
      // Respond with a success message
      res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      // Respond with an error message in case of failure
      res.status(500).json({ message: 'Failed to delete feedback' });
    }
  });
  

module.exports = router;
