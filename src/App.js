import React from "react";
import Header from "./main/Header"
import Footer from "./main/Footer";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {AuthProvider} from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import Secret from "./Secret";
import {FirestoreProvider} from "./utils/Firestore";
import ChatItem from "./ChatItem";

const App = ()=>{

  return (
   <AuthProvider>
     <Router>
       <div className="main">
         <div className="container-fluid px-0">
           <Header/>
           {/*App code is below here*/}

           <Route exact path="/admin" component={Home}/>
           <Route exact path="/admin-login" component={Login}/>
           <FirestoreProvider>
             <PrivateRoute exact path="/admin-secret" component={Secret}/>
             <PrivateRoute exact path="/admin-chat" component={ChatItem}/>
           </FirestoreProvider>

           {/*Appcode is up here*/}
         </div>
         <Footer/>
       </div>
     </Router>
   </AuthProvider>
  );
};

export default App;
