import React, { useEffect } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendlogo from "../../Image/send.png";

const ENDPOINT = "http://localhost:4500";

const Chat = () => {
  useEffect(() => {
    const socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      //   alert("connected");
    });
    socket.emit("joined", { user });
    socket.on("welcome", ({ user, text }) => {
      console.log(user, text);
    });

    socket.on("userJoined", ({ user, text }) => {
      console.log(user, text);
    });
    return () => {
      socket.emit("disconnect", { user });
      socket.off();
    };
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button className="sendBtn">
            <img src={sendlogo} alt="logo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
