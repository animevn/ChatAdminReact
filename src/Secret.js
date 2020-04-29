import React, {useContext, useEffect, useState} from "react";
import app from "./utils/Firebase";
import Message from "./Message";
import firebase from "./utils/Firebase";
import {AuthContext} from "./utils/Auth";
import {FirestoreContext} from "./utils/Firestore";

const Secret = ()=>{
  const {currentUser} = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const {messages, setMessages, ip} = useContext(FirestoreContext);

  useEffect(()=>{
    const obj = document.getElementById("scroll");
    obj.scrollTop = obj.scrollHeight;
  });

  const handleSend = event=>{
    event.preventDefault();
    const body = event.target.value;
    setMessage(body);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      onSendClick(event);
    }
  };

  const onSendClick = (event)=>{
    event.preventDefault();
    if (message.length > 0){
      const time = (new Date()).getTime();
      const temp = [...messages, {sender: currentUser.uid, body:message, date:time}];
      const stringTemp = JSON.stringify(temp);
      const db = firebase.firestore().collection("messages").doc(currentUser.uid);
      db.set({string:stringTemp}).then(()=>console.log("success")).catch(err=>console.log(err));
      setMessage("");
    }
  };

  return (
    <div className="container mt-2 test">

      <div className="container border border-success px-0 rounded-lg h-75 overflow-auto"
      id="scroll">
        {messages.map((item, index)=>{
          return <Message key={index} sender={item.sender} body={item.body}/>
        })}
      </div>

      <form className="container fixed-bottom mb-5"
            onSubmit={onSendClick}
            onKeyDown={handleKeyDown}>
        <div className="input-group input-group-lg col-xl-7 col-lg-8
          col-md-9 col-sm-11 col-11 mb-3 mx-auto">
          <input type="text" className="form-control border-success" placeholder="Your message"
                 aria-label="chat" name="message" onChange={handleSend} value={message}

          />
          <div className="input-group-append">
            <button className="btn btn-outline-success" type="submit">
              Send
            </button>
          </div>
        </div>

        <div className="col-xl-7 col-lg-8 col-md-9 col-sm-11 col-11 mx-auto">
          <button className="btn btn-outline-success btn-lg btn-block"
            onClick={()=>{
              app.auth().signOut().then();
              setMessages([]);
            }}>
            Logout
          </button>
        </div>
      </form>

    </div>
  );
};

export default Secret;