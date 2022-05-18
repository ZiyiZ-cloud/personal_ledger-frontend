import React, {useState,useEffect,useContext} from 'react';
import LedgerApi from '../Api/api';
import LoadingSpinner from '../common/LoadingSpinner'
import UserContext from '../auth/UserContext';
import ExpenseCardList from './ExpenseCardList';
import { useNavigate } from "react-router-dom";




function TotalExpenses(){

    const {currentUser, setCurrentUser} = useContext(UserContext);

    const history = useNavigate();

    const [expenses, setExpenses] = useState(null);

    const CurrentUser = currentUser.user.username;;

    useEffect(function getExpenses(){
        getUserExpenses(CurrentUser);
    },[]);

    let newDate = new Date;

    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();

    async function getUserExpenses(username){
        let result = await LedgerApi.getCurrentExpenses(username);
        console.log(result);
        setExpenses(result)
    }

    function addExpense (evt){
        evt.preventDefault();
        history(`/expenses/add`);
    }

    function currentMonth (evt){
        evt.preventDefault();
        history(`/expenses/currentmonth`);
    }

    function currentYear (evt){
        evt.preventDefault();
        history(`/expenses/year/${year}`);
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
                <button onClick={addExpense}>Add New Expense</button>
                <button onClick={currentMonth}>Current Month Expenses</button>
                <button onClick={currentYear}>Current Annual Expenses</button>
            </div>
            
        </div>
    )

}

export default TotalExpenses;