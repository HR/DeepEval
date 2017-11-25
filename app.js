const express = require('express'),
  app = express(),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  socketio = require('socket.io'),
  websocket = socketio(server),
  env = process.env.NODE_ENV || 'development'

/* Configuration */
if (env === 'development') {
  console.log('DEVELOPMENT env')
  app.use(errorHandler({dumpExceptions: true, showStack: true}))
  app.use(logger('dev'))
} else {
  console.log('PRODUCTION env')
  app.use(errorHandler())
  app.use(logger())
}

module.exports = app
