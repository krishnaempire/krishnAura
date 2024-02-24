import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifyToken: {
    type: String,
    default: null
  },
  verifyTokenExpiry: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Register the schema with mongoose
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
