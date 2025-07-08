import User from "../models/user.model.js";

export const addToFriends = async(req, res) => {
    try{
        const { email } = req.body;
        
        const loggedInUserId = req.user?._id?.toString();

        const targetUser = await User.findOne({ email });
        const loggedInUser = await User.findById(loggedInUserId);

        if(!targetUser){
            return res.status(400).json({ message: "User not found" });
        }

        const targetUserId = targetUser._id.toString();

        // Preventing adding self as friend
        if(loggedInUserId === targetUserId){
            return res.status(400).json({ message: "You cannot add yourself as a friend." });
        }

        if(!loggedInUser.friends.includes(targetUserId)){
            loggedInUser.friends.push(targetUserId);
        } else{
             return res.status(200).json({ message: "User already in friend list", user: loggedInUser });
        }

        if(!targetUser.friends.includes(loggedInUserId)){
            targetUser.friends.push(loggedInUserId);
        }

        await targetUser.save();
        await loggedInUser.save();

        return res.status(200).json({ message: "Friend added successfully.", user: loggedInUser });

    }catch(error){
        console.log(`addToFriends Controller Error : ${error}`);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}