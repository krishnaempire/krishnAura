import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

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
  content: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
