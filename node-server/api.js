const express = require('express')
const router = express.Router(); 
const genericController = require('./controllers/genericController')

router.get('*', function(req, res) {
  alert('inside api.js');
  genericController.getServiceData(req, res);
});

router.post('*', function(req, res) {
  genericController.postServiceData(req, res);
});

module.exports = router;