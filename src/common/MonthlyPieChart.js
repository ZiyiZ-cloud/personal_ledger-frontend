import React, { Component,useEffect,useState } from 'react'
import LedgerApi from '../Api/api';
import LoadingSpinner from './LoadingSpinner';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



function PieChart({username,year,month,chartTitle}) {

  const [categoryIncome,setCategoryIncome] = useState(null);
  const [categoryExpense,setCategoryExpense] = useState(null);

  async function getCategoryData(username,year,month){
    setCategoryIncome(await LedgerApi.getMonthlyCategoryIncome(username,year,month));
    setCategoryExpense( await LedgerApi.getMonthlyCategoryExpense(username,year,month));
  }

    useEffect(function getcategoryData(){
      getCategoryData(username,year,month);
      console.log(categoryExpense,categoryIncome);
    },[])

    if(!categoryExpense) return <LoadingSpinner />;
    if(!categoryIncome) return <LoadingSpinner />;

    let expensedata = {
      labels: categoryExpense.categoryExpense.map(x=>x[0]),
      datasets: [
        {
          id: 1,
          label: 'Expnese',
          data: categoryExpense.categoryExpense.map(x=>x[1]),
          borderColor: '',
          backgroundColor: ["#ff0000d9","#ff6400d9" ],
        },
      ],
    }

    let incomedata = {
        labels: categoryIncome.categoryIncome.map(x=>x[0]),
        datasets: [
          {
            id: 1,
            label: 'Expnese',
            data: categoryIncome.categoryIncome.map(x=>x[1]),
            borderColor: "",
            backgroundColor: ["#0000ff", "#0000e5",
                "#0000cc",
                "#0000b2",
                "#000099",
                "#00007f",
                "#000066",
                "#00004c",
                "#000033",
                "#000019",
                "#1919ff",
                "#3232ff",
                "#4c4cff",
                "#6666ff",
                "#7f7fff",
                "#9999ff",
                "#b2b2ff",
                "#ccccff",
                "#e5e5ff",
                ],
          },
        ],
      }

      let expenseTitle = `${year} - ${month} Expense`;
      let incomeTitle = `${year} - ${month} Income`;

    return (
      <div className="container mt-5">
        <h2>{expenseTitle}</h2>
        <Pie
          datasetIdKey='id'
          data={expensedata}
        />
        <h2>{incomeTitle}</h2>
        <Pie
          datasetIdKey='id'
          data={incomedata }
        />
      </div>
    )
}

export default PieChart;