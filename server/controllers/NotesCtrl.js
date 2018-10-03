'use strict';
const oracleConn = require('../config/oracle');

/**
 * Returns the rows in the notes table
 * @param req
 * @param response
 */
exports.get = (req, response) => {
    oracleConn.connection()
        .then(connection => {
            const query = 'select * from NOTES';
            const dao = [];
            executePromise(connection, query, dao, false)
                .then(result => sendResponse(result, response))
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

/**
 * Inserts a new row in the notes table
 * @param req
 * @param res
 */
exports.post = (req, res) => {
    const data = {};

    if(req.body.title) {
        data.title = req.body.title;
    }

    oracleConn.connection()
        .then(connection => {
            const query = 'INSERT INTO notes(title) VALUES(:title)';
            const dao = [data.title];
            executePromise(connection, query, dao, true)
                .catch(err => console.error('Insert error: ', err))
                .then(result => sendResponse(result, res))
        })
};

/**
 * Executes a query using the oracle pool connection
 * @param connection
 * @param query
 * @param dao
 * @param dml
 * @returns {Promise<any>}
 */
const executePromise = (connection, query, dao, dml) => {
    return new Promise((resolve, reject) => {
        connection.execute(query, dao, { autoCommit: dml }, (queryErr, result) => {
            if(queryErr) {
                console.error('queryErr: ', queryErr);
                reject(query);
            }
            if (result) {
                resolve(result);
            } else {
                resolve([]);
            }
            oracleConn.close(connection);
        })
    })
};

/**
 * Sends the response to the client
 * @param result
 * @param response
 */
function sendResponse(result, response) {
    const resData = {
        success: true
    };

    if (result) {
        if(typeof result.rows !== 'undefined' && result.rows.length > 0) {
            resData.notes = JSON.stringify(result.rows);
        }
        response.status(200).json(resData);
    } else {
        resData.success = false;
        resData.notes = [];
        response.status(404).json(resData);
    }
}