const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.get('/', (req, res) => {
    Exercise.find()
    .then(exercises => res.send(exercises))
    .catch(err => res.status(400).send())
})

router.post('/add', (req, res) => {
    const {username, description, duration, date} = req.body;
    const newExercise = new Exercise ({
        username, description, 
        duration: Number(duration), 
        date: Date.parse(date)
    });

    newExercise.save()
    .then(() => res.send("Exercise added!"))
    .catch(err => {
        console.log(err)
        res.status(400).send()
    })
});

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then((exercise) => res.send(exercise))
    .catch(err => res.status(400).send())
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.send("Exercise deleted"))
    .catch(err => res.status(400).send())
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
        .then(() => res.send("Exercise updated!"))
        .catch((err) => res.status(400).send());
    })
    .catch(err => res.status(400).send())
});


module.exports = router