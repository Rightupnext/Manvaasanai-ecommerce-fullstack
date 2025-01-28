const mongoose = require("mongoose");
const multer = require("multer");
const { GridFSBucket } = require("mongodb");
const crypto = require("crypto");
const path = require("path");
const Product = require("../models/Product");
const Category = require("../models/Category");
// MongoDB connection
const mongoURI = process.env.MONGO_URI;
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize GridFSBucket
let gridFSBucket;
conn.once("open", () => {
  gridFSBucket = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("GridFSBucket Initialized");
});

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Controller to add a new product
exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      discountprice,
      offer,
      packSize,
      available,
    } = req.body;

    // Check if files are provided
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    // Upload images to GridFS
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const filename = `${crypto
          .randomBytes(16)
          .toString("hex")}${path.extname(file.originalname)}`;
        const uploadStream = gridFSBucket.openUploadStream(filename, {
          contentType: file.mimetype,
        });

        uploadStream.end(file.buffer);

        uploadStream.on("finish", () => {
          console.log(`File uploaded successfully: ${filename}`);
          resolve(filename); // Resolve with the uploaded filename
        });

        uploadStream.on("error", (err) => {
          console.error("Error uploading file:", err);
          reject(err); // Reject on error
        });
      });
    });

    const images = await Promise.all(uploadPromises); // Wait for all uploads to finish
    console.log("Uploaded Images:", images);

    // Create a new product with the uploaded images
    const newProduct = new Product({
      title,
      description,
      price,
      discountprice,
      offer,
      packSize,
      available,
      category,
      image: images, // Store the image filenames
    });

    const savedProduct = await newProduct.save();
    console.log("Saved Product:", savedProduct);

    res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        if (product.image && product.image.length > 0) {
          // Fetch images from GridFS
          const imagePromises = product.image.map((filename) => {
            return new Promise((resolve, reject) => {
              const downloadStream =
                gridFSBucket.openDownloadStreamByName(filename);

              let data = "";
              downloadStream.on("data", (chunk) => {
                data += chunk.toString("base64");
              });

              downloadStream.on("end", () => {
                resolve(`data:image/jpeg;base64,${data}`);
              });

              downloadStream.on("error", (err) => {
                console.error(`Error downloading image: ${filename}`, err);
                reject(err);
              });
            });
          });

          const images = await Promise.all(imagePromises);
          return { ...product, images };
        }

        return product;
      })
    );

    // Return both processed products and original products if needed
    res.status(200).json({
      message: "Products fetched successfully",
      productsWithImages,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getImage = async (req, res) => {
  try {
    const { filename } = req.params;

    const downloadStream = gridFSBucket.openDownloadStreamByName(filename);

    downloadStream.on("data", (chunk) => {
      res.write(chunk);
    });

    downloadStream.on("end", () => {
      res.end();
    });

    downloadStream.on("error", (err) => {
      console.error("Error fetching image:", err);
      res.status(404).json({ error: "Image not found" });
    });
  } catch (error) {
    console.error("Error in getImage controller:", error);
    res.status(500).json({ error: error.message });
  }
};

// Add a review to a product
exports.addReview = async (req, res) => {
  try {
    const { productId, comment, rating } = req.body;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.reviews.push({ user: req.user.id, comment, rating });
    await product.save();

    res.json({ message: "Review added", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, price, discountprice, offer, packSize, available } = req.body;

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.discountprice = discountprice || product.discountprice;
    product.offer = offer || product.offer;
    product.packSize = packSize || product.packSize;
    product.available = available || product.available;

    // Update images if new ones are provided
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const filename = `${crypto.randomBytes(16).toString("hex")}${path.extname(file.originalname)}`;
          const uploadStream = gridFSBucket.openUploadStream(filename, {
            contentType: file.mimetype,
          });

          uploadStream.end(file.buffer);

          uploadStream.on("finish", () => {
            console.log(`File uploaded successfully: ${filename}`);
            resolve(filename); // Resolve with the uploaded filename
          });

          uploadStream.on("error", (err) => {
            console.error("Error uploading file:", err);
            reject(err); // Reject on error
          });
        });
      });

      // Wait for all uploads to finish and retrieve the filenames
      const images = await Promise.all(uploadPromises);
      console.log("Uploaded Images:", images);

      // Update the product's image field with the new images
      product.image = images;
    }

    // Save the updated product
    const updatedProduct = await product.save();
    console.log("Updated Product:", updatedProduct);

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Use deleteOne() instead of remove()
    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    // Extract category ID from the request parameters
    const { categoryId } = req.params;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch products related to the category
    const products = await Product.find({ category: categoryId }).populate(
      "category",
      "name"
    );

    // If no products found, return an empty array instead of 404
    return res.status(200).json(products.length > 0 ? products : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for getting product by title

exports.getProductByTitle = async (req, res) => {
  try {
    const { id } = req.params; // Get the title from the URL parameters

    // Search for the product by title (not _id)
    const product = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    console.error("Error fetching product by title:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
