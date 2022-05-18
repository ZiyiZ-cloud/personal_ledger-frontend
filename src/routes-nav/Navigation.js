import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";


function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.debug("Navigation", "currentUser=", currentUser);
  
    function loggedInNav() {
      return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/expenses">
                Expenses
              </NavLink>
            </li>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={logout}>
                Log out {currentUser.user.first_name || currentUser.user.username}
              </Link>
            </li>
          </ul>
      );
    }
  
    function loggedOutNav() {
      return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item mr-4">
              <NavLink className="nav-link" to="/register">
                Sign Up
              </NavLink>
            </li>
          </ul>
      );
    }
  
    return (
        <nav className="Navigation navbar navbar-expand-md">
          <Link className="navbar-brand" to="/">
            Ledger
          </Link>
          {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
  }
  
  export default Navigation;
  