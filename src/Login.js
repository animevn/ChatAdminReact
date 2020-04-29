import React, {useContext} from "react";
import {AuthContext} from "./utils/Auth";
import {withRouter, Redirect} from "react-router-dom";
import app from "./utils/Firebase";

const Login = ()=>{

  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/admin-secret" />
  }

  const handleLogin = async event=>{
    event.preventDefault();
    const {email, password} = event.target.elements;
    try{
      await app.auth().signInWithEmailAndPassword(email.value, password.value);
    }catch (e) {
      alert(e);
    }
  };

  return (
    <div className="body-signin text-center">

      <form className="form-signin" onSubmit={handleLogin}>
        <img className="secret_image" src="images/key.svg" alt="key" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
               name="email" required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control"
               placeholder="Password"
               name="password" required />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);