import "../css/stats.css";
import "../css/avg.css";
import "../css/achi.css";
import "../css/suggestion.css";

import NavBar from "../components/NavBar";
import BoxHeading from "../components/BoxHeading";
import { useEffect, useState, useRef } from "react";
import api from "../api";
import Achievement from "../components/Achievement";
import Suggestion from "../components/Suggestion";
import StatusHeader from "../components/StatusHeader";
import Average from "../components/Average";
const Stats = () => {
  const [goal, setGoal] = useState(null);
  const [editMode, seteditMode] = useState(false);
  const [reveal, setReveal] = useState(false);
  const changeMode = () => {
    seteditMode(!editMode);
  };

  const fetchGoal = async () => {
    try {
      const response = await api.get("api/goal_stat/");
      setGoal(response.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavBar />
      <div className="stats-container">
        <StatusHeader
          goal={goal}
          fetchGoal={fetchGoal}
          changeMode={changeMode}
          editMode={editMode}
        ></StatusHeader>
        <Average goal={goal}></Average>
        <Achievement reveal={reveal} setReveal={setReveal} goal={goal}></Achievement>
        <Suggestion goal={goal}></Suggestion>
      </div>
    </>
  );
};
export default Stats;
