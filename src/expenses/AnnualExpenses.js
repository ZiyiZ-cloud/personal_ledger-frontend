import React, {useState,useEffect,useContext} from 'react';
import LedgerApi from '../Api/api';
import LoadingSpinner from '../common/LoadingSpinner'
import UserContext from '../auth/UserContext';
import ExpenseCardList from './ExpenseCardList';
import { useNavigate } from "react-router-dom";




function AnnualExpenses(){

    const {currentUser, setCurrentUser} = useContext(UserContext);

    const history = useNavigate();

    const [expenses, setExpenses] = useState(null);

    const CurrentUser = currentUser.user.username;;

    useEffect(function getExpenses(){
        getUserExpenses(CurrentUser);
    },[]);

    let newDate = new Date;

    let year = newDate.getFullYear();

    async function getUserExpenses(username){
        let result = await LedgerApi.getByYear(username,year);
        console.log(result);
        setExpenses(result)
    }

    function handleSubmit (evt){
        evt.preventDefault();
        history(`/expenses/add`);
    }

    if(!expenses) return <LoadingSpinner />;

    console.log(expenses.length);

    return (
        <div>
            <div>
                {expenses.expenses.length
                    ?<ExpenseCardList expenses={expenses.expenses}/>
                    :<p className="lead">Sorry, no results were found!</p>
                }
                <button onClick={handleSubmit}>Add New Expense</button>
            </div>
            
        </div>
    )

}

export default AnnualExpenses;