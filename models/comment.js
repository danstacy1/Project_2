const mongoose = require('./connection')

const commentSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,// this will be a single User
        ref: 'User'// this is the string value from the model creation
    }
}, {
    timestamps: true
})

module.exports = commentSchema