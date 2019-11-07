const sensor = require('../airsensor/sds011-sensor');

class SensorService {
    static getSettings() {
        console.log('getSettings()');
        return new Promise((resolve, reject) => {
            var reportingMode;
            var workingPeriod;
            sensor.getReportingMode()
            .then(mode => {
                reportingMode = mode;
                return sensor.getWorkingPeriod()
            }).then(period => {
                workingPeriod = period;
                return resolve({reportingMode, workingPeriod});
            }).catch( (error) => {
                console.log('getSettings catch');
                return reject({reportingMode: 'active', workingPeriod: 5})
            })
        })
    }
    static updateSettings(settings) {
        return new Promise((resolve, reject) => {
            sensor.setReportingMode(settings.reportingMode)
            .then(() => {
                return sensor.setWorkingPeriod(+settings.workingPeriod);
            }).then(() => {
                return resolve();
            }).catch((error) => {
                console.log('updateSettings error', error);
                return reject(error);
            })
        })
    }

}

module.exports = SensorService;