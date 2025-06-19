import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload, // payload is an array of all of the workouts
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts], // new workout and the rest of existing workouts
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w.id !== action.payload._id),
      };
    default:
      return state; // unchanged
  }
};

// children represents the <App/> component that we wrap by this provider
export const WorkoutsContextProvider = ({ children }) => {
  // takes in a reducer function and init value
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  // dispatch function requires action (action name and payload)
  // payload is any data we need to make the change
  //   dispatch({type: 'CREATE_WORKOUT', payload: [{}, {}]})
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
