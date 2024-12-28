// Import the necessary dependency
import mongoose from "mongoose";

// Create product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, "The minimum price is $1"]
    },
    image: {
        type: String,
        required: true,
        default: "https://images.pexels.com/photos/5490931/pexels-photo-5490931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    stock: {
        type: String,
        required: true
    }
}, {
    timestamps: true //createdAt and updatedAt
});

// Create product model
const Product = mongoose.model("Product", productSchema);

// Export the model
export default Product;