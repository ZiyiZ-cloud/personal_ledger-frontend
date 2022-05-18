import React from 'react';
import ExpenseCard from './ExpenseCard';

function ExpenseCardList({expenses}){

    console.debug("expenses","expenses=",expenses);

    return (
        <div>
            {expenses.map(expense =>(
                <ExpenseCard 
                    id={expense.id}
                    amount={expense.amount}
                    category={expense.category}
                    detail={expense.detail}
                    date={expense.date}
                    />
            ))}
        </div>
    )

}

export default ExpenseCardList;