const sensor = require('../airsensor/sds011-sensor');
const logPersistence = require('../persistence/log-persistence');

var openFileName = '';
var measurementActive = false;

class DataLoggingService {
    
    static Logging() {
        return measurementActive;
    }
    static ActiveFileName() {
        return openFileName;
    }

    static StartNewRead() {
        return new Promise((resolve, reject) => {
            console.log('starting read');
            if (measurementActive) {
                console.log('Measurement already active. Starting new reading.');
            }
            openFileName = getNewFileName();
            console.log('new file name: ', openFileName);
            measurementActive = true;
            logPersistence.CreateLog(openFileName);
            resolve(openFileName);
        })
    }

    static EndRead() {
        console.log('ending read');
        measurementActive = false;
        openFileName = '';
        return;
    }

    static async ResumeRead(name) {
        if (logPersistence.LogExists(name)) {
            measurementActive = true;
            openFileName = name;
        }
        return;
    }
    
    static RenameFile(oldName, newName) {
        return new Promise((resolve, reject) => {
            if (!newName || newName.length == 0) {
                console.log('no name sent');
                return reject();
            }
            if (!newName.endsWith('.csv')) {
                newName += '.csv';
            }
            if (logPersistence.LogExists(newName)) {
                console.log('name already exists');
                return reject();
            }
            logPersistence.Rename(oldName, newName);
            return resolve(newName);
        })
    }

    static GetFiles() {
        return logPersistence.GetLogs();
    }
    static FileExists(name) {
        return logPersistence.LogExists(name);
    }

}

function getNewFileName() {
    var name = new Date().toISOString().split('.')[0]+"Z" // ISO string without milliseconds
    name = name.split(':').join('');
    name = `${name}.csv`;
    return name;
}

// when a new reading comes in...
sensor.on('reading', r => {
    if (!measurementActive) {
        return;
    }
    console.log('active logging event', r);
    const cells = [];
    const timestamp =  new Date().toISOString();
    logPersistence.SaveReading(openFileName, timestamp, r.pm10, r.pm2p5);
    // cells.push(timestamp);
    // cells.push(r.pm10);
    // cells.push(r.pm2p5);
    // const filePath = path.join(dataDir, `${openFileName}`);
    // fs.appendFileSync(filePath, `${cells.join(',')}\r\n`);
});


module.exports = DataLoggingService