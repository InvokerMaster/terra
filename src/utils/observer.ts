import WebSocket from 'ws';

class Observer {
    socketUrl: string = 'wss://observer.terra.dev';
    socket: WebSocket;
    callback: (message: any) => void;

    constructor() {
        this.init();
    }

    init() {
        if (this.socket) {
            this.socket.close();
        }
        this.socket = new WebSocket(this.socketUrl);
        this.registerEvents();
    }

    registerEvents() {
        if (!this.socket) {
            return;
        }

        this.socket.onopen = () => {
          this.socket.send(JSON.stringify({subscribe: "new_block", chain_id: "columbus-4"}));
        }

        this.socket.onclose = () => {
            this.init();
        };

        this.socket.onmessage = (message) => {
            if (this.callback) {
                this.callback(JSON.parse(message.data.toString())?.data?.txs);
            }
        }
    }
}

export default Observer;