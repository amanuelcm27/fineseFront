import "../css/user.css";
import UserBox from "../components/UserBox";
import BoxHeading from "../components/BoxHeading";
import UserButton from "../components/UserButton";
import { Link, useNavigate } from "react-router-dom";
import ErrorCard from "../components/ErrorCard";
import { useEffect, useContext, useState } from "react";
import api from "../api";
import AuthContext from "../context/AuthContext";
const Register = () => {
  const { user, setIsFirstTime, loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    if (
      formData.username.trim() === "" ||
      formData.password.trim() === "" ||
      formData.confirm.trim() === ""
    ) {
      setError("Some fields are empty!");
      return false;
    }

    if (formData.username.trim().toLowerCase() !== formData.username.trim()) {
      setError("name should be all lowercase");
      return false;
    }

    if (formData.password.trim().length < 5) {
      setError("Password is too short");
      return false;
    }

    const hasRequiredCharacters =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{5,20}$/;
    if (!hasRequiredCharacters.test(formData.password.trim())) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one symbol, and be between 5 to 20 characters"
      );
      return false;
    }

    if (formData.confirm.trim() !== formData.password.trim()) {
      setError("The two passwords don't match");
      return false;
    }
    setShowError(false);
    return true;
  };

  const register = async () => {
    try {
      const response = await api.post(`api/register/`, {
        username: formData.username,
        password: formData.password,
      });
      if (response.data.error) {
        setError(response.data.error);
        setShowError(true);
        return null;
      }
      setIsFirstTime(true);
      loginUser(formData.username, formData.password, true);
      return response.data;
    } catch (error) {
      console.log(error);
      setError("An error occurred during registration.");
      setShowError(true);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      await register();
      setLoading(false);
    } else {
      setShowError(true);
      setLoading(false);
    }
  };
  return (
    <div className="user-main">
      <UserBox>
        <BoxHeading text="Start tracking your expenses"></BoxHeading>
        <form
          onSubmit={handleSubmit}
          style={{ fontFamily: '"Julius Sans One", sans-serif' }}
          className="login-form"
        >
          {showError ? <ErrorCard error={error}></ErrorCard> : ""}

          <label>Username</label>
          <input
            onChange={handleChange}
            className="username"
            name="username"
            type="text"
          ></input>
          <label>Password</label>
          <input
            onChange={handleChange}
            className="password"
            name="password"
            type="password"
          ></input>
          <label>Confirm Password</label>
          <input
            onChange={handleChange}
            className="password"
            name="confirm"
            type="password"
          ></input>
          {loading ? (
            <button type="button" className="user-btn">
              <img width="20px" height="20px" src="loading.gif" />{" "}
            </button>
          ) : (
            <UserButton text="Sign Up"></UserButton>
          )}

          <span>
            Already Registered ?
            <Link to="/login">
              <span className="link">Login here</span>
            </Link>
          </span>
        </form>
      </UserBox>
    </div>
  );
};
export default Register;
