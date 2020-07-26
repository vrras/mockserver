const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    multer = require('multer'),
    bodyParser = require('body-parser');
const authController = require('./controllers/auth.controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

authController(app);

app.listen(port, () => {
    console.log('Mock server started on: ' + port);
});