import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/registration";
import Goal from "./pages/goal";
import Home from "./pages/home";
import Stats from "./pages/stats";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/stats" element={<Stats />}></Route>
              <Route path="/goal" element={<Goal />}></Route>
              <Route path="*" element={<Home />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
