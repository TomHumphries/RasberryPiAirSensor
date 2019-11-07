const sensorService = require('../services/air-sensor.service');

module.exports.renderSettings = (req, res, next) => {
    var errorMessage = req.flash('error');
    var successMessage = req.flash('success');
    sensorService.getSettings()
    .then(settings => {
        res.render('settings-page', {
            pageTitle: 'Sensor Settings',
            page: 'settings',
            cpuTemp: req.cpuTemperature,
            reportingMode: settings.reportingMode,
            workingPeriod: settings.workingPeriod,
            errorMessage: errorMessage,
            successMessage: successMessage
        })
    }).catch(error => {
        // error may have occured because nothing has been set
        errorMessage += 'Error getting settings. ';
        res.render('settings-page', {
            pageTitle: 'Settings error',
            page: 'settings',
            cpuTemp: req.cpuTemperature,
            reportingMode: 'active',
            workingPeriod: 5,
            errorMessage: errorMessage,
            successMessage: successMessage
        })
    })
    
}

module.exports.postUpdateSettings = (req, res, next) => {
    console.log('postUpdateSettings', req.body);
    sensorService.updateSettings(req.body).then(() => {
        console.log('settings saved');
        req.flash('success', 'Settings saved. ');
    }).catch((error) => {
        console.log('error saving settings');
        req.flash('error', 'Error saving settings. ');
    }).finally(() => {
        res.redirect('/settings');
    })
}