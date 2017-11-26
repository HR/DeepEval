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
    // TODO: send for analysis
    // console.log(imgData.uri)
    // if (typeof Buffer.from === "function") {
    // // Node 5.10+
    //     buf = Buffer.from(imgData.uri, 'base64'); // Ta-da
    // } else {
    //     // older Node versions
    //     buf = new Buffer(imgData.uri, 'base64'); // Ta-da
    // }

    console.log('imgData: ',imgData);

    // axios({
    //   method: 'post',
    //   url: consts.endpoints.faceAPI,
    //   data: {url: "https://i2.wp.com/www.pituitaryworldnews.org/wp-content/uploads/2014/10/Fotolia_48571549_Subscription_Monthly_M.jpg?fit=1378%2C1378"},
    //   headers: {
    //         'Content-Type': 'application/octet-stream',
    //         // 'Content-Type': 'application/json',
    //         'Ocp-Apim-Subscription-Key': '05692e05d5994a2ba4053c9cbd1d65d5'
    //     },
    //   params: {
    //     'returnFaceId': 'true',
    //     'returnFaceLandmarks': 'false',
    //     'returnFaceAttributes': 'headPose,emotion,blur,exposure,noise',
    //   },
    //   })
    //   .then(function (response) {
    //     console.log(response.body);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  });
});


// const websocket = socketio(server)

app.get('/', function (req, res) {
  res.render('index')
})

module.exports = app
