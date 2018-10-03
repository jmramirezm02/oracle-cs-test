'use strict';

const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve'
        }
    });

gulp.task('default', ['serve']);

gulp.task('serve', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 4000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('restarting node server...');
        })
        .on('start', function () {
            console.log('Nodemon started');
        })
});