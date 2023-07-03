import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendlogo from "../../Image/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "http://localhost:4500";

let socket;

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setmessages] = useState([]);
  const send = () => {
    socket.emit("message", {
      message: document.getElementById("chatInput").value,
      id,
    });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      //   alert("connected");
      setid(socket.id);
    });
    socket.emit("joined", { user });
    socket.on("welcome", ({ user, text }) => {
      setmessages([...messages, { user, text }]);
      console.log(user, text);
    });

    socket.on("userJoined", ({ user, text }) => {
      setmessages([...messages, { user, text }]);
      console.log(user, text);
    });

    socket.on("leave", ({ user, text }) => {
      setmessages([...messages, { user, text }]);
      console.log(user, text);
    });

    return () => {
      socket.emit("disconnnect", { user });
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on("sendMessage", ({ user, message, id }) => {
      setmessages([...messages, { user, message, id }]);
      console.log(user, message, id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, index) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">
            <img src={sendlogo} alt="logo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
