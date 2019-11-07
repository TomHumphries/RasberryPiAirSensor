const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');
const cpuTemperature = require('../middleware/cpu-temperature.middleware');

router.get('/', cpuTemperature, locationController.renderLocationPage);
router.post('/', cpuTemperature, locationController.postLocation);

module.exports = router;