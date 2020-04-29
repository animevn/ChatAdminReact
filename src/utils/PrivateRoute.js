import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "./Auth";
import {FirestoreContext} from "./Firestore";

const PrivateRoute = ({component:RouteComponent, ...rest})=>{
  const {currentUser} = useContext(AuthContext);
  const {admin} = useContext(FirestoreContext);
  return (
    <Route
      {...rest}
      render={routeProps=>currentUser ?
        (<RouteComponent {...routeProps}/>)
        : (<Redirect to={"/admin"} />)}
    />
  );
};

export default PrivateRoute;