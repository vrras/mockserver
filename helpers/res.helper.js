'use strict';

exports.ok = function (res, msg, data) {
    const result = {
        'message': msg,
        'data': data
    };
    res.json(result);
    res.end();
};

exports.err = function (res, msg, code) {
    const result = {
        'message': msg
    };
    res.status(code).send(result);
    res.end();
};
