import io from 'socket.io-client'
import { SERVER } from './pages/config'

// const EVENT_JOIN_ROOM = 'join-room'
// const EVENT_LEAVE_ROOM = "leave-room";
// const EVENT_LIST_LIVE_STREAM = "list-broadcast";
// const EVENT_BEGIN_LIVE_STREAM = "begin-broadcast";
// const EVENT_FINISH_LIVE_STREAM = "done-broadcast";
// const EVENT_SEND_HEART = "send-heart";
// const EVENT_SEND_MESSAGE = "send-message";
// const EVENT_PREPARE_LIVE_STREAM = "prepare-broadcast";
// const EVENT_SEND_REPLAY = "replay";

class SocketManager {

    socket = null;

    constructor() {
        if (SocketManager.instance) {
            return SocketManager.instance
        }
        SocketManager.instance = this

        this.socket = io.connect(SERVER, { autoConnect: false });
        this.setupListenDefaultEvents();
        return this
    }

    setupListenDefaultEvents() {
        this.socket.on('connect', () => console.log('socket connected'));
        this.socket.on('disconnect', () => console.log('socket disconnected'));
        this.socket.on('reconnect', () => console.log('socket reconnected'))
    }

    connectAfterLogin() {
        this.socket.open()
    }

    emitPrepareLiveStream({ title, body }) {
        this.socket.emit("prepare-broadcast", { title, body });
    }

    emitJoinRoom({ title, nickName }) {
        this.socket.emit("join-room", { title, nickName })
    }

    emitLeaveRoom({ title, nickName }) {
        this.socket.emit("leave-room", { title, nickName })
    }

    listenSendChat(callback = () => null) {
        this.socket.on("send-message", (data) => {
            console.log(data)
            callback(data)
        })
    }

    listenSendHeart(callback = () => null) {
        this.socket.on("send-heart", (data) => {
            console.log('heart coming')
            callback()
        })
    }

    emitSendChat({ nickName, message, title }) {
        this.socket.emit("send-message", { nickName, message, title })
    }

    emitSendHeart({ title }) {
        this.socket.emit("send-heart", { title })
    }
}

const instance = new SocketManager();
export default SocketManager