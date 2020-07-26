const connection = require('../helpers/database.helper');
const response = require('../helpers/res.helper');
const { queryBuilder } = require('../helpers/query.helper');

const middleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return response.err(res, 'Token required!', 400);
    }

    try {
        const result = await queryBuilder(res, `SELECT * FROM access_token WHERE token = '${token}' AND is_revoked = 'N'`);
        if (result) {
            req.userData = result;
            next();
        } else {
            return response.err(res, 'Token unauthorized!', 400);
        }
    } catch (e) {
        return response.err(res, e.message, 400);
    }
};

module.exports = middleware;