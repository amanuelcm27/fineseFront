import { formatNumber } from "../utils/formatNumber";
import { useEffect, useState, useRef } from "react";
import BoxHeading from "./BoxHeading";
import api from "../api";
const Average = ({goal}) => {
  const [average, setAverages] = useState();
  const currentYear = new Date().getFullYear();
  const [filterYear, setfilterYear] = useState("");
  const fetchAverages = async () => {
    try {
      const response = await api.get(
        `api/average_stat/${filterYear ? filterYear : currentYear}/`
      );
      setAverages(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const resetYear = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || (newValue >= 1 && newValue <= 2100)) {
      setfilterYear(newValue);
    } else if (newValue > 2100) {
      setfilterYear(2100);
    } else if (newValue <= 1) {
      setfilterYear(1);
    }

  };
  useEffect(() => {
    fetchAverages();
  }, [filterYear,goal]);
  return (
    <div className="avg-container">
      <div className="avg-hd">
        <BoxHeading text="Average Expense" />
      </div>
      <div className="year-filter">
        <span>Year</span>
        <input
          value={filterYear}
          onChange={(e) => resetYear(e)}
          placeholder="Eg. 2024"
          type="number"
        />
      </div>
      <div className="avg-box-container">
        <div className="avg-box">
          <div className="avg-txt">
            <span>Average Daily Expense</span>
          </div>
          <div className="avg-amt">
            <span>${formatNumber(average ? average.avg_daily : 0)}</span>
          </div>
        </div>
        <div className="avg-box">
          <div className="avg-txt">
            <span>Average Weekly Expense</span>
          </div>
          <div className="avg-amt">
            <span>${formatNumber(average ? average.avg_weekly : 0)}</span>
          </div>
        </div>
        <div className="avg-box">
          <div className="avg-txt">
            <span>Average Monthly Expense</span>
          </div>
          <div className="avg-amt">
            <span>${formatNumber(average ? average.avg_monthly : 0)}</span>
          </div>
        </div>
        <div className="avg-box">
          <div className="avg-txt">
            <span>Total Yearly Expense</span>
          </div>
          <div className="avg-amt">
            <span>${formatNumber(average ? average.yearly_expense : 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Average;
