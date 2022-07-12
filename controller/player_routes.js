const express = require('express')
// making a router
const router = express.Router()
// importing fruit model to access database
const Fruit = require('../models/fruit')

// DELETE - Delete
router.delete('/:id', (req, res) => {
    const fruitId = req.params.id

    Fruit.findByIdAndRemove(fruitId)
        .then(fruit => {
            res.redirect('/fruits')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const fruitId = req.params.id

    Fruit.findById(fruitId)
        .then(fruit => {
            res.render('fruits/edit', { fruit })
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update
router.put('/:id', (req, res) => {
    const fruitId = req.params.id

    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    Fruit.findByIdAndUpdate(fruitId, req.body, { new: true })
        .then(fruit => {
            res.redirect(`/fruits/${fruit._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})


// GET route for displaying my form for create
router.get('/new', (req, res) => {
    res.render('fruits/new')
})

// POST - Create
router.post('/', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    // now that we have user specific routes, we will add a username upon creation. 
    // remember, when we logged in, we saved the username to the session object.
    // using the ._id to set the owner field
    req.body.owner = req.session.userId

    Fruit.create(req.body)
        .then(fruits => {
            // console.log(fruit)
            res.redirect('/fruits')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Index
// localhost:3000/fruits
router.get('/', (req, res) => {
    // use mongoose to find all fruits
    Fruit.find({})
    // return fruits as JSON
        .then(fruits => {
            // res.json(fruit)
            res.render('fruits/index', { fruits })
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/mine', (req, res) => {
    // find the fruits associated with the logged in user
    Fruit.find({ owner: req.session.userId })
        .then(fruits => {
            res.render('fruits/index', { fruits })
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

// seed route
// insert many items into our database with just going to this route.
// localhost:3000/fruits/seed/
router.get('/seed', (req,res) => {
    // starting data
    const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
 ]

    // delete if we have fruits
 Fruit.deleteMany({})
    // insert data
    .then(() => {
        Fruit.create(startFruits)
        // return this daata as JSON to view
        .then(data => {
            res.json(data)
        })
        // This does the came thing '.catch(err => console.error(err))'
        .catch(console.error)
    })
   
})

// GET - Show
// localhost:3000/fruits/:id <- change with the id being passed in
router.get('/:id', (req, res) => {
    const fruitId = req.params.id

    Fruit.findById(fruitId)
        // This will populate our User model fields
        // comment has an author field and that is the ref to the User model
        // always going to be a string of the value you want to populate
        // this also has to be another model
        .populate('comments.author')
        // send back some json
        .then(fruit => {
            // res.json(fruit)show route.
            const userId = req.session.userId
            const username = req.session.username
            res.render('fruits/show', { fruit, userId, username })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router