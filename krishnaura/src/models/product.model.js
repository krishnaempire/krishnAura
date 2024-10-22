import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  productImages: [{
    type: String,
    required: true,
  }],
  stock: {
    type: Number,
    required: true,
  },
  sells: {
    type: Number,
    default: 0,

  },
  about: {
    type: String
  },
  description: {
    type: String,
    required: true,
  },
  size: [{
    name: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offPercentage: {
      type: Number,
      required: true
    },
    offPrice: {
      type: Number,
      required: true
    }
  }],
  color: [{
    name: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  }],
  type: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
