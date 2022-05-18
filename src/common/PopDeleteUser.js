import {useNavigate} from 'react-router';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
import LedgerApi from '../Api/api';

function PopupUser({ popup,setPopup }) {

    const history = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);


    function backToProfile (evt){
        evt.preventDefault();
        setPopup({show: false});
        history(`/profile`);
    }

    async function deleteUser (evt){
        evt.preventDefault();
        await LedgerApi.deleteUser(currentUser.user.username);
        history(`/`);
    }

    return (
      <div className="modal">
        <div className="modal_box">
          <p>You sure you wanna delete?</p>
          <button onClick={backToProfile}>Cancel</button>
          <button onClick={deleteUser}>
            Confirm
          </button>
        </div>
      </div>
    );
  }
  
  export default PopupUser;