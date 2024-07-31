import { formatNumber } from "../utils/formatNumber";

import NavBar from "../components/NavBar";
import BoxHeading from "../components/BoxHeading";
import { useEffect, useState, useRef } from "react";
import api from "../api";
const StatusHeader = ({goal  , fetchGoal, editMode , changeMode}) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState();
  const [formData, setformData] = useState({ income: 0, saving: 0 });
  const tickRef = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = Number(parseFloat(value).toFixed(2));
    if (name === "saving") {
      if (newValue < 0) newValue = 0;
      if (newValue > 100) newValue = 100;
    }
    setformData({ ...formData, [name]: newValue });
  };


  const resetValue = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || (newValue >= 0 && newValue <= 100)) {
      setValue(newValue);
    } else if (newValue > 100) {
      setValue(100);
    } else if (newValue < 0) {
      setValue(0);
    }
  };
  const updateGoal = async () => {
    try {
      setformData(formData)
      const response = await api.patch(`api/update_goal/${goal.id}/`, formData);
      fetchGoal();
      changeMode();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGoal();
  },[])
  useEffect(() => {
    if (goal) {
      setformData({ income: goal.income, saving: goal.saving });
      setValue(goal.saving);
    }
  }, [goal]);
  return (
    <div id="goal" className="stats-heading-container">
      <BoxHeading text="Current Monthly Income & Saving Goal" />
      <div ref={inputRef} className="heading-card">
        {editMode ? (
          <>
            <div className="income-box">
              <input
                value={formData.income}
                onChange={handleChange}
                type="number"
                name="income"
              />
            </div>
            <div className="saving-box">
              <input
                value={value}
                onChange={(e) => {
                  handleChange(e), resetValue(e);
                }}
                type="number"
                name="saving"
              />
            </div>
          </>
        ) : (
          <>
            <div onClick={changeMode} className="income-box">
              <span>{goal?.income}</span>
            </div>
            <div onClick={changeMode} className="saving-box">
              <span>{goal?.saving}%</span>
            </div>
          </>
        )}
      </div>
      <div className="box-lb">
        <div>income</div>
        <div>saving (in %)</div>
      </div>
      <div className="box-edit">
        {editMode ? (
          <i
            ref={tickRef}
            onClick={updateGoal}
            className="fa-solid fa-circle-check"
          ></i>
        ) : (
          <i onClick={changeMode} className="fa-solid fa-pen"></i>
        )}
      </div>
    </div>
  );
};
export default StatusHeader;
