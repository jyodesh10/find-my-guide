const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Mandarin', 
    'Hindi', 'Japanese', 'Portuguese', 'Russian', 'Arabic', 
    'Nepali' 
  ]; 
  res.json(languages); 
});


module.exports = router;