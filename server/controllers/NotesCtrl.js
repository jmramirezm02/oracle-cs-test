'use strict';
const oracleConn = require('../config/oracle');

exports.get = (req, response) => {
    oracleConn.connection()
        .then(connection => {
            const query = 'select * from NOTES';
            connection.execute(query, [], (queryErr, result) => {
                const resData = {
                    success: true
                };

                if(queryErr) {
                    console.error(queryErr);
                    oracleConn.close(connection);
                }
                if (result) {
                    oracleConn.close(connection);
                    resData.notes = JSON.stringify(result.rows);
                    response.status(200).json(resData);
                } else {
                    oracleConn.close(connection);
                    resData.success = false;
                    resData.notes = [];
                    response.status(404).json(resData);
                }
            })
        })
        .catch(err => console.error(err));
};