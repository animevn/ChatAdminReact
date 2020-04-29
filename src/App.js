import React from "react";
import Header from "./main/Header"
import Footer from "./main/Footer";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {AuthProvider} from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Secret from "./Secret";
import {FirestoreProvider} from "./utils/Firestore";

const App = ()=>{

  return (
   <AuthProvider>
     <Router>
       <div className="main">
         <div className="container-fluid px-0">
           <Header/>
           {/*App code is below here*/}

           <Route exact path="/" component={Home}/>
           <Route exact path="/login" component={Login}/>
           <Route exact path="/register" component={Register}/>
           <FirestoreProvider>
             <PrivateRoute exact path="/secret" component={Secret}/>
           </FirestoreProvider>

           {/*Appcode is up here*/}
         </div>
         {/*<Footer/>*/}
       </div>
     </Router>
   </AuthProvider>
  );
};

export default App;
