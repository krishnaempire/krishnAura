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
  }]
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;