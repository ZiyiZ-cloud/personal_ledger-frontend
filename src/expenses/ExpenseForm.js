import React, { useState, useContext } from "react";
import LedgerApi from "../Api/api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";
import { useNavigate } from "react-router-dom";


import useTimedMessage from "../hooks/useTimedMessage";


function ExpenseForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const history = useNavigate();

    const [formData, setFormData] = useState({
      amount: "",
      category: "",
      detail: "",
      date: "",
      username:currentUser.user.username,
    });
    const [formErrors, setFormErrors] = useState([]);
  
    // switch to use our fancy limited-time-display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()
  
    console.debug(
        "ExpenseForm",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed,
    );
  
    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages and password
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */
  
    async function handleSubmit(evt) {
      evt.preventDefault();
  
      let expenseData = {
        amount: formData.amount,
        category: formData.category,
        detail: formData.detail,
        date: formData.date,
        username: formData.username
      };
  
      let username = formData.username;
      let newExpense

      if(expenseData.category === ""){
        setFormErrors([]);
      }

      try {
        newExpense = await LedgerApi.addExpense(username, expenseData);
      } catch (errors) {
        setFormErrors(errors);
        return;
      }
  
      history(`/expenses`);
  
    }
  
    /** Handle form data changing */
    function handleChange(evt) {
      const { name, value } = evt.target;
      if(name === "category" && value ===""){
        setFormErrors(['Category is required']);
      }
      setFormData(f => ({
        ...f,
        [name]: value,
      }));
      setFormErrors([]);
    }
  
    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          <h3>Add New Expense</h3>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Username</label>
                  <p className="form-control-plaintext">{formData.username}</p>
                </div>
                <div className="form-group">
                <p>Enter a positive number for Income or a negative number for Expense</p>
                  <label>Amount</label>
                  <input
                    type="number"
                      name="amount"
                      className="form-control"
                      value={formData.amount}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>        
                  <select name="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleChange}>
                    <option>Choose a Category</option> 
                    <option value="housing">Housing</option>
                    <option value="food">Food</option>
                    <option value="fun">Fun</option>
                    <option value="child-expenses">Child Expenses</option>
                    <option value="insurance">Insurance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="utilities">Utilities</option>
                    <option value="personal-care">Personal Care</option>
                    <option value="taxes">Taxes</option>
                    <option value="transportation">Transportation</option>
                    <option value="gifts">Gifts</option>
                    <option value="income">Income</option>
                    <option value="givings">Givings</option>
                    <option value="house-supplies">House Supplies</option>
                    <option value="consumer-debt">Consumer Debt</option>
                    <option value="clothing">Clothing</option>
                    <option value="savings">Savings</option>
                    <option value="pets">Pets</option>
                    <option value="services-membership">Services Membership</option>
                    <option value="others">Others</option>                    
                  </select>
       
                </div>
                <div className="form-group">
                  <label>Detail</label>
                  <input
                      name="detail"
                      className="form-control"
                      value={formData.detail}
                      onChange={handleChange}
                  />
                </div>
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
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}
  
                {saveConfirmed
                    ?
                    <Alert type="success" messages={["Updated successfully."]} />
                    : null}
  
                <button
                    className="btn btn-primary btn-block mt-4"
                    onClick={handleSubmit}
                >
                  Add Transaction
                </button>
              </form>
            </div>
          </div>
        </div>
    );
  }
  
  export default ExpenseForm;
  