'use strict'

const gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  env = require('gulp-env')

function runCommand (command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout)
      console.log(stderr)
      cb(err)
    })
  }
}

/*
 * GULP tasks
 */

gulp.task('default', ['nodemon'])

/* Development */
gulp.task('nodemon', function (cb) {
  var called = false
  env({
    file: '.env'
  })
  return nodemon({
    script: './spawn.js',
    watch: ['./**/*.js'],
    ignore: [
      'test/',
      'node_modules/'
    ],
  })
    .on('start', function onStart () {
      // ensure start only got called once
      if (!called) { cb() }
      called = true
    })
    .on('restart', function onRestart () {
      console.log('NODEMON: restarted server!')

    })
})
