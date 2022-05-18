import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import LedgerApi from './Api/api';
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import Paths from "./routes-nav/Routes";
import ProfileForm from "./profiles/ProfileForm";
import {Route,Routes,Navigate} from "react-router-dom";
import UserList from "./User/UserList";
import LoginForm from "./auth/LoginForm";
import Profile from './profiles/Profile';
import TotalExpenses from './expenses/TotalExpenses';
import Navigation from './routes-nav/Navigation';
import ExpenseForm from './expenses/ExpenseForm';
import CurrentMonthExpenses from './expenses/CurrentMonthExpenses';
import AnnualExpenses from './expenses/AnnualExpenses';
import MonthlyExpenses from './expenses/MonthlyExpenses';
import SearchMonthly from './expenses/SearchMonthly';
import LoadingSpinner from './common/LoadingSpinner';
import SignupForm from './auth/SignupForm';
import UpdateExpense from './expenses/UpdateExpense';
import SignIn from './MUI/SignIn/SignIn';

export const TOKEN_STORAGE_ID = "ledger-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      "token=", token,
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt(token);
          // put the token on the Api class so it can use it to call the API.
          LedgerApi.token = token;
          let currentUser = await LedgerApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

    /** Handles site-wide logout. */
    function logout() {
      setCurrentUser(null);
      setToken(null);
      }
    /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
     async function signup(signupData) {
      try {
        let token = await LedgerApi.signup(signupData);
        setToken(token);
        return { success: true };
      } catch (errors) {
        console.error("signup failed", errors);
        return { success: false, errors };
      }
      }
  
    /** Handles site-wide login.
     *
     * Make sure you await this function and check its return value!
     */
    async function login(loginData) {
      try {
        let token = await LedgerApi.login(loginData);
        setToken(token);
        return { success: true };
      } catch (errors) {
        console.error("login failed", errors);
        return { success: false, errors };
      }
    }


  if (!infoLoaded) return <LoadingSpinner />;

  return (
      <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
            {/* <Paths login={login} signup={signup} /> */}
            <Navigation logout={logout} />
            <Routes login={login} signup={signup}>
                <Route exact path='/' element={<SignIn />}></Route>
                <Route exact path='/login' element={<LoginForm login={login} />}></Route>
                <Route exact path='/register' element={<SignupForm singup={signup} />}></Route>
                <Route exact path='/expenses' element={<TotalExpenses />}></Route>
                <Route path = 'expenses/year/:year' element={<AnnualExpenses />}></Route>
                <Route path = 'expenses/currentmonth' element={<CurrentMonthExpenses />}></Route>
                <Route path = 'expenses/searchmonthly' element={<SearchMonthly />}></Route>
                <Route path = 'expenses/year/:year/month/:month' element={<MonthlyExpenses />}></Route>
                <Route exact path='/expenses/add' element={<ExpenseForm />}></Route>
                <Route exact path='/profile' element = {<Profile />}></Route>
                <Route path='/:username/edit' element = {<ProfileForm />}></Route>
                <Route path = '/expenses/:username/:id' element = {<UpdateExpense />}></Route>
                <Route path="*" element={<Navigate replace to="/" />}/>
            </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
