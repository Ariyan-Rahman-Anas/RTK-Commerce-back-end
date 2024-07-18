const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the review schema
const reviewSchema = new Schema({
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
  reviewerName: String,
  reviewerEmail: String,
});

// Define the meta schema
const metaSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: String,
  qrCode: String,
});

// Define the product schema
const productSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    weight: Number,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [reviewSchema],
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: metaSchema,
    images: [String],
    thumbnail: String,
  },
  { timestamps: true, versionKey: false }
);

// Create the product model
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;