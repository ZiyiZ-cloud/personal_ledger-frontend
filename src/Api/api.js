import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class LedgerApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") { 
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${LedgerApi.token}` };
    const params = (method === "get")
        ? data
        : {};
 
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //get current user

  static async getUsers(){
      let res = await this.request(``);
      return res.users;
  }

  // get current user information

  static async getCurrentUser(username){
      let res = await this.request(`${username}`);
      return res
  }

  //update current user information

  static async updateCurrentUser(username,data){
      let res = await this.request(`${username}`,data,"patch");
      return res
  }

  //add new expense

  static async addExpense(username,data){
      let res = await this.request(`expenses/${username}`,data,"post");
      return res;
  }

  // get current user expenses

  static async getCurrentExpenses(username){
      let res = await this.request(`expenses/${username}`)
      return res
  }

  //get expenses based on category

  static async getByCategory(username,category){
      let res = await this.request(`epenses/${username}/category/${category}`)
      return res
  }

  //get expenses based on year

  static async getByYear(username,year){
      let res = await this.request(`expenses/${username}/year/${year}`)
      return res
  }

//get expenses based on month of the year

static async getByMonth(username,year,month){
  let res = await this.request(`expenses/${username}/year/${year}/month/${month}`)
  return res
}

//get expenses based on day of the month
static async getExpensesByDay(username,year,month){
  let res = await this.request(`expenses/${username}/year/${year}/month/${month}/day/expense`)
  return res
}

//get incomes based on day of the month
static async getIncomesByDay(username,year,month){
  let res = await this.request(`expenses/${username}/year/${year}/month/${month}/day/income`)
  return res
}

  //get incomes based on category in a month
  static async getMonthlyCategoryIncome(username,year,month){
    let res = await this.request(`expenses/${username}/year/${year}/month/${month}/category/income`)
    return res
  }

  //get expense based on category in a month
  static async getMonthlyCategoryExpense(username,year,month){
    let res = await this.request(`expenses/${username}/year/${year}/month/${month}/category/expense`)
    return res
  }

//get total income in a month
static async getMonthlyTotalIncome(username,year,month){
  let res = await this.request(`expenses/${username}/year/${year}/month/${month}/total/income`)
  return res
}

//get total expense in a month
static async getMonthlyTotalExpense(username,year,month){
  let res = await this.request(`expenses/${username}/year/${year}/month/${month}/total/expense`)
  return res
}
  
 //get single expense

  static async getExpenseById(username,id){
    let res = await this.request(`expenses/${username}/${id}`)
    return res.expense;
}


  //update expense

  static async updateExpense(username,id,data){
      let res = await this.request(`expenses/${username}/${id}`,data,"patch")
      return res
  }

  //delete expense

  static async deleteExpense(username,id,data){
      let res = await this.request(`expenses/${username}/${id}`,data,"delete")
      return res
  }


  // get token for login from username, password

  static async login(data){
      let res = await this.request(`auth/token`,data,"post");
      return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  //delete user

  static async deleteUser(username,data) {
    let res = await this.request(`${username}`,data,"delete");
    return res
  }
  
}


export default LedgerApi;
