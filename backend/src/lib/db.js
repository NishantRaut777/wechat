const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connected to MongoDB successfully")
        })
        .catch((err) => {
            console.log("MongoDB Connection Error : ", err);
        })
    } catch (error) {
        console.log("MongoDB Connection Error : ", error);
    }
}

module.exports = { connectDB } ;