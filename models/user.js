const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
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
});

userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
})

module.exports = mongoose.model('user', userSchema);