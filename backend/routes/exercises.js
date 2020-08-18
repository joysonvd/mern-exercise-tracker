const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.get('/', (req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error:', err))
})


router.post('/add', (req, res) => {
    const {username, description, duration, date} = req.body;
    const newExercise = new Exercise ({
        username, description, 
        duration: Number(duration), 
        date: Date.parse(date)
    });

    newExercise.save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json('Error:', err))
});

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch(err => res.status(400).json('Error:', err))
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch(err => res.status(400).json('Error:', err))
});

router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then((exercise) => {
        const {username, description, duration, date} = req.body;
        exercise.username = username;
        exercise.description = description;
        exercise.duration = Number(duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json('Error: ', err));
    })
    .catch(err => res.status(400).json('Error:', err))
});


module.exports = router