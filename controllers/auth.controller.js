'use strict';

module.exports = function (app) {
    const authService = require('../services/auth.service');
    const authMiddleware = require('../middleware/auth.middleware');

    app.route('/')
        .get(authService.index);

    app.route('/login')
        .post(authService.login);

    // Use Middleware
    app.use(authMiddleware);
    app.route('/profile')
        .get(authService.profile);

};