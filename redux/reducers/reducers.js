import { combineReducers } from "redux";

import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";

import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  loadedUserReducer,
} from "./userReducers";

import { checkBookingReducer, bookedDatesReducer } from "./bookingReducers";

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  loadedUser: loadedUserReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer
});

export default reducer;
