import { io } from "socket.io-client";

const socket = io("localhost:5000", {
    path: "/auth",
    auth: { data: "6297a8ff2a2438fe26cccada" },
});

export default socket;
