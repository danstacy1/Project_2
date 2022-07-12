///////////////////////////////////////
// Import dependencies
///////////////////////////////////////
const express = require('express')
// making a router
const router = express.Router()
// importing fruit model to access database
const Fruit = require('../models/fruit')

// POST - Creation
// localhost:3001/comments/:fruitId <- A single fruit can have many comments.
router.post('/:fruitId', (req, res) => {
    const fruitId = req.params.fruitId
    req.body.author = req.session.userId

    Fruit.findById(fruitId)
    // afer we found a fruit, we want to take that fruit and add the comment
    .then(fruit => {
        // inside of this single fruit doc, there is a field called comments
        fruit.comments.push(req.body)

        // if we change a doc, we have to return and call .save() on the doc
        return fruit.save()
    })
    .then(fruit => {
        res.redirect(`/fruits/${fruit._id}`)
    })
    .catch(err => {
            res.json(err)
    })
})

// DELETE - delete yeeting
// this route is going to go to localhost:3001/comments/delete/:fruitId/:commentId
router.delete('/delete/:fruitId/:commentId', (req, res) => {
    const fruitId = req.params.fruitId
    const commentId = req.params.commentId

    // I want to find a fruit by its ID
    Fruit.findById(fruitId) // single fruit doc will have many comments
    //  I want to find this comment by its ID
        .then(fruit => {
            const comment =  fruit.comments.id(commentId)

            // then I want to remove the comment
            comment.remove()

            // after making a change to the doc, you have to SAVE
            return fruit.save()
        })
        .then(fruit => {
            res.redirect(`/fruits/${fruitId}`)
        })
        .catch(err => {
            res.json(err)
    })

})

module.exports = router