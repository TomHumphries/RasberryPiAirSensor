var temp; 
var opsys = process.platform;

if (opsys == 'linux') {
    temp = require("pi-temperature");
} else {
    console.log('NOT RUNNING ON LINUX');
}

module.exports.GetCpuTemperature = () => {
    return new Promise((resolve, reject) => {
        if (!temp) {
            return resolve('N/A');
        }
        temp.measure(function(err, temp) {
            if (err) {
                console.error('GetCpuTemperature error', err);
                return reject(err);
            }
            else {
                return resolve(temp);
            } 
        });

    })
}