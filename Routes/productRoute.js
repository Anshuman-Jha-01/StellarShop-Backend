// Import the necessary dependencies
import express from "express";
import asyncWrap from "../Utilities/asyncWrap.js";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "../Controllers/productController.js";

// Create the router
const router = express.Router({mergeParams: true});

router 
    .route("/")
    .get(asyncWrap(getProducts))  // Get all the products
    .post(asyncWrap(createProduct)); // Create a new product

router 
    .route("/:id")
    .get(asyncWrap(getOneProduct)) // Get a single product
    .patch(asyncWrap(updateProduct)) //Update a product
    .delete(asyncWrap(deleteProduct)); //Delete a product

export default router;