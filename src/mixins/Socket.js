const WEB_SOCKET_URL = process.env.VUE_APP_WEB_SOCKET_URL;

export default {
  mounted() {
    this.socket = new WebSocket(WEB_SOCKET_URL);
    this.setUpSocket();
  },
  methods: {
    sendMessage(message) {
      this.socket.send(JSON.stringify(message));
    },
    handleMessageRecieve(event) {
      const message = JSON.parse(event.data);
      console.log('Dostaje wioadpmpsc:', message);
      this.addMessage(message);
    },
    handleSocketOpen() {
      this.addMessage({
        body: 'Socket opening...',
        date: Date.now(),
        origin: 'SERVER',
      });
    },
    handleSocketError() {
      this.addMessage({
        body: 'Cannot connect to the server...',
        date: Date.now(),
        origin: 'ERROR',
      });
    },
    setUpSocket() {
      this.socket.onopen = this.handleSocketOpen;
      this.socket.onerror = this.handleSocketError;

      this.socket.onmessage = this.handleMessageRecieve;
    },
  },
};
