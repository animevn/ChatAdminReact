import React, {useContext, useEffect, useState} from "react";
import app from "./utils/Firebase";
import Message from "./Message";
import firebase from "./utils/Firebase";
import {AuthContext} from "./utils/Auth";
import {FirestoreContext} from "./utils/Firestore";
import {Redirect, useHistory} from "react-router-dom";

const Secret = ()=>{
  const [message, setMessage] = useState("");
  const history = useHistory();
  const {listChat, setMessages, setCurrentChat, setListChat, ip} = useContext(FirestoreContext);

  useEffect(()=>{
    const obj = document.getElementById("scroll");
    obj.scrollTop = obj.scrollHeight;
  });



  return (
    <div className="container mt-2 test">

      <div className="container border border-success px-0 rounded-lg h-75 overflow-auto"
      id="scroll">
        {listChat.map((item, index)=>{

          const onClick = ()=>{
            setCurrentChat(item.id);
            history.push("/admin-chat")
          }

          return (
            <div key={index} onClick={onClick}>
              {item.id}
            </div>
          )
        })}
      </div>

      <div className="col-xl-7 col-lg-8 col-md-9 col-sm-11 col-11 mx-auto">
        <button className="btn btn-outline-success btn-lg btn-block"
                onClick={()=>{
                  app.auth().signOut().then();
                  setMessages([]);
                  setCurrentChat(null);
                  setListChat([]);
                }}>
          Logout
        </button>
      </div>

    </div>
  );
};

export default Secret;