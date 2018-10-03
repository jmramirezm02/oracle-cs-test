'use strict';
const oracleDB = require('oracledb');

const cnn = (function () {
    const cns = {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectString: process.env.DB
    };

    const cnnPromise = () => {
        return new Promise((resolve, reject) => {
            oracleDB.createPool(cns, (err, pool) => {
                if(err) {
                    console.error('Error at createPool', err);
                    reject(err);
                }

                pool.getConnection((poolErr, connection) => {
                    if(poolErr) {
                        console.error('Error in getConnection', poolErr);
                        reject(poolErr);
                    }

                    resolve(connection);
                })
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