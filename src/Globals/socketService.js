var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var io = sailsIOClient(socketIOClient);
io.sails.url = 'http://' + window.SERVER_IP + window.SERVER_PORT;

module.exports = {
  getSocket (token) {
    var socket = io.socket.request.bind(io.socket);
    io.socket.request = function (options, cb) {
      options.headers = options.headers || {};
      options.headers['Authorization'] = 'JWT ' + token;
      socket(options, cb);
    };
    return io.socket;
  }
}