require("dotenv").config();
const app = require("./app");
const http = require("http");
const createSocketServer = require("./services/socket.io");
const server = http.createServer(app);
createSocketServer(server);

const PORT = process.env.PORT || 5050;

server.listen(PORT, () => console.log("Server listening on " + PORT));
