import React, {useState,useEffect,useContext} from 'react';
import LedgerApi from '../Api/api';
import LoadingSpinner from '../common/LoadingSpinner'
import UserContext from '../auth/UserContext';
import ExpenseCardList from './ExpenseCardList';
import { useNavigate,useParams } from "react-router-dom";
import LineChart from '../common/MonthlyLineChart';
import PieChart from '../common/MonthlyPieChart';
import Balance from '../common/Balance';

function MonthlyExpenses(){

    const {currentUser, setCurrentUser} = useContext(UserContext);

    let {year, month} = useParams()

    const history = useNavigate();

    const [expenses, setExpenses] = useState(null);

    const [spending,setSpending] = useState(null);
    const [saving,setSaving] = useState(null);
    const [totalIncome,setTotalIncome] = useState(null);
    const [TotalExpense,setTotalExpense] = useState(null); 

    const CurrentUser = currentUser.user.username;

    useEffect(function getExpenses(){
        getUserExpenses(CurrentUser);
        getUserMonthlySaving(CurrentUser);
        getUserMonthlySpending(CurrentUser);
        getMonthlyTotalIncome(CurrentUser);
        getMonthlyTotalExpense(CurrentUser);
        console.log(spending,saving)
    },[]);

    async function getUserExpenses(username){
        let result = await LedgerApi.getByMonth(username,year,month);
        setExpenses(result)
    }
    async function getUserMonthlySpending(username){
        let result = await LedgerApi.getExpensesByDay(username,year,month);
        setSpending(result)
    }
    async function getUserMonthlySaving(username){
        let result = await LedgerApi.getIncomesByDay(username,year,month);
        setSaving(result)
    }
    async function getMonthlyTotalIncome(username){
        let result = await LedgerApi.getMonthlyTotalIncome(username,year,month);
        setTotalIncome(result)
    }
    async function getMonthlyTotalExpense(username){
        let result = await LedgerApi.getMonthlyTotalExpense(username,year,month);
        setTotalExpense(result)
    }


    function addExpense (evt){
        evt.preventDefault();
        history(`/expenses/add`);
    }

    function searchMonthly(evt){
        evt.preventDefault();
        
        history(`/expenses/searchmonthly`);
    }

    if(!expenses) return <LoadingSpinner />;
    if(!totalIncome) return <LoadingSpinner />;
    if(!TotalExpense) return <LoadingSpinner />;

    let title = `${year} - ${month} Expenses`;

    return (
        <div>
            <div>
                {expenses.expenses.length
                    ?   <div>
                        <PieChart username={CurrentUser} year={year} month={month} chartTitle={title}/>
                        <LineChart username={CurrentUser} year={year} month={month} chartTitle={title}/>
                        <Balance totalIncome={totalIncome} totalExpense={TotalExpense}/>
                        <ExpenseCardList expenses={expenses.expenses}/>
                        </div>
                    :<p className="lead">Sorry, no results were found!</p>
                }
                <button onClick={addExpense}>Add New Expense</button>
                <button onClick={searchMonthly}>Search By Month</button>
            </div>
            
        </div>
    )

}

export default MonthlyExpenses;