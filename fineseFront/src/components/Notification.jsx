import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Notification = ({showNotification}) => {
      
   const {setIsFirstTime} = useContext(AuthContext)
  return (
    <>
      <div className="box-container">
        <div className="not-card">

          <span>
            You have successulfy set your goal. start adding your daily expenses
            and check out the <span className="not-txt">stats</span> tab to check if you are meeting your goal
          </span>
          <button onClick={()=>{showNotification(),setIsFirstTime(false)}} className="gotit-btn">Got it</button>
        </div>
      </div>
    </>
  );
};
export default Notification;