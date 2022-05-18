import React, { useState, useContext } from "react";
import LedgerApi from "../Api/api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";
import { useNavigate } from "react-router-dom";


import useTimedMessage from "../hooks/useTimedMessage";


function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
      firstName: currentUser.user.first_name,
      lastName: currentUser.user.last_name,
      email: currentUser.user.email,
      username: currentUser.user.username,
      password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    
    const history = useNavigate();

    // switch to use our fancy limited-time-display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()
  
    console.debug(
        "ProfileForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed,
    );
  
    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages and password
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */
  
    async function handleSubmit(evt) {
      evt.preventDefault();
  
      let profileData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      };
  
      let username = formData.username;
      let updatedUser;
  
      try {
        updatedUser = await LedgerApi.updateCurrentUser(username, profileData);
      } catch (errors) {
        debugger;
        setFormErrors(errors);
        return;
      }
  
      setFormData(f => ({ ...f, password: "" }));
      setFormErrors([]);
      setSaveConfirmed(true);
  
      // trigger reloading of user information throughout the site
      setCurrentUser(updatedUser);
      history(`/profile`);
    }
  
    /** Handle form data changing */
    function handleChange(evt) {
      const { name, value } = evt.target;
      setFormData(f => ({
        ...f,
        [name]: value,
      }));
      setFormErrors([]);
    }
  
    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          <h3>Profile</h3>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Username</label>
                  <p className="form-control-plaintext">{formData.username}</p>
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
                
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}
  
                {saveConfirmed
                    ?
                    <Alert type="success" messages={["Updated successfully."]} />
                    : null}
  
                <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
    );
  }
  
  export default ProfileForm;
  