const express = require('express')
// making a router
const router = express.Router()
// importing fruit model to access database
const Team = require('../models/team')
const Player = require('../models/player')
const User = require('../models/user')



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
    Team.find({})
    .then(teams => {
        // console.log('THIS IS THE LIST OF TEAMS')
        console.log(teams)
        // console.log('///////////////////')
        res.render('draft/newteam', {teams})
    })
    .catch(error => {
        console.log(error)
        res.json({ error })
    })
})


// POST - Create
router.post('/', (req, res) => {
    // now that we have user specific routes, we will add a new team upon creation. 
    // remember, when we logged in, we saved the username to the session object.
    // using the ._id to set the owner field
    req.body.owner = req.session.userId
    Team.create(req.body)
    .then(teams => {
        console.log('this is the created team', {teams})
        res.redirect(`/draft/draft`)
    })
    .catch(err => {
        res.json(err)
    })
})

// DELETE - Delete Team
router.delete('/:id', (req, res) => {
    const teamId = req.params.id
    console.log('delete route')
    Team.findByIdAndRemove(teamId)
        .then(team => {
            res.redirect('/draft/newteam')
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

// GET - Index Page
// localhost:3002/draft/draft
router.get('/draft/', (req, res) => {
    Player.find({}).sort({averageDraftPositionPPR: 1})
    .then(players => {
                // console.log('this is the player data', players)
                res.render('draft/draft', { players })
            })
            .catch(err => {
                res.json(err)
            })
})

// PUT Draft route
router.put('/draft/:playerId', (req, res) => {
    const {playerId} = req.params
    // console.log('playerID', playerId)
    Player.findByIdAndUpdate(playerId)
    // return players as JSON
    .then(player => {
        console.log('this is the player data', player)

            // const teams = Team.find({ owner: req.session.userId })
            // // const players = Team.find({ players })
            // console.log('info', teams)
            // // console.log('teams', teams)
            // teams.players.push(playerId)

            player.drafted = true
            player.save()
            res.redirect('/draft/draft')
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

router.get('/myteam', async (req, res) => {
    // Show the team name of who is logged in
    const teams = await Team.find({ owner: req.session.userId })
    // Show the players on your team
    const players = await Player.find({})
    Player.find({}).sort({averageDraftPositionPPR: 1})
        res.render('draft/myteam', { teams, players})
    })

router.post('/myteam', (req, res) => {
    console.log(req.body) 
    const playerId = req.params.playerId
    // find the team associated with the logged in user
    console.log('this is the user Id', req.session.userId)
    Team.find({owner: req.session.userId})
        .then(players => {
            res.render('draft/myteam', {players})
        })
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

// PUT MyTeam route
router.put('/myteam/:playerId', (req, res) => {
    const {playerId} = req.params
    // use mongoose to find all players
    // Team.find({})
    //     .then(teams => {
    //         console.log('this is the team data', teams)
    //         // res.json(fruit)
    //         res.render('draft/draft', { teams })
    //     })
    Player.findByIdAndUpdate(playerId)
        .then(player => {
            console.log('this is the player data', player)
            player.drafted = false
            player.save()
            res.redirect('/draft/myteam')
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/playerrankings/', (req, res) => {
    Player.find({}).sort({averageDraftPositionPPR: 1})
    // return players as JSON
        .then(players => {
            // console.log('this is the player data', players)
            // res.json(fruit)
            res.render('draft/playerrankings', { players })
        })
        .catch(err => {
            res.json(err)
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
            res.render('draft/show', { player, userId, username })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router