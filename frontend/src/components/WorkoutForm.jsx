import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default action (refresh page) upon submit

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("New workout added");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label>Load (in kg):</label>
        <input
          type="text"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
        />

        <label>Reps:</label>
        <input
          type="text"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
        />

        <button>Add Workout</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
