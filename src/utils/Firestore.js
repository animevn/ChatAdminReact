import React, {createContext, useContext, useEffect, useState} from "react";
import firebase from "./Firebase"
import {AuthContext} from "./Auth";

export const FirestoreContext = createContext(null);

export const FirestoreProvider = ({children})=>{
  const {currentUser} = useContext(AuthContext);
  const [listChat, setListChat] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [database, setDatabase] = useState("");
  const [ip, setIp] = useState("");

  //get ip info
  useEffect(()=>{
    async function getIPaddress() {
      await fetch("http://ip-api.com/json").then(response=>response.json())
      .then(async response=>{
        await setIp({ip:response.query, region:response.regionName, country:response.country});
      })
    }
    getIPaddress().then();
  }, [])

  //get chat list
  useEffect(()=>{
    async function checkAdmin() {
      if (currentUser !== null){
        const db = firebase.firestore().collection("messages");
        await db.onSnapshot(async snapshot => {
          let temp = [];
          snapshot.forEach(doc=>temp.push({id:doc.id, data:doc.data()}));
          await setListChat(temp);
        }, error => {
          console.log("error load admin: " + error);
        })
      }
    }
    checkAdmin().then();
  }, [currentUser])

  //load chat item
  useEffect(()=>{
    async function loadMessage(){
      if (currentChat){
        const db = firebase.firestore().collection("messages").doc(currentChat);
        await db.onSnapshot(doc => {
          if (doc.exists){
            setDatabase(doc.data().string);
          }
        }, error => console.log("error load db: " + error))
      }
    }
    loadMessage().then()
  }, [currentChat]);

  useEffect(()=>{
    async function populateMessages(){
      if (currentUser){
        const temp = JSON.parse(database);
        const tempList = [];
        await temp.forEach(item=>tempList.push(item));
        await setMessages(temp);
      }
    }
    populateMessages().then()

    // eslint-disable-next-line
  }, [database]);

  // useEffect(()=>{
  //   async function loadMessage(){
  //     if (currentUser){
  //       const db = firebase.firestore().collection("messages").orderBy("date");
  //       await db.onSnapshot(snapshot => {
  //         let changes = snapshot.docChanges();
  //         for (let change of changes){
  //           if (change.type === "added"){
  //             setMessages(olds=>[...olds, change.doc.data()])
  //           }
  //         }
  //       })
  //     }
  //   }
  //   loadMessage().then()
  // }, [currentUser]);

  return (
    <FirestoreContext.Provider value ={{listChat, messages, setMessages, ip,
      currentChat, setCurrentChat, setListChat}}>
      {children}
    </FirestoreContext.Provider>
  );
};