import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom"; // Use useNavigate here
import Login from "./pages/Login";
import Register from "./pages/Register";
import Application from "./pages/Application";
import Dashboard from "./pages/Dashboard";
import ProfessorApplication from "./pages/ProfessorApplication";
import AllApplications from "./pages/AllApplications";
import { jwtDecode } from "jwt-decode";
import "./App.css";

const getUserRole = (token) => {
  if (!token) return null;
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.uloga; // Extract the role from the token
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook here
  const token = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const userRole = getUserRole(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/dashboard"); // Redirect to homepage after logging out
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Erasmus Mobility Program</h1>
        <nav className="navbar">
          <div className="left-nav">
            {!isLoggedIn && (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="right-nav">
            {isLoggedIn ? (
              <>
                {userRole === "student" && (
                  <Link to="/application" className="nav-link">
                    Send Application
                  </Link>
                )}

                {userRole === "profesor" && (
                  <Link to="/professor-application" className="nav-link">
                    Professor Application
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link to="/all-applications" className="nav-link">
                    All appplications
                  </Link>
                )}
                {userRole !== "admin" && (
                  <Link to="/all-applications" className="nav-link">
                    My appplications
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="nav-link logout-btn"
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/application" element={<Application />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/professor-application"
            element={<ProfessorApplication />}
          />
          <Route path="/all-applications" element={<AllApplications />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>� 2024 Erasmus Mobility Program</p>
      </footer>
    </div>
  );
};

export default App;
