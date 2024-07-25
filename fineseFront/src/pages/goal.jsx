import "../css/user.css";
import UserBox from "../components/UserBox";
import BoxHeading from "../components/BoxHeading";
import UserButton from "../components/UserButton";
import { useNavigate,Link, useLocation } from "react-router-dom";
import {useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import api from "../api";



const Goal = () => {
  const [value, setValue] = useState("");
  const { user  ,isFirstTime } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && isFirstTime === false) {
      navigate("/");
    }
  }, [user, navigate]);
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

  const [formData, setformData] = useState({
    income: 0.0,
    saving: 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = Number(parseFloat(value).toFixed(2));
    if (name === "saving") {
      if (newValue < 0) newValue = 0;
      if (newValue > 100) newValue = 100;
    }
    setformData({ ...formData, [name]: newValue});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`api/set_goal/`, formData);
      navigate('/')
      
    }
    catch (e) {
      console.log("errors",e)
    }
    
  };

  return (
    <>
      <div className="user-main">
        <UserBox>
          <BoxHeading text="Tell us Your financial goals"></BoxHeading>
          <form
            onSubmit={handleSubmit}
            style={{ fontFamily: '"Julius Sans One", sans-serif' }}
            className="login-form"
          >
            <label>Income</label>
            <input
              onChange={handleChange}
              step="0.01"
              placeholder="current income"
              name="income"
              className="username"
              type="number"
            ></input>
            <label>Saving</label>
            <input
              value={value}
              step="0.01"
              onChange={(e) => {
                handleChange(e);
                resetValue(e);
              }}
              name="saving"
              placeholder="how much percent you want to save ? (0-100)"
         
              className="password"
              type="number"
            ></input>
            <UserButton text="Start your Journey"></UserButton>
          </form>
        </UserBox>
      </div>
    </>
  );
};

export default Goal;