import mongoose from "mongoose";
import timeZone from "mongoose-timezone"

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Room",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    daysOfStay: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    paidAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

bookingSchema.plugin(timeZone)

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
