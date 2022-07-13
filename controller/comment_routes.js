///////////////////////////////////////
// Import dependencies
///////////////////////////////////////
const express = require('express')
// making a router
const router = express.Router()
// importing fruit model to access database
const Team = require('../models/team')

// POST - Creation
// localhost:3001/comments/:fruitId <- A single fruit can have many comments.
router.post('/:teamId', (req, res) => {
    const teamId = req.params.teamId
    req.body.author = req.session.userId

    Team.findById(teamId)
    // afer we found a fruit, we want to take that fruit and add the comment
    .then(team => {
        // inside of this single fruit doc, there is a field called comments
        team.comments.push(req.body)

        // if we change a doc, we have to return and call .save() on the doc
        return team.save()
    })
    .then(team => {
        res.redirect(`/teams/${team._id}`)
    })
    .catch(err => {
            res.json(err)
    })
})

// DELETE - delete yeeting
// this route is going to go to localhost:3001/comments/delete/:fruitId/:commentId
router.delete('/delete/:teamId/:commentId', (req, res) => {
    const teamId = req.params.teamId
    const commentId = req.params.commentId

    // I want to find a fruit by its ID
    Team.findById(teamId) // single fruit doc will have many comments
    //  I want to find this comment by its ID
        .then(team => {
            const comment =  team.comments.id(commentId)

            // then I want to remove the comment
            comment.remove()

            // after making a change to the doc, you have to SAVE
            return team.save()
        })
        .then(team => {
            res.redirect(`/teams/${teamId}`)
        })
        .catch(err => {
            res.json(err)
    })

})

module.exports = router