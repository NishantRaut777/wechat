const Message = require("../models/message.model");
const User = require("../models/user.model");
const cloudinary  = require("../lib/cloudinary");
const { getReceiverSocketId } = require("../lib/socket");
const { io } = require("../lib/socket");

const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getMessages = async(req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        return res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const sendMessage = async(req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // to makes sure that message goes to only that particular socketid
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        return res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getUsersForSidebar, getMessages, sendMessage }