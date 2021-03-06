// using an already connected mongoose, not a fresh one from node_modules.
const mongoose = require('./connection')
const commentSchema = require('./comment')

// inside of Mongoose I want the keys that are named Schema and model. (destructuring syntax)
const { Schema, model } = mongoose

// Schema is a set of rules for my model
const playerSchema = new Schema({
    name: String,
    position: String,
    team: String,
    averageDraftPositionPPR: Number,
    byeWeek: Number,
    drafted: {
        type: Boolean,
        required: true,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,// a single User ._id 
        ref: 'User', //const User = model('User', userSchema) the string of 'User' is how we reference a model
    },
    comments: [commentSchema] // this is saying that a fruit can have many comments, because it is an array. Comments are a sub doc of fruit.
}, {
    // This collects a timestamp for everytime you add something to the database.
    timestamps: true,
})

// The collection for all of the 'Fruit'(capitalized and singular) will be 'fruits'(lowercase and plural). It does this automatically.
// The first param is the model name and the second one is the schema that we created up above.
// Need to make a model

const Player = model('Player', playerSchema);

module.exports = Player