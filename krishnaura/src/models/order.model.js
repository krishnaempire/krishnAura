import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
