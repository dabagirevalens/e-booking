import Booking from "../models/booking";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

import Moment from "moment";
import { extendMoment } from "moment-range";

import ErrorHandler from '../utils/errorHandler';

const moment = extendMoment(Moment);

// Create new booking
const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
});

// check room booking availability =>/api/booking/check?query

const checkRoomBookingAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  //ckeck if there is any booking available

  let isAvailable;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

// Check booked dates fro room => /api/bookings/check_booked_dates

const checkRoomBookedDates = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  const timeDifference = moment().utcOffset() / 60;

  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(timeDifference);
    const checkOutDate = moment(booking.checkOutDate).add(timeDifference);

    const range = moment.range(moment(checkInDate), moment(checkOutDate));

    const dates = Array.from(range.by("day"));
    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

// Get all bookings for current user => /api/bookings/me

const myBookings = catchAsyncErrors(async (req, res) => {
  const myBookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "room",
      select: "_id name pricePerNight images ",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    myBookings,
  });
});

// Get all bookings - ADMIN => /api/admin/bookings

const allAdminBookings = catchAsyncErrors(async (req, res) => {

  const bookings = await Booking.find()
    .populate({
      path: "room",
      select: "_id name pricePerNight images ",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    bookings,
  })

})


// Get all bookings - ADMIN => /api/admin/bookings

const deleteBooking = catchAsyncErrors(async (req, res, next) => {

  const booking = await Booking.findById(req.query.id);

  if(!booking) {
      return next(new ErrorHandler("Room not found with this ID", 400))
  }

  await booking.remove();

  res.status(200).json({
    success: true,
  })

})

// Get booking details => /api/bookings/:id

const getBookingDetails = catchAsyncErrors(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "_id name pricePerNight images ",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    booking,
  });
});

export {
  newBooking,
  checkRoomBookingAvailability,
  checkRoomBookedDates,
  myBookings,
  getBookingDetails,
  allAdminBookings,
  deleteBooking
};
