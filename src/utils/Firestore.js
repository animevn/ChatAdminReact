import React, {createContext, useContext, useEffect, useState} from "react";
import firebase from "./Firebase"
import {AuthContext} from "./Auth";

export const FirestoreContext = createContext(null);

export const FirestoreProvider = ({children})=>{
  const {currentUser} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [database, setDatabase] = useState("");
  const [ip, setIp] = useState("");

  useEffect(()=>{
    async function getIPaddress() {
      await fetch("http://ip-api.com/json").then(response=>response.json())
      .then(async response=>{
        await setIp({ip:response.query, region:response.regionName, country:response.country});
      })
    }
    getIPaddress().then();
  }, [])

  useEffect(()=>{
    async function loadMessage(){
      if (currentUser){
        const db = firebase.firestore().collection("messages").doc(currentUser.uid);
        await db.onSnapshot(doc => {
          if (doc.exists){
            setDatabase(doc.data().string);
          }
        })
      }
    }
    loadMessage().then()
  }, [currentUser]);

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
    <FirestoreContext.Provider value ={{messages, setMessages, ip}}>
      {children}
    </FirestoreContext.Provider>
  );
};