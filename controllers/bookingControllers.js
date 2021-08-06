import Booking from "../models/booking";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

import Moment from 'moment';
import { extendMoment } from "moment-range";


const moment = extendMoment(Moment)

// check room booking availability =>/api/booking/check?query

const checkRoomBookingAvailability = catchAsyncErrors(async (req, res) => {

    let { roomId, checkInDate, checkOutDate } = req.query;

    checkInDate = new Date(checkInDate)
    checkOutDate = new Date(checkOutDate)

    const bookings = await Booking.find({ 
        room : roomId,
        $and :[
            { 
                checkInDate : {
                    $lte : checkOutDate
                }
            },
            { 
                checkOutDate : {
                    $gte : checkInDate
                }
            }
        ]
    })

    //ckeck if there is any booking available 

    let isAvailable;

    if(bookings && bookings.length === 0) {
        isAvailable = true
    } else {
        isAvailable = false
    }

    res.status(200).json({
        success: true,
        isAvailable
    });
});


// Check booked dates fro room => /api/bookings/check_booked_dates

const checkRoomBookedDates = catchAsyncErrors(async (req, res) => {
    const { roomId } = req.query;

    const bookings = await Booking.find({ room : roomId})

    let bookedDates = []

    const timeDifference = moment().utcOffset() / 60;

    bookings.forEach((booking =>{

        const checkInDate = moment(booking.checkInDate).add(timeDifference);
        const checkOutDate = moment(booking.checkOutDate).add(timeDifference);

        const range = moment.range(moment(checkInDate), moment(checkOutDate))

        const dates = Array.from(range.by('day'))
        bookedDates = bookedDates.concat(dates)

    }))
  
    res.status(200).json({
      success: true,
      bookedDates,
    })

  });


  // Get all bookings for current user => /api/bookings/me

const myBookings = catchAsyncErrors(async (req, res) => {

    const myBookings = await Booking.find({ user: req.user._id});

    res.status(200).json({
      success: true,
      myBookings
    })

  });
  
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
      paidAt : Date.now(),
    });
  
    res.status(200).json({
      success: true,
      booking,
    });
  });
  

export { 
    newBooking ,
    checkRoomBookingAvailability,
    checkRoomBookedDates,
    myBookings
};
