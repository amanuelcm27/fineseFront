import "../css/user.css";
import UserBox from "../components/UserBox";
import BoxHeading from "../components/BoxHeading";
import UserButton from "../components/UserButton";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ErrorCard from "../components/ErrorCard";
import AuthContext from "../context/AuthContext";
const Login = () => {
  const { authenticationError, user, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      setError("Username and Password must be filled");
      return false;
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      loginUser(formData.username.trim(), formData.password.trim());
    } else {
      setShowError(true);
    }
  };
  useEffect(() => {
    if (authenticationError) {
      setError(authenticationError);
      setShowError(true);
    }
  }, [authenticationError]);
  return (
    <>
      <div className="user-main">
        <UserBox>
          <BoxHeading text="Continue tracking your finance"></BoxHeading>
          <form
            onSubmit={handleSubmit}
            style={{ fontFamily: '"Julius Sans One", sans-serif' }}
            className="login-form"
          >
            {showError && <ErrorCard error={error}></ErrorCard>}
            <label>Username</label>
            <input
              onChange={handleChange}
              name="username"
              className="username"
              type="text"
            ></input>
            <label>Password</label>
            <input
              onChange={handleChange}
              name="password"
              className="password"
              type="password"
            ></input>
            <UserButton text="Login"></UserButton>
            <span>
              Haven't registered yet ?
              <Link to="/register">
                <span className="link">Join here</span>
              </Link>
            </span>
          </form>
        </UserBox>
      </div>
    </>
  );
};
export default Login;
