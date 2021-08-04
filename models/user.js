import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
      maxLength: [50, "Your name cannot exceed 50 characters."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      minLength: [6, "Your password must be atleast 6 characters."],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//Encrypting password before saving the user

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

//Compare user password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.models.User || mongoose.model("User", userSchema);
