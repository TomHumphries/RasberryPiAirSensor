const cpuTempService = require('../services/cpu-temp.service');

module.exports = (req, res, next) => {
    cpuTempService.GetCpuTemperature()
    .then(temp => {
        req.cpuTemperature = temp;
        next();
    }).catch((err) => {
        next(err);
    })
}