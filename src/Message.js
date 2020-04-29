import React, {useContext} from "react";
import {AuthContext} from "./utils/Auth";

const Message = (props)=>{

  const {currentUser} = useContext(AuthContext);

  if (currentUser.uid === props.sender){
    return (

        <div className="container row d-flex ml-auto mr-0 my-3 w-75">
          <div className="border rounded-lg col-8 border-success ml-auto mr-0 flex-grow-1 p-2">
            <p className="my-auto text-justify">{props.body}</p>
          </div>
          <span className="ml-auto mr-2 my-auto">
            <img className="rounded-circle small-image mx-1 my-auto"
                 src="/images/user-check.svg" alt="me"/>
          </span>

        </div>
    )
  }else{
    return (
      <div className="container row d-flex mr-auto ml-0 my-3 w-75">
        <span className="mr-auto ml-2 my-auto">
          <img className="rounded-circle small-image mx-1 my-auto"
               src="/images/user-circle.svg" alt="you"/>
        </span>
        <div className="border rounded-lg border-success col-8 flex-grow-1 mr-5 p-2">
          <p className="my-auto text-justify">{props.body}</p>
        </div>
      </div>
    );
  };
}

export default Message;