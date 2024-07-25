import "../css/home.css";
import NavBar from "../components/NavBar";
import BoxHeading from "../components/BoxHeading";
import HomeBox from "../components/HomeBox";
import Notification from "../components/Notification";
import { useContext, useEffect, useState } from "react";
import Detail from "../components/Detail";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../api";
import { formatDate } from "../utils/formattime";
import { formatNumber } from "../utils/formatNumber";
import FilterSection from "../components/FilterSection";
const Home = () => {
  
  const [expenseBox, setexpenseBox] = useState(false);
  const [detailBox, setdetailBox] = useState(false);
  const [notifyBox, setnotifyBox] = useState(true);
  const { user, isFirstTime , authTokens } = useContext(AuthContext);
  const [expense_list, setExpenseList] = useState([]);
  const [thisMonthExpense , setthisMonthExpense] = useState("")
  const [loading , setLoading] = useState(false)
  const [expense,setExpense ] = useState();
  const showExpenseBox = () => {
    setexpenseBox(!expenseBox);
  };
  const showDetailBox = () => {
    setdetailBox(!detailBox);
  };
  const showNotification = () => {
    setnotifyBox(!notifyBox);
  };
  const fetchThisMonthExpense = async () => {
    setLoading(true);
    try {
      const response = await api.get("api/thismonth/")
      setthisMonthExpense(response.data.this_month_expense)
      setLoading(false)
    }
    catch  (e) {
      console.log(e)
    }
  }
  const fetchExpenses = async () => {
    try {
      const response = await api.get("api/list_expense/");
      setExpenseList(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const refresher= () => {
    fetchThisMonthExpense();
    fetchExpenses();
  }
  useEffect(() => {
    refresher()
    
  }, []);

  return (
    <>
      <div className="home-main">
        <NavBar />
        {detailBox ? <Detail refresher={refresher} expense={expense} showDetailBox={showDetailBox} /> : ""}
        {expenseBox ? <HomeBox refresher={refresher} showExpenseBox={showExpenseBox} /> : ""}
        <div className="home-box">
          <BoxHeading text="This month you have spent"></BoxHeading>
          <div className="home-box-expense">

            {loading  ? <img src="loading.gif"></img>:<span>${formatNumber(thisMonthExpense)}</span>}
          </div>
        </div>
        <div className="list-heading">
          <span onClick={refresher} className="list-item">All</span>
          <span onClick={showExpenseBox} className="list-item">
            New Expense
          </span>
        </div>
        {notifyBox && isFirstTime ? (
          <Notification showNotification={showNotification} />
        ) : (
          ""
        )}
        <div className="expense-container">
          <div className="expense-list-container">
            {expense_list.length > 0 ?
              expense_list.map((expense) => (
                <div key={expense.id} onClick={()=> {setExpense(expense),showDetailBox()}} className="expense-box">
                  <span>{formatDate(expense.date_created)}</span>
                  <span>{expense.name}</span>
                  <span>${formatNumber (expense.amount)}</span>
                </div>
              )): 
              <div className="empty-box">
                  <img src="empty.gif"></img>
                  <span>Oops! No expenses found</span>
              </div> }
          </div>
          <FilterSection setExpenseList={setExpenseList}></FilterSection>
        </div> 
      </div>
    </>
  );
};
export default Home;
