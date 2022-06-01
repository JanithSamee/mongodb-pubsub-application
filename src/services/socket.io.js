const { Server } = require("socket.io");
const Chat = require("../model/Chat.model");

function createSocketServer(server) {
    const io = new Server(server, { cors: { origin: "*" }, path: "/auth" });

    io.on("connection", (socket) => {
        socket.emit("hs-001", { msg: "socket connected!" });
        console.log("user connected " + socket.id);
        socket.on("hs-client", async (data) => {
            if (data.id) {
                const chats = await Chat.find({ group: data.id });
                socket.emit("client-chats", chats);
            } else {
                socket.disconnect();
            }
        });
        socket.on("send-msg", async (data) => {
            const chats = await Chat.create(
                { group: data.id, message: data.msg, sender: data.sender },
                { new: true }
            );
            if (chats) {
                const _chats = await Chat.find({ group: data.id });
                socket.emit("client-chats", _chats);
            }
        });
        Chat.watch().on("change", async (data) => {
            const _chats = await Chat.find({
                group: socket.handshake.auth.data,
            });
            if (_chats) {
                socket.emit("client-chats", _chats);
            }
        });
    });
}

module.exports = createSocketServer;
