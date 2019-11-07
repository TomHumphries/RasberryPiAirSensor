const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');
const cpuTemperature = require('../middleware/cpu-temperature.middleware');

router.get('/', cpuTemperature, settingsController.renderSettings);
router.post('/post-update', settingsController.postUpdateSettings);
router.get('**', (req, res) => {
    console.log('/settings/**');
    res.redirect('/settings');
});

module.exports = router;