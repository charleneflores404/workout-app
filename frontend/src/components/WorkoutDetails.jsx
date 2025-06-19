const WorkoutDetails = ({ workout }) => {
  return (
    <>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps (kg): </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
    </>
  );
};

export default WorkoutDetails;
