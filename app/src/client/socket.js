import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function imageBus(imgData, cb) {
  socket.on('results', results => cb(null, results));
  socket.emit('imagePost', imgData);
}

export default imageBus;
