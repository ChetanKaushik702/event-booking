const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    createdEvents: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'event'
        }
    ]
})
module.exports = mongoose.model('user', userSchema);