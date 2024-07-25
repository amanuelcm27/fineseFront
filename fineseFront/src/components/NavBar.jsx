import { Link } from "react-router-dom";
import "../css/navbar.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const {user,logoutUser} = useContext(AuthContext);
  
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <div className="navlogo">
            <span>Finese</span>
          </div>
        </Link>

        <div className="navbar-item">
            <Link to="/">
          <span>Home</span>
          </Link>
          <Link to="/stats">
          <span>Stats</span>
          </Link>
          {user ?
          <span onClick={logoutUser}>Logout</span>
        :""}
          <span className="user" >Hi, {user.username}</span>
        </div>
      </div>
    </>
  );
};
export default NavBar;
