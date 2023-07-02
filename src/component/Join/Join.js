import React, { useState } from "react";
import "./Join.css";
import logo from "../../Image/chat.png";
import { Link } from "react-router-dom";

let user;

const Join = () => {
  const [name, setname] = useState("");

  const sentUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
  };

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Chat Crow</h1>
        <input
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter your name ..."
          type="text"
          id="joinInput"
        />
        <Link
          onClick={(event) =>
            event.target.value === "" ? event.preventDefault : null
          }
          to="/chat"
        >
          <button type="submit" onClick={sentUser} className="joinbtn">
            Login In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
