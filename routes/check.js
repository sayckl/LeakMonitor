const express = require('express');
const router = express.Router();
const { checkEmail } = require('../utils/hibpService');

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const result = await checkEmail(email);
    res.json(result);
  } catch (error) {
    console.error('Error checking email:', error.message);
    res.status(500).json({ error: 'Error checking email' });
  }
});

module.exports = router;
