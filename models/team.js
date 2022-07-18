// using an already connected mongoose, not a fresh one from node_modules.
const mongoose = require('./connection')
const commentSchema = require('./comment')

// inside of Mongoose I want the keys that are named Schema and model. (destructuring syntax)
const { Schema, model } = mongoose

// Schema is a set of rules for my model
const teamSchema = new Schema({
    name: String,
    owner: {
        type: Schema.Types.ObjectId,// a single User ._id 
        ref: 'User',
        unique: true
        //const User = model('User', userSchema) the string of 'User' is how we reference a model
    },
    comments: [commentSchema], // this is saying that a each team can have many comments, because it is an array. Comments are a sub doc of fruit.

    players: [
        {
            type: Schema.Types.ObjectId,// a single User ._id 
            ref: 'Player', 
        }
    ]
}, {
    // This collects a timestamp for everytime you add something to the database.
    timestamps: true,
})

// The collection for all of the 'Fruit'(capitalized and singular) will be 'fruits'(lowercase and plural). It does this automatically.
// The first param is the model name and the second one is the schema that we created up above.
// Need to make a model

const Team = model('Team', teamSchema);

module.exports = Team