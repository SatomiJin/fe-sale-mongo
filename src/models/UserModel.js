import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  ward: { type: String },
  district: { type: String },
  city: { type: String },
  detailAddress: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    phoneNumber: { type: String },
    address: { type: addressSchema },
    image: { type: String },
    gender: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
