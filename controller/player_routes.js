const express = require('express')
// making a router
const router = express.Router()
// importing fruit model to access database
const Player = require('../models/player')

// DELETE - Delete
router.delete('/:id', (req, res) => {
    const playerId = req.params.id

    Player.findByIdAndRemove(playerId)
        .then(player => {
            res.redirect('/draft')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const playerId = req.params.id

    Player.findById(playerId)
        .then(player => {
            res.render('draft/edit', { player })
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update
router.put('/:id', (req, res) => {
    const playerId = req.params.id

    // req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    Player.findByIdAndUpdate(playerId, req.body, { new: true })
        .then(player => {
            res.redirect(`/draft/${player._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})


// GET route for displaying my form for create
router.get('/newteam', (req, res) => {
    const api = require('espn-fantasy-football-api/node');
    res.render('draft/newteam')
})

// POST - Create
router.post('/', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    // now that we have user specific routes, we will add a username upon creation. 
    // remember, when we logged in, we saved the username to the session object.
    // using the ._id to set the owner field
    req.body.owner = req.session.userId

    Player.create(req.body)
        .then(players => {
            // console.log(fruit)
            res.redirect('/players')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Index
// localhost:3002/draft
router.get('/', (req, res) => {
    // use mongoose to find all fruits
    Player.find({})
    // return fruits as JSON
        .then(players => {
            // res.json(fruit)
            res.render('players', { players })
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/mine', (req, res) => {
    // find the fruits associated with the logged in user
    Player.find({ owner: req.session.userId })
        .then(players => {
            res.render('draft/index', { players })
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
    

    // delete if we have fruits
 Player.deleteMany({})
    // insert data
    .then(() => {
        Player.create(startPlayers)
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
    const playerId = req.params.id

    Player.findById(playerId)
        // This will populate our User model fields
        // comment has an author field and that is the ref to the User model
        // always going to be a string of the value you want to populate
        // this also has to be another model
        .populate('comments.author')
        // send back some json
        .then(player => {
            // res.json(fruit)show route.
            const userId = req.session.userId
            const username = req.session.username
            res.render('players/show', { player, userId, username })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router