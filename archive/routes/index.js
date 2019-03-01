var express = require('express');
var router = express.Router();
const User = require('../models/user');


const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

/* GET home page. */
router.get('/',  function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// CREATE WORKOUT RECORD

router.post('/workout/create', function(req, res, next) {
  (async() => {
      const workoutName = req.body.workoutName;
      const workoutActivityType = req.body.workoutActivityType;
      const workoutMuscleGroup = req.body.workoutMuscleGroup;
      const workoutIntesity = req.body.workoutIntesity;
      const workout = new Workout({
        workoutName: workoutName,
          coinTicker: coinTicker,
          plan: plan
      })
      workout.save();
    })();
  res.redirect('/')
});

/* GET home page. */
router.get('/workout/create',  function(req, res, next) {
  res.render('workout', { title: 'Express' });
});

module.exports = router;
