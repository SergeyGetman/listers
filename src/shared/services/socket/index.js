import SocketClient from 'socket.io-client';
import Echo from 'laravel-echo';

const token = localStorage.getItem('token') || '';
window.io = SocketClient;

const BASE_URL = process.env.REACT_APP_API_HOST;

const socketConnect = new Echo({
  broadcaster: 'socket.io',
  host: BASE_URL,

  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

// TODO websocket service
class SocketsConnect {
  channels = {};

  constructor() {
    this.connect = socketConnect;
    this.token = token;
  }

  setAuthorizationToken(actualToken) {
    this.token = actualToken;
    this.connect.connector.options.auth.headers.Authorization = `Bearer ${actualToken}`;
  }

  getChannel(name) {
    return this.channels[name];
  }

  setChannel(name, channel) {
    this.channels[name] = channel;
  }

  removeChannel(name) {
    if (Object.prototype.hasOwnProperty.call(this.channels, name)) {
      delete this.channels[name];
    }
  }

  disconnect() {
    Object.keys(this.channels).forEach((name) => {
      // Disconnect from socket.
      this.connect.leave(name);

      // Remove channel from list.
      this.removeChannel(name);
    });
  }
}

export default new SocketsConnect();
