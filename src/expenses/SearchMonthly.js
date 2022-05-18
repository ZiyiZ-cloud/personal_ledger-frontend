import React, {useState,useEffect,useContext} from 'react';
import LedgerApi from '../Api/api';
import LoadingSpinner from '../common/LoadingSpinner'
import UserContext from '../auth/UserContext';
import ExpenseCardList from './ExpenseCardList';
import { useNavigate } from "react-router-dom";




function SearchMonthly(){

    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        date: "",
    });
    const [formErrors, setFormErrors] = useState([]);

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
        let result = await LedgerApi.getByMonth(username,year,month);
        console.log(result);
        setExpenses(result)
    }

    function addExpense (evt){
        evt.preventDefault();
        history(`/expenses/add`);
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

    function selectedMonth (evt){
        evt.preventDefault();
        let newYear;
        let newMonth;
        let date = new Date(formData.date)
        newYear = date.getFullYear();
        newMonth = date.getMonth()+1;
        console.log(newMonth.newYear);
        history(`/expenses/year/${newYear}/month/${newMonth}`);
    }

    if(!expenses) return <LoadingSpinner />;

    console.log(expenses.length);

    return (
        <div>
            <div>
                <form onSubmit={selectedMonth}>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                  />
                </div>
                <button onClick={selectedMonth}>Search Monthly Expenses</button>
                </form>
            </div>
            
        </div>
    )

}

export default SearchMonthly;