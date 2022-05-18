import React from 'react';
import UserCard from './UserCard';

function UserCardList({users}){

    console.log("UserCardList","users=",users);

    return (
        <div>
            {users.map(user =>(
                <UserCard 
                    username={user.username}
                    firstName={user.first_name}
                    lastName={user.last_name}
                    email={user.email}
                    />
            ))}
        </div>
    )

}

export default UserCardList;