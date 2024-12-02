import React, { useState, useEffect } from "react";

const HabitManager = ({ userId }) => {
  const [habits, setHabits] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: "", isGood: true });

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch(`http://localhost:5001/habit/user/${userId}`);
      const data = await response.json();
      setHabits(data);
    } catch (err) {
      console.error("Error fetching habits:", err.message);
    }
  };

  const addHabit = async () => {
    try {
      const response = await fetch("http://localhost:5001/habit/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newHabit, userId }),
      });

      if (response.ok) {
        fetchHabits();
        setIsDialogOpen(false);
        setNewHabit({ name: "", isGood: true });
      }
    } catch (err) {
      console.error("Error adding habit:", err.message);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      const response = await fetch(`http://localhost:5001/habit/delete/${habitId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchHabits();
      }
    } catch (err) {
      console.error("Error deleting habit:", err.message);
    }
  };

  return (
    <div>
      <button onClick={() => setIsDialogOpen(true)}>Add Habit</button>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <span>{habit.name}</span> - <span>{habit.isGood ? "Good" : "Bad"}</span>
            <button onClick={() => deleteHabit(habit._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {isDialogOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "5px" }}>
            <h3>Add New Habit</h3>
            <input
              type="text"
              placeholder="Habit Name"
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
            />
            <div>
              <label>
                <input
                  type="radio"
                  checked={newHabit.isGood}
                  onChange={() => setNewHabit({ ...newHabit, isGood: true })}
                />
                Good
              </label>
              <label>
                <input
                  type="radio"
                  checked={!newHabit.isGood}
                  onChange={() => setNewHabit({ ...newHabit, isGood: false })}
                />
                Bad
              </label>
            </div>
            <button onClick={addHabit}>Add</button>
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitManager;
