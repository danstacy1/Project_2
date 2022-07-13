// If you want to use mongoose, you have to require it.
const mongoose = require('mongoose')
// The '..' leaves your prior file and the you connect to the new file.
const Team = require('../models/team.js')

// mongoose-crud is my database
// we declared here that this will be the database that we will use. 
const URI = 'mongodb://127.0.01/draft-crud'

// Have to pass in these option for deprecation warnnings and errors.
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', function () {
    Team.find({})
        .then(console.log)
        .catch(console.error)
        .finally(() => db.close())
})