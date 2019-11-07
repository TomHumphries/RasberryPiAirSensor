const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, '../data');

class AirLogPersistence {

    static SaveReading(name, timestamp, pm10, pm2p5) {
        if (!this.LogExists(name)) {
            throw new Error(`ActiveAirLogPersistence cannot save reading: file not found`);
        }
        const cells = [];
        cells.push(timestamp);
        cells.push(pm10);
        cells.push(pm2p5);
        const filePath = path.join(dataDir, `${name}`);
        fs.appendFileSync(filePath, `${cells.join(',')}\r\n`);
    }

    static CreateLog(name) {
        console.log(`ActiveAirLogPersistence CREATING "${name}"`);

        const filePath = path.join(dataDir, `${name}`);
        if (fs.existsSync(filePath)) {
            fs.rmdirSync(filePath);
        }
        const headers = ['timestamp', '10μm', '2.5μm'];
        fs.appendFileSync(filePath, `${headers.join(',')}\r\n`);
        return;
    }

    static Rename(oldName, newName) {
        return fs.renameSync(path.join(dataDir, oldName), path.join(dataDir, newName));
    }

    static LogExists(name) {
        return fs.existsSync(path.join(dataDir, `${name}`));
    }

    static GetLogs() {
        return fs.readdirSync(dataDir);
    }

    static DeleteLog(name) {
        console.log(`ActiveAirLogPersistence DELETING ${name}`);
        const filePath = path.join(dataDir, `${name}`);
        if (fs.existsSync(filePath)) {
            fs.rmdirSync(filePath);
        }
    }

}

module.exports = AirLogPersistence