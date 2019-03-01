const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const workoutSchema = new Schema({
    workoutName:{type: String},
    workoutActivityType:{type: String},
    workoutMuscleGroup:{type: String}, 
    workoutIntesity:{type: String},
    // workoutDuration:{type: Double},
    // workoutTargetLowerBMI:{type: Double},
    // workoutTargetHigherBMI:{type: Double},
    workoutTerrain:{type: String},
    workoutHeartRate:{type: String},
    workoutEquipment:{type: String},
    workoutMotivationCriteria:{type: String},
    workoutGoal:{type: String},

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;



