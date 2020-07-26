'use strict';

const response = require('../helpers/res.helper');
const { queryBuilder } = require('../helpers/query.helper');
const jwt = require('jsonwebtoken');

exports.index = function (req, res) {
    response.ok(res, "Mock Server")
};

exports.profile = function (req, res) {
    response.ok(res, 'Data profile', req.userData);
};

exports.login = async function (req, res) {
    const nik = req.body.nik;
    const pass = req.body.password;

    if (!nik) {
        return response.err(res, 'NIK is required', 400);
    }

    if (!pass) {
        return response.err(res, 'Password is required', 400);
    }

    try {
        const result = await queryBuilder(req, `SELECT * FROM user WHERE nik = '${nik}' AND password = '${pass}'`);
        if (result) {
            const token = jwt.sign({
                data: result
            }, 'm0ck53rv1c3', { expiresIn: '2d' });
            await queryBuilder(req, `INSERT INTO access_token(user_id, token) VALUES(${result.user_id}, '${token}');`)
                .catch(e => response.err(res, 'Something when wrong', 400));
            response.ok(res, 'Login successfully', token);
        } else {
            return response.err(res, 'NIK and password invalid', 400);
        }
    } catch (e) {
        return response.err(res, e.message, 400);
    }
};
