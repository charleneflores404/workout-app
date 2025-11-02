import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const logout = () => {
    // remove the user from local storage
    localStorage.removeItem("user");

    // dispatch the logout action
    dispatchWorkouts({ type: "SET_WORKOUTS", payload: null });
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
