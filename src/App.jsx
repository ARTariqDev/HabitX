import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import HabitManager from "./HabitManager"; // Habit management component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:5001/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Error fetching profile:", err.message);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>HabitX - Habit Tracker</h1>

      {isLoggedIn ? (
        <div>
          <h2>Welcome, {user?.email}!</h2>
          <p>Account created at: {new Date(user?.createdAt).toLocaleString()}</p>
          <button onClick={handleLogout} style={{ padding: "10px", cursor: "pointer" }}>
            Logout
          </button>
          <HabitManager userId={user?._id} />
        </div>
      ) : (
        <div>
          {view === "login" ? (
            <div>
              <LoginForm onLoginSuccess={fetchUserProfile} />
              <p>
                Don't have an account?{" "}
                <button onClick={() => setView("signup")} style={{ cursor: "pointer", border: "none", background: "none", color: "blue" }}>
                  Signup here
                </button>
              </p>
            </div>
          ) : (
            <div>
              <SignupForm onSignupSuccess={() => setView("login")} />
              <p>
                Already have an account?{" "}
                <button onClick={() => setView("login")} style={{ cursor: "pointer", border: "none", background: "none", color: "blue" }}>
                  Login here
                </button>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
