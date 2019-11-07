module.exports.yearAndMonth = (date) => {
    return date.toISOString().split('T')[0].substring(0, 7);
}