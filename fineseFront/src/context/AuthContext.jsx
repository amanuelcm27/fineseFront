import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { json, useNavigate } from "react-router-dom";
import api from "../api";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const getTokenExpirationDate = (token) => {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      return null;
    }
    return new Date(decodedToken.exp * 1000);
  };

  const isTokenExpired = (token) => {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
  };
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  let [authenticationError, setauthenticationError] = useState("");
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [isFirstTime, setIsFirstTime] = useState(false);
  const navigate = useNavigate();
  const loginUser = async (username, password, redirectToGoal = false) => {
    try {
      const { data } = await api.post(`api/token/`, {
        username: username,
        password: password,
      });
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      if (redirectToGoal) {
        navigate("/goal");
        setIsFirstTime(true);
      } else {
        navigate("/");
      }
    } catch (e) {
      setauthenticationError(e.response.data.detail);
    }
  };
  const updateToken = async () => {
    try {
      const { data } = await api.post(`api/token/refresh/`, {
        refresh: authTokens.refresh,
      });

      setAuthTokens({
        ...authTokens,
        access: data.access,
        refresh: data.refresh,
      });
      setUser(jwtDecode(data.access));
      localStorage.setItem(
        "authTokens",
        JSON.stringify({
          ...authTokens,
          access: data.access,
          refresh: data.refresh,
        })
      );
    } catch (e) {
      logoutUser();
    }
  };
  const logoutUser = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };
  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    authTokens: authTokens,
    authenticationError: authenticationError,
    setIsFirstTime: setIsFirstTime,
    isFirstTime: isFirstTime,
  };
  useEffect (() => {
    if (authTokens) {
      if (isTokenExpired(authTokens.refresh)) {
        logoutUser();
      } else if (isTokenExpired(authTokens.access)) {
        setUser(null)
        updateToken();
      }
    }
  },[])
  useEffect(() => {
    
    const minutes = 1000 * 60 * 29;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      } 
    }, minutes);
    return () => clearInterval(interval);
  }, [authTokens]);
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
