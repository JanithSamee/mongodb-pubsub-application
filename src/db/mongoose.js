const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.on("open", () => console.log("DB Connected!"));
