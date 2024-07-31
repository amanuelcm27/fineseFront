import BoxHeading from "./BoxHeading";
import { useEffect, useState, useRef } from "react";
import api from "../api";
import { formatNumber } from "../utils/formatNumber";
const Achievement = ({ goal }) => {
  const [monthlyStat, setmonthlyStat] = useState("");

  const fetchAchievement = async () => {
    const response = await api.get("api/achievement/");
    setmonthlyStat(response.data);
  };
  const shouldRender = monthlyStat?.current_income !== 0;

  useEffect(() => {
    fetchAchievement();
  }, [goal]);
  return (
    <div className="achi-container">
      {shouldRender ? (
        <>
          <div className="avg-hd">
            <BoxHeading text="Achievement" />
          </div>
          <div className="achi-card-container">
            <div className="achi-card">
              <span>
                From your current monthly Income of
                <span className="highlight">
                  {formatNumber(monthlyStat.current_income)}
                </span>
                you are spending
                <span className="highlight">
                  {formatNumber(monthlyStat.percentage_spend)}% of it.{" "}
                </span>
              </span>
            </div>
            {monthlyStat.achieved ? (
              <div className="achi-card3">
                <span>
                  <i className="fa-solid fa-circle-check"></i>
                  Congratulations. You can currently meet your goal of saving
                  <span className="highlight">
                    {formatNumber(monthlyStat.saving)}
                  </span>
                </span>
              </div>
            ) : (
              <div className="achi-card2">
                <span>
                  <i className="fa-solid fa-circle-xmark"></i>
                  Unfortunately you can't currently save
                  <span className="highlight">
                    {formatNumber(monthlyStat.saving)}
                  </span>
                  <div>
                    <a href="#sug" style={{ color: "red" }}>
                      See Suggestion
                    </a>
                  </div>
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="empty-result-box">
          
          <a href="#goal">
            Set your Income & Goal to see Achievement & Suggestion
          </a>{" "}
        </div>
      )}
    </div>
  );
};
export default Achievement;
