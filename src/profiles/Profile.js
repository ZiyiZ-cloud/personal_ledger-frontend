import React, {useState,useEffect,useContext}  from 'react';
import LedgerApi from '../Api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';
import { useNavigate } from "react-router-dom";
import PopupUser from '../common/PopDeleteUser';


function Profile(){
    const history = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [popup, setPopup] = useState({
        show: false
      });
    function handleSubmit (evt){
        evt.preventDefault();
        history(`/${currentUser.user.username}/edit`);
    }

    function deleteUser (evt){
        evt.preventDefault();
        setPopup({show:true});
    }

    if(!currentUser.user.username){
        history(`/`);
    }

    return (
        <div>
            <div>
            Username:{currentUser.user.username}
            </div>
            <div>
            First Name:{currentUser.user.first_name}
            </div>
            <div>
            Last Name:{currentUser.user.last_name}
            </div>
            <div>
            Email:{currentUser.user.email}
            </div>
            <button onClick={handleSubmit}>Edit</button>
            <button onClick={deleteUser}>Delete User</button>
            {popup.show && <PopupUser popup={popup} setPopup={setPopup} />}
        </div>
    )

}

export default Profile;