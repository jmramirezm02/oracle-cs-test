'use strict';

const chai = require('chai');
const expect = require('chai').expect,
    assert = require('assert');

describe('Query validations', () => {
    after(function() {
        // process.exit();
    });

    before(function () {

    });

    it('should be invalid if ', done => {
        const user = new User();
        user.validate(function (err) {
            expect(err.errors.email).to.exist;
            done();
        })
    });
});