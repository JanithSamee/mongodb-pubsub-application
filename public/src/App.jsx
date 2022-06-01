import React, { useEffect, useState } from "react";
import socket from "./services/socket.io";

function App() {
    const [chats, setchats] = useState([]);
    const [messege, setmessege] = useState("");
    useEffect(() => {
        socket.on("connect", (cc) => {
            socket.emit("hs-client", { id: "6297a8ff2a2438fe26cccada" });
            socket.on("client-chats", (data) => {
                console.log(data);
                data && setchats(data);
            });
        });
    }, []);

    const addChat = (message) => {
        socket.emit("send-msg", {
            msg: message,
            id: "6297a8ff2a2438fe26cccada",
            sender: "group",
        });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <h1>Chats</h1>
                <div
                    style={{
                        width: "40vw",
                        border: "3px solid red",
                        margin: "16px",
                    }}
                >
                    {chats.map((ch) => {
                        return (
                            <h4
                                key={ch._id}
                                style={{
                                    textAlign:
                                        ch.sender === "supervisor"
                                            ? "left"
                                            : "right",
                                }}
                            >
                                {ch.message}
                            </h4>
                        );
                    })}
                </div>
                <div>
                    <input
                        type="text"
                        value={messege}
                        onChange={(e) => {
                            setmessege(e.target.value);
                        }}
                    ></input>
                    <button
                        onClick={() => {
                            console.log("first");
                            addChat(messege);
                            setmessege("");
                        }}
                    >
                        send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
