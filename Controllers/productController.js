// Import the necessary dependencies
import CustomError from "../Utilities/CustomError.js";
import  Product  from "../Models/productModel.js";
import mongoose from "mongoose";

// Get all the products
export const getProducts = async(req, res, next) => {
    let products = await Product.find();
    if(products && products.length>0) {
        res.status(200).send(products);
    } else {
        next(new CustomError(404,false, "No products are available"));
    }
}

// Get a single product
export const getOneProduct = async(req, res, next) => {
    let {id} = req.params;
    let prodcut = await Product.findById(id);
    if(prodcut) {
        res.status(200).send(prodcut);
    } else {
        next(new CustomError(404,false, "No such product is available"));
    }
}

// Create a product
export const createProduct = async(req, res) => {
    let {name, price, image, stock} = req.body;
    let newProduct = new Product({name: name, price: price, image: image, stock: stock});
    let result = await newProduct.save();
    if(result) {
        res.status(200).send(result);
    } else {
        next(new CustomError(500,false, "An error occurred"));
    }
}

// Update a product
export const updateProduct = async(req, res, next) => {
    let {id} = req.params;
    let {name, price, image, stock} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        next(new CustomError(400,false, "Invalid Id"));
    }
    let result = await Product.findByIdAndUpdate(id, {name: name, price: price, image: image, stock: stock}, {new: true, runValidators: true});
    if(result) {
        res.status(200).send({success: true, message: "Product data updated successfully", data: result});
    } else {
        next(new CustomError(404,false, "The product does not exist"));
    }
}

// Delete a product 
export const deleteProduct = async(req, res, next) => {
    let {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        next(new CustomError(400, false, "Invalid Id"));
    }
    let result = await Product.findByIdAndDelete(id);
    if(result) {
        res.status(200).send({success: true, message:"Product successfully deleted."});
    } else {
        next(new CustomError(404, false, "The product does not exist"));
    }
}