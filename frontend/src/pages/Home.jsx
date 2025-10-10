import { useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  // recall: empty dep array means the useEffect will only fire once
  // we have the async function inside the useEffect function
  // since we cannot make the useEffect function itself to be async
  // also, in the backend, we get the array documents 'workouts' and send them back as json by .json(),
  // so now we get it as json format and we pass that to .json(), then it becomes an array of objects again
  // where each object represents an individual workout

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch, workouts]);
  return (
    <div className="home">
      {/* <h2>Homeee</h2> */}
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            // <>
            <WorkoutDetails key={workout._id} workout={workout} />
            // <br />
            // </>
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
