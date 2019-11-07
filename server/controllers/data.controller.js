const dataService = require('../services/data.service');

module.exports.RenderListOfData = (req, res, next) => {
    const files = dataService.GetFiles();
    return res.render('data/data-files-page', {
        pageTitle: 'Data measurements',
        page: 'logs',
        dataLogging: dataService.Logging(),
        cpuTemp: req.cpuTemperature,
        files: files,
        liveMeasurement: dataService.ActiveFileName()
    })
}
module.exports.RenderChart = (req, res, next) => {
    console.log('render chart');
    const fileId = req.params.fileId;
    var exists = dataService.FileExists(fileId);
    if (!exists) {
        return res.redirect('/logs');
    }
    res.render('data/data-file-page', {
        pageTitle: 'High resolution measurement',
        page: 'logs',
        cpuTemp: req.cpuTemperature,
        measuring: dataService.Logging(),
        liveMeasurement: dataService.ActiveFileName(),
        file: fileId
    })
}

module.exports.PostEditData = async (req, res, next) => {
    const oldName = req.params.fileId;
    console.log('PostEditData', req.body);
    dataService.RenameFile(oldName, req.body.fileName)
    .then((name) => {
        return res.redirect(`/logs/${name}`);
    })
    .catch(() => {
        return res.redirect(`/logs/${oldName}`);        
    })
}

module.exports.StartHighRes = (req, res, next) => {
    const filename = req.query.file;
    if (dataService.FileExists(filename)) {
        console.log('resuming read')
        dataService.ResumeRead(filename)
        .then(() => {
            res.redirect(`/logs/${filename}`)            
        })
    } else {
        console.log('starting new read')
        dataService.StartNewRead()
        .then(filename => {
            console.log('filename', filename);
            return res.redirect(`/logs/${filename}`)
        })
    }
}
module.exports.StopHighRes = (req, res, next) => {
    const fileId = req.query.file;
    dataService.EndRead();
    return res.redirect(`/logs/${fileId}`);
}