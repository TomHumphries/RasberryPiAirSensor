module.exports.renderLocationPage = (req, res, next) => {
    res.render('location-page', {
        pageTitle: 'Location test',
        cpuTemp: req.cpuTemperature,
        page:'location'
    });
}
module.exports.postLocation = (req, res, next) => {
    console.log('postLocation', req.body);
    return res.send();
}