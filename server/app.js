const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const session = require('express-session');
var flash = require('connect-flash');

// const backgroundRoutes = require('./routes/logging-background.routes');
const dataRoutes = require('./routes/data.routes');
const settingsRoutes = require('./routes/settings.routes');
const locationRoutes = require('./routes/location.routes');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// static folders to serve .js, .css, and .csv files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// sessions to provide users with error feedback on certain pages
app.use(session({
  secret: 'air-sensor-secret',
  resave: false,
  saveUninitialized: false
}))

// to flash messages
app.use(flash()); 

// routes
app.use('/logs', dataRoutes);
app.use('/settings', settingsRoutes);
app.use('/location', locationRoutes);

app.get('/test', (req, res) => {
  res.render('test/demo_worker')
})

// catch all overflow
app.use((req, res, next) => {
  // console.log('/*  ->  /logs');
  return res.redirect('/logs');
})

// app.use((err, req, res, next) => {
//   res.render('error', {
//     pageTitle: 'Error'
//   })
// }) 


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})