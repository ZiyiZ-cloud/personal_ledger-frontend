import React from 'react';
import LedgerApi from '../Api/api';
import {useNavigate} from 'react-router';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';

function ExpenseCard({id,amount, category,detail,date}){

    const history = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    

    async function deleteExpense(evt){
        evt.preventDefault();
        await LedgerApi.deleteExpense(currentUser.user.username,id);
        window.location.reload();
    }

    async function editExpense(evt){
        evt.preventDefault();
        history(`/expenses/${currentUser.user.username}/${id}`);
    }

    const Category = category.toUpperCase();
    return (
        <div>
        <div><button onClick={deleteExpense}>X</button></div>
        <div>
            <h6>{Category}</h6>
            <p>Amount: ${amount}</p>
            <p>Detail: {detail}</p>
            <p>Date: {date}</p>
        </div>
        <div><button onClick={editExpense}>Edit</button></div>
        </div>
    )

}

export default ExpenseCard;