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
  consts = require('./consts'),
  axios = require('axios'),
  BASE_PATH = `${__dirname}/app`,
  ENV = process.env.NODE_ENV || 'development',
  DEFAULT_PORT = 3001,
  SOCKET_PORT = 8000;

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

/**
 * Init websockets
 */
const io = socketio(server);
io.listen(SOCKET_PORT);
console.log('Listening on SOCKET_PORT ', SOCKET_PORT);

io.on('connection', (client) => {
  client.on('imagePost', (imgData) => {
    console.log('image posted');
    console.log('timestamp:', imgData.timestamp)

    axios({
      method: 'post',
      url: consts.endpoints.faceAPI,
      data: imgData.uri,
      headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': process.env.SUB_KEY
        },
      params: {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false',
        'returnFaceAttributes': 'headPose,emotion,blur,exposure,noise',
      },
      })
      .then(function (response) {
        console.log(response.data);
        client.emit('results', 'Hello Man!!')
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});


// const websocket = socketio(server)

app.get('/', function (req, res) {
  res.render('index')
})

module.exports = app
