import { combineReducers } from "redux";

import {
  allRoomsReducer,
  roomDetailsReducer,
  newReviewReducer,
  checkReviewReducer,
  newRoomReducer,
  roomReducer,
  roomReviewsReducer,
  reviewReducer
} from "./roomReducers";

import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  loadedUserReducer,
  allUsersReducer,
  userDetailsReducer
} from "./userReducers";

import {
  checkBookingReducer,
  bookedDatesReducer,
  myBookingsReducer,
  bookingDetailsReducer,
  bookingReducer
} from "./bookingReducers";

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  room: roomReducer,
  auth: authReducer,
  user: userReducer,
  allUsers : allUsersReducer,
  userDetails : userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  loadedUser: loadedUserReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  myBookings: myBookingsReducer,
  booking:bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  newRoom: newRoomReducer,
  roomReviews : roomReviewsReducer,
  review: reviewReducer,
});

export default reducer;
