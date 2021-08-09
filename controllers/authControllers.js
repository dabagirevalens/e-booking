import cloudinary from "cloudinary";
import User from "../models/user";

import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";

import absoluteUrl from "next-absolute-url";
import crypto from "crypto";

//setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//User register => /api/auth/register
const userRegister = catchAsyncErrors(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "e-booking/avatars",
    width: "150",
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Account created successfully",
  });
});

// Current user profile => /api/me
const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile => /api/me
const updateProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (req.user.name) {
      user.name = req.body.name;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.password) user.password = req.body.password;

    //update avatar

    if (req.body.avatar !== "") {
      const image_id = user.avatar.public_id;

      //delete user previous image/avatar

      await cloudinary.v2.uploader.destroy(image_id);

      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "e-booking/avatars",
        width: "150",
        crop: "scale",
      });

      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

// Forgot password => /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  //Get reset password token
  const resetToken = user.getPasswordResetToken();

  // console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  //Get origin
  const { origin } = absoluteUrl(req);

  //Create password reset url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `
  Your password reset url is as follow : \n\n\n 
  ${resetUrl} \n\n\n
  If you have not requested this email, then ignore it.
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "E-booking Email Recovery.",
      text: message,
    });

    res.status(200).json({
      success: true,
      message: `Email has been sent to: ${user.email}`,
    });
  } catch (error) {
    
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpire = undefined),
      await user.save({ validateBeforeSave: fasle });

    return new ErrorHandler(error.message, 500);
  }
});

// Reset password => /api/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash reset password token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Set new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

// Get all users => /api/admin/users

const allAdminUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get user details => /api/admin/users/:id

const getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this ID.", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Get user details => /api/admin/users/:id

const updateUserDetails = catchAsyncErrors(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
    new: true,
    runValidators: false,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete user  => /api/admin/users/:id

const deleteUser = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this ID.", 400));
  }

  //Remove avatar.

  const image_id = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await user.remove();

  res.status(200).json({
    success: true,
    user,
  });
});

export {
  userRegister,
  currentUserProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  allAdminUsers,
  getUserDetails,
  updateUserDetails,
  deleteUser
};
