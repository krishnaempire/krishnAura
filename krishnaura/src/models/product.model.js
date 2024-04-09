import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productImages: [{
    type: String,
    required: true
  }],
  stock: {
    type: Number,
    required: true
  },
  sells: {
    type: Number,
    default: 0 
  },
  off: {
    type: String
  },
  
  offPrice: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  size: [{
    name: {
      type: String,
      required: true
    },
    available: {
      type: Boolean,
      default: true 
    }
  }],
  color: [{
    name: {
      type: String,
      required: true
    },
    available: {
      type: Boolean,
      default: true 
    }
  }],
  type: {
    type: String,
    required: true
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;