const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  const specializations = [
    'History', 'Food', 'Nature', 'Photography', 'Adventure', 
    'Culture', 'Religion', 'Art', 'Music', 'Shopping' 
  ];
  res.json(specializations); 
});

module.exports = router;