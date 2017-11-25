const express = require('express'),
  app = express(),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  debug = require('debug')('server'),
  socketio = require('socket.io'),
  http = require('http'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  utils = require('./app/src/utils'),
  BASE_PATH = `${__dirname}/app`,
  ENV = process.env.NODE_ENV || 'development',
  DEFAULT_PORT = 3001

/* Configuration */
app.set('views', `${BASE_PATH}/views`)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/assets', express.static(`${BASE_PATH}/public`))

if (ENV === 'development') {
  console.log('DEVELOPMENT env')
  app.use(errorHandler({dumpExceptions: true, showStack: true}))
  app.use(logger('dev'))
} else {
  console.log('PRODUCTION env')
  app.use(errorHandler())
  app.use(logger())
}

/**
 * Get port from environment and use it for Express.
 */
const PORT = utils.normalizePort(process.env.PORT || DEFAULT_PORT)
app.set('port', PORT)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT)

/**
 * Server event handling
 */
server.on('error', (err) => {
  throw error
})
server.on('listening', (err) => {
  let addr = server.address()
  let bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port
  debug('DeepEval is alive on ' + bind)
})

const io = socketio(server);

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

// const websocket = socketio(server)

app.get('/', function (req, res) {
  res.render('index')
})

module.exports = app
