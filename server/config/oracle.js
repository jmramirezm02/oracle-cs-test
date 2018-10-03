'use strict';
const oracleDB = require('oracledb');
const cns = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectString: process.env.DB
};
oracleDB.createPool(cns, (err, pool) => {
    if(err) {
        console.error('Error at creating pool', err);
    }
});

const cnn = (function () {
    const cnnPromise = () => {
        return new Promise((resolve, reject) => {
            oracleDB.getConnection((poolErr, connection) => {
                if(poolErr) {
                    console.error('Error in getConnection', poolErr);
                    reject(poolErr);
                }

                resolve(connection);
            })
        });
    };

    return {
        connection: cnnPromise,
        close: connection => {
            connection.release(err => {
                if(err) {
                    console.error(err);
                }
            });
        }
    };


})();

module.exports = cnn;