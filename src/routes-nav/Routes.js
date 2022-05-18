import React from 'react';
import {Routes, Route, Navigate} from 'react-router';
import Homepage from '../homepage/Homepage';
import PrivateRoute from './PrivateRoute';
import ProfileForm from '../profiles/ProfileForm';
import UserList from '../User/UserList';
import LoginForm from '../auth/LoginForm';
import Profile from '../profiles/Profile';

function Paths({login, signup}){
    console.debug(
        "Routes",
        `login=${typeof login}`,
    );

    return (
        <div className="pt-5">
            <Routes>
                <Route exact path='/' element={<UserList />}></Route>
                <Route exact path='/login' element={<LoginForm login={login} />}></Route>
                {/* <Route exact path='/:username'><Profile /></Route> */}
                {/* <Route exact path='/:username' element={<Profile />}></Route> */}
                <Route exact path='/:username' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>

        </div>
    )
}

export default Paths;