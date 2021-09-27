"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
class Observer {
    constructor() {
        this.socketUrl = 'wss://observer.terra.dev';
        this.init();
    }
    init() {
        if (this.socket) {
            this.socket.close();
        }
        this.socket = new ws_1.default(this.socketUrl);
        this.registerEvents();
    }
    registerEvents() {
        if (!this.socket) {
            return;
        }
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({ subscribe: "new_block", chain_id: "columbus-4" }));
        };
        this.socket.onclose = () => {
            this.init();
        };
        this.socket.onmessage = (message) => {
            var _a, _b;
            if (this.callback) {
                this.callback((_b = (_a = JSON.parse(message.data.toString())) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.txs);
            }
        };
    }
}
exports.default = Observer;
//# sourceMappingURL=observer.js.map