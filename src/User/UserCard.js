import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";


function UserCard({username, firstName, lastName,email}){
    console.debug("UserCard");

    return (
        <div>
            <h6>{username}</h6>
            <p>{firstName}, {lastName}, {email}</p>
        </div>
    )
}

export default UserCard;