import React from 'react';


function Balance({totalIncome, totalExpense}){

    return (
        <div>
            <h5>Balance</h5>
            <div>Total Income :{totalIncome.monthlytotalIncome}</div>
            <div>Total Expense :{totalExpense.monthlytotalExpense}</div>
        </div>
    )

}

export default Balance;