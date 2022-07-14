const express = require('express')
// making a router
const router = express.Router()
// importing fruit model to access database
const Team = require('../models/team')
const Player = require('../models/player')


// DELETE - Delete
router.delete('/:id', (req, res) => {
    const teamId = req.params.id

    Team.findByIdAndRemove(teamId)
        .then(team => {
            res.redirect('/draft')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const teamId = req.params.id

    Team.findById(teamId)
        .then(team => {
            res.render('draft/edit', { team })
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update
router.put('/:id', (req, res) => {
    const teamId = req.params.id

    // req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    Team.findByIdAndUpdate(teamId, req.body, { new: true })
        .then(team => {
            res.redirect(`/draft/${team._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})


// GET route for displaying my form for create
router.get('/newteam', (req, res) => {
    res.render('draft/newteam')
})

// POST - Create
router.post('/', (req, res) => {
    // now that we have user specific routes, we will add a new team upon creation. 
    // remember, when we logged in, we saved the username to the session object.
    // using the ._id to set the owner field
    req.body.owner = req.session.userId

    Team.create(req.body)
        .then(teams => {
            console.log('this is the created team', teams)
            res.redirect(`/draft/draft`)
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Signin
// localhost:3002/draft
router.get('/', (req, res) => {
    // use mongoose to find all fruits
    Team.find({})
    // return fruits as JSON
        .then(teams => {
            // res.json(fruit)
            res.render('draft/welcome', { teams })
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Draft Page
// localhost:3002/draft/draft
router.get('/draft/', (req, res) => {
    // use mongoose to find all players
    // Team.find({})
    //     .then(teams => {
    //         console.log('this is the team data', teams)
    //         // res.json(fruit)
    //         res.render('draft/draft', { teams })
    //     })
    Player.find({})
    // return players as JSON
        .then(players => {
            console.log('this is the player data', players)
            // res.json(fruit)
            res.render('draft/draft', { players })
        })
        .catch(err => {
            res.json(err)
        })
})


router.get('/myteam', (req, res) => {
    // find the fruits associated with the logged in user
    Team.find({ owner: req.session.userId })
        .then(team => {
            res.render('draft/myteam', { teams })
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

// seed route
// insert many items into our database with just going to this route.
// localhost:3000/fruits/seed/
// router.get('/seed', (req,res) => {
//     // starting data
    

//     // delete if we have fruits
//  Team.deleteMany({})
//     // insert data
//     .then(() => {
//         Tea.create(startplayerPool)
//         // return this daata as JSON to view
//         .then(data => {
//             res.json(data)
//         })
//         // This does the came thing '.catch(err => console.error(err))'
//         .catch(console.error)
//     })
   
// })

// GET - Show
// localhost:3000/fruits/:id <- change with the id being passed in
router.get('/:id', (req, res) => {
    const teamId = req.params.id

    Team.findById(teamId)
        // This will populate our User model fields
        // comment has an author field and that is the ref to the User model
        // always going to be a string of the value you want to populate
        // this also has to be another model
        .populate('comments.author')
        // send back some json
        .then(team => {
            // res.json(fruit)show route.
            const userId = req.session.userId
            const username = req.session.username
            res.render('draft/show', { team, userId, username })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router