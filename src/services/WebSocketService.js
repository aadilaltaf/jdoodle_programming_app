import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.onMessageCallback = null;
  }

  connect(token, onMessageCallback) {
    this.onMessageCallback = onMessageCallback;
    
    const sock = new SockJS('/api/v1/stomp');
    this.stompClient = webstomp.over(sock, { heartbeat: false, debug: true });

    this.stompClient.connect({ 'Authorization': `Bearer ${token}` }, (frame) => {
      console.log('WebSocket connection established', frame);

      this.stompClient.subscribe('/user/queue/execute-i', (message) => {
        this.onMessageCallback(message);
      });
    }, (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
      console.log('WebSocket connection closed');
    }
  }

  send(destination, body, options) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(destination, body, options);
    }
  }
}

export default new WebSocketService();