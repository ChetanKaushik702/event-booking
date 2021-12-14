const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter event title']
    },
    description: {
        type: String,
        required: [true, 'Please enter event description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter event price']
    },
    date: {
        type: Date,
        required: [true, 'Please enter event date']
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('event', eventSchema);