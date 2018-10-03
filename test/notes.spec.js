'use strict';
require('dotenv').config();
const chai = require('chai');
const expect = require('chai').expect;
const oracleDB = require('oracledb');

describe('Note validations', () => {
    after(function() {
        // process.exit();
    });

    before(function () {

    });

    it('should be invalid if title is null', done => {
        const cns = {
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            connectString: process.env.DB
        };
        oracleDB.createPool(cns, (err, pool) => {
            if(err) {
                console.error('Error at creating pool', err);
            }
            const query = 'INSERT INTO notes(title) VALUES(:title)';
            const dao = [null];
            pool.getConnection((err, cnn) => {
                // expect().to.throw();

                cnn.execute(query, dao, { autoCommit: true }, err => {
                    console.error(err);
                    expect(err).to.have.keys('errorNum', 'offset');
                    cnn.release();
                    done();
                });
            })
        });
    });
});