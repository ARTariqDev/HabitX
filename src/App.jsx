import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm"; // Login form component
import SignupForm from "./SignupForm"; // Signup form component (optional)

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state
  const [user, setUser] = useState(null); // Stores user profile
  const [view, setView] = useState("login"); // Tracks current view (login/signup)

  // Check for token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  // Fetch user profile from backend
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
        localStorage.removeItem("token"); // Clear invalid token
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Error fetching profile:", err.message);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>HabitX -AI Habit Tracker</h1>

      {isLoggedIn ? (
        // Logged-in view
        <div>
          <h2>Welcome, {user?.email}!</h2>
          <p>Account created at: {new Date(user?.createdAt).toLocaleString()}</p>
          <button onClick={handleLogout} style={{ padding: "10px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      ) : (
        // Login/Signup view
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
