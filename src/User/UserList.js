import React, { useState, useEffect } from "react";
import LedgerApi from "../Api/api";
import UserCardList from "./UserCardList";
import Search from "../common/SearchForm";
import LoadingSpinner from "../common/LoadingSpinner";

function UserList(){
    console.debug( "UserList");

    const [users,setUsers] = useState(null);


    useEffect(function getAllUsers(){
        async function getUsers(){
            setUsers( await LedgerApi.getUsers());
        }
        getUsers();
    },[]);
    
    if(!users){ return <LoadingSpinner />}
    
    let title = "Expenses By Category";

    return (
        <div>
            <div>

            </div>
            <div>
            {/* <Search searchFor={search} /> */}
            {users.length
                ?<UserCardList users={users}/>
                :<p className="lead">Sorry, no results were found!</p>
            }
            </div>
        </div>
    )
    
  
}

export default UserList;