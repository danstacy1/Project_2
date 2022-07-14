///////////////////////////////////////
// Import dependencies
///////////////////////////////////////
const express = require('express')
// making a router
const router = express.Router()
// importing fruit model to access database
const Team = require('../models/team')
const Player = require('../models/player')

// POST - Creation
// localhost:3001/comments/:fruitId <- A single fruit can have many comments.
router.post('/:playerId', (req, res) => {
    const playerId = req.params.playerId
    req.body.author = req.session.userId

    Player.findById(playerId)
    // afer we found a fruit, we want to take that fruit and add the comment
    .then(player => {
        // inside of this single fruit doc, there is a field called comments
        player.comments.push(req.body)

        // if we change a doc, we have to return and call .save() on the doc
        return player.save()
    })
    .then(player => {
        res.redirect(`/draft/${player._id}`)
    })
    .catch(err => {
            res.json(err)
    })
})

// DELETE - delete yeeting
// this route is going to go to localhost:3001/comments/delete/:fruitId/:commentId
router.delete('/delete/:playerId/:commentId', (req, res) => {
    const playerId = req.params.playerId
    const commentId = req.params.commentId

    // I want to find a fruit by its ID
    Player.findById(playerId) // single fruit doc will have many comments
    //  I want to find this comment by its ID
        .then(player => {
            const comment =  player.comments.id(commentId)

            // then I want to remove the comment
            comment.remove()

            // after making a change to the doc, you have to SAVE
            return player.save()
        })
        .then(player => {
            res.redirect(`/draft/${playerId}`)
        })
        .catch(err => {
            res.json(err)
    })

})

module.exports = router