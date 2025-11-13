import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { API_URL } from "../config";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  // recall: empty dep array means the useEffect will only fire once
  // we have the async function inside the useEffect function
  // since we cannot make the useEffect function itself to be async
  // also, in the backend, we get the array documents 'workouts' and send them back as json by .json(),
  // so now we get it as json format and we pass that to .json(), then it becomes an array of objects again
  // where each object represents an individual workout

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${API_URL}/api/workouts`);
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, []);
  return (
    <>
      <h2>Homeee</h2>
      {workouts &&
        workouts.map((workout) => (
          <>
            <WorkoutDetails key={workout._id} workout={workout} />
            <br />
          </>
        ))}
      <WorkoutForm />
    </>
  );
};

export default Home;
