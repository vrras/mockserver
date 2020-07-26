const connection = require('../helpers/database.helper');

exports.queryBuilder = (res, query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data[0]);
            }
        });
    })
}