const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('./db/conn');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

const routes = require('./routes.js');
app.use('/', routes);

// Construct error and forward
app.use(function (req, res, next) {
    var err = new Error('File not found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Server started on port: ' + PORT);
});
