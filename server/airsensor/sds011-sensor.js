const SDS011Client = require('sds011-client');
const portPath = '/dev/ttyUSB0';
const sensor = new SDS011Client(portPath);

console.log('INITIALISING SDS011 AIR SENSOR');

module.exports = sensor;