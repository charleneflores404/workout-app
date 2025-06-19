const mongoose = require('mongoose');

// schema defines the structure of the type of document
// the model will be used to interact to the collection of that name; it is where you apply the methods such as .find()
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// model (the collection Workout) will be automatically pluralized
module.exports = mongoose.model('Workout', workoutSchema);
