const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected successfully to ${res.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;