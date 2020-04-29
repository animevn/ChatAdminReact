import React, {createContext, useEffect, useState} from "react";
import app from "./Firebase";


export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{


  const [currentUser, setCurrentUser] = useState(null);


  useEffect(()=>{
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value ={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};