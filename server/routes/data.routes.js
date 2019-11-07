const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');
const cpuTemperature = require('../middleware/cpu-temperature.middleware');

router.get('/', cpuTemperature, dataController.RenderListOfData);
router.get('/:fileId', cpuTemperature, dataController.RenderChart);
router.post('/:fileId/post-edit', dataController.PostEditData);
router.post('/post-start', dataController.StartHighRes);
router.post('/post-stop', dataController.StopHighRes);

module.exports = router;