import { useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  // recall: empty dep array means the useEffect will only fire once
  // we have the async function inside the useEffect function
  // since we cannot make the useEffect function itself to be async
  // also, in the backend, we get the array documents 'workouts' and send them back as json by .json(),
  // so now we get it as json format and we pass that to .json(), then it becomes an array of objects again
  // where each object represents an individual workout

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, workouts, user]);
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
