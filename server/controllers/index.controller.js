
module.exports.renderMain = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Air Sensor',
        page: 'data'
    })
}