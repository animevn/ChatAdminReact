import React, {useContext} from "react";
import * as firebase from "firebase/app"
import {useHistory, Redirect} from "react-router-dom";
import {AuthContext} from "./utils/Auth";

export default function Home(){

  const history = useHistory();
  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/secret" />
  }

  // const onGoogleClick = ()=>{
  //   let provider = new firebase.auth.GoogleAuthProvider();
  //   provider.addScope('profile');
  //   provider.addScope('email');
  //   firebase.auth().signInWithPopup(provider).then();
  // };

  const onGoogleClick = ()=>{
    firebase.auth().signInAnonymously().then().catch(err=>console.log(err));
  };

  function onLoginClick() {
    history.push("/login");
  }

  function onRegisterClick() {
    history.push("/register");
  }

  return (
    <div className="container">
      <img className="secret_image" src="images/key.svg" alt="key"/>
      <h1 className="text-center mb-5 text-success">Enter Secret</h1>
      <div className="row">
        <div className="btn-group group-button mx-auto col-xl-6 col-lg-7 col-md-9 col-sm-11 col-11">
          <button className="btn login-button btn-outline-success btn-lg" onClick={onRegisterClick}>
            Resgister
          </button>
          <button className="btn login-button btn-outline-success btn-lg" onClick={onLoginClick}>
            Login
          </button>
        </div>
      </div>
      <div className="row">
        <div className="mx-auto mt-3 col-xl-6 col-lg-7 col-md-9 col-sm-11 col-11">

          <button className="btn btn-outline-success btn-lg btn-block" onClick={onGoogleClick}>
            Anonymous Login
          </button>

        </div>
      </div>
    </div>
  );
};
