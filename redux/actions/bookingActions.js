
import axios from "axios";
import absoluteUrl from 'next-absolute-url'


import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CHECK_BOOKING_RESET,
  CHECK_BOOKING_FAIL,

  BOOKED_DATES_SUCCESS,
  BOOKED_DATES_FAIL,

  MY_BOOKINGS_SUCCESS,
  MY_BOOKINGS_FAIL,

  CLEAR_ERRORS,
} from "../constants/bookingConstants";

export const checkBooking =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
      dispatch({ type: CHECK_BOOKING_REQUEST });

      let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

      const { data } = await axios.get(link);

      dispatch({
        type: CHECK_BOOKING_SUCCESS,
        payload: data.isAvailable,
      });
    } catch (error) {
      dispatch({
        type: CHECK_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getBookedDates = (roomId) => async (dispatch) => {
  try {

    const { data } = await axios.get(`/api/bookings/check_booked_dates?roomId=${roomId}`);

    dispatch({
      type: BOOKED_DATES_SUCCESS,
      payload: data.bookedDates,
    })
    
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myBookings = (authCookie, req) => async (dispatch) => {
  try {

    const config ={
      headers: {
        cookie: authCookie
      }
    }

    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/bookings/me`, config);

    dispatch({
      type: MY_BOOKINGS_SUCCESS,
      payload: data.myBookings,
    })
    
  } catch (error) {
    dispatch({
      type: MY_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
