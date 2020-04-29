import React, {useContext} from "react";
import * as firebase from "firebase/app"
import {useHistory, Redirect} from "react-router-dom";
import {AuthContext} from "./utils/Auth";

export default function Home(){

  const history = useHistory();
  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/admin-secret" />
  }

  function onLoginClick() {
    history.push("/admin-login");
  }

  return (

    <div className="container">
      <img className="secret_image" src="images/key.svg" alt="key"/>
      <h1 className="text-center mb-5 text-success">Enter Secret</h1>

      <div className="row">
        <div className="mx-auto mt-3 col-xl-6 col-lg-7 col-md-9 col-sm-11 col-11">
          <button className="btn btn-outline-success btn-lg btn-block" onClick={onLoginClick}>
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};
