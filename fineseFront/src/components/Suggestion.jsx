import api from "../api";
import { formatNumber } from "../utils/formatNumber";
import { currentDate } from "../utils/formattime";
import BoxHeading from "./BoxHeading";
import { useEffect, useState, useRef } from "react";

const Suggestion = ({ goal }) => {
  const [suggestion, setSuggestion] = useState();
  const [result, setResult] = useState(null);
  
  const fetchSuggestion = async () => {
    try {
      const response = await api.get("api/suggestion/");
      setSuggestion(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchAchievement = async () => {
    const response = await api.get("api/achievement/");
    setResult(response.data);
  };
  
  const shouldRender = !result?.achieved && result?.current_income !== 0;
  useEffect(() => {
    fetchSuggestion();
    fetchAchievement();
  }, [goal]);

  return (
    <div id="sug" className="sug-container">
      {shouldRender && (
        <>
          <div className="avg-hd">
            <BoxHeading text="Suggestion" />
          </div>
          <div className="sug-top">
            <span>
              The top 3 of your expenses are in the following categories
            </span>

            {suggestion?.top_3.map((item) => (
              <div key={item.category_name} className="top3-box">
                <span>{item.category_name} </span>
                <span className="top-exp">${item.total_amount}</span>
              </div>
            ))}
            <div className="suggestion">
              <span>
                Based on this output if you can implement the following
                reductions from each category you can reach your goal of saving
                <span className="highlight">
                  {formatNumber(suggestion?.saving_goal)} each month
                </span>
                while spending
                <span className="highlight">
                  {formatNumber(suggestion?.spendable_income)}
                </span>
              </span>
            </div>

            {suggestion?.all_categories.map((item) => (
              <div key={item.category_name} className="top3-box">
                <span>{item.category_name} </span>
                <span className="top-exp">
                  ${formatNumber(item.total_amount)} -{" "}
                  {formatNumber(item.reduction_needed)}
                </span>
              </div>
            ))}

            <div className="saving">
              <span>Saving </span>
              <span className="top-exp">
                {formatNumber(suggestion?.saving_goal)}
              </span>
            </div>
            <div className="nb">
              <span>
                N.B this result is based on your {currentDate()} monthly expense
                only it doesn't consider the necessity of the expense. so you
                can interchange the suggestion based on your preference
              </span>
            </div>
          </div>
        </>
      ) }
    </div>
  );
};
export default Suggestion;
