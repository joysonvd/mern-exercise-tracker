const router = require('express').Router();
let User = require('../models/user.model');

router.get('/', (req, res) => {
    User.find()
    .then(users => res.send(users))
    .catch(err => res.status(400).send())
})

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User ({username})
    console.log(username)
    newUser.save()
    .then((result) => {
        console.log(result)
        res.json("User Added!")
    })
    .catch(err => {
        console.log(err.code)
        res.status(400).send();
    })
});

module.exports = router
