import { useState } from "react";
import "./App.css";
import Habit from "./Habit.jsx";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignupSuccess = () => {
    setIsSignup(false); // Redirect to login after successful signup
  };

  return (
    <>
      <header>
        <h1>HabitX -- AI Habit Tracker</h1>
      </header>
      <main>
        {user ? (
          <>
            <button id="add">+ Add Habit</button>
            <Habit props={user.habits}></Habit> {/* Display user's habits */}
          </>
        ) : isSignup ? (
          <SignupForm onSignupSuccess={handleSignupSuccess} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
        {!user && (
          <button onClick={() => setIsSignup((prev) => !prev)}>
            {isSignup ? "Already have an account? Log In" : "Need an account? Sign Up"}
          </button>
        )}
      </main>
    </>
  );
}

export default App;
