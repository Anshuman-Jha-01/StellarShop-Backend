// Import the necessary dependency
import mongoose from "mongoose";

// Create user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create user model
const User = mongoose.model("User", userSchema);

// Export the model
export default User;