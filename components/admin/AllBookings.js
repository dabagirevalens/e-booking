import React, { useEffect } from "react";

import { MDBDataTable } from "mdbreact";
import easyinvoice from "easyinvoice";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import { useRouter } from "next/router";

import Loader from "../layout/Loader";

import {
  getAdminBookings,
  deleteBooking,
  clearErrors,
} from "../../redux/actions/bookingActions";
import { DELETE_BOOKING_RESET } from "../../redux/constants/bookingConstants";

const AllBookings = () => {
  //

  const dispatch = useDispatch();
  const router = useRouter();

  const { myBookings, error, loading } = useSelector(
    (state) => state.myBookings
  );
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(getAdminBookings());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/bookings");
      dispatch({ type: DELETE_BOOKING_RESET });
    }
  }, [dispatch, error, isDeleted, deleteError, router]);

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: "Booking Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Check In",
          field: "checkIn",
          sort: "asc",
        },
        {
          label: "Check Out",
          field: "checkOut",
          sort: "asc",
        },
        {
          label: "Amount Paid",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    myBookings &&
      myBookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/admin/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>

              <button
                className="btn btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fa fa-download"></i>
              </button>

              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteBookingHandler(booking._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const downloadInvoice = async (booking) => {
    var data = {
      documentTitle: "E-booking Booking",
      currency: "USD",
      taxNotation: "vat",
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "https://res.cloudinary.com/images-bucket/image/upload/v1628400008/e-booking_logo_vwwioa.png",
      background:
        "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
      sender: {
        company: "company : E-booking",
        address: "address : Kigali Rwanda",
        zip: "",
        city: "email : vdabagire@gmail.com",
        country: "phone : (250) 781792484",
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: "",
        city: `Check in date : ${new Date(booking.checkInDate).toLocaleString(
          "en-US"
        )}`,
        country: `Check out date : ${new Date(
          booking.checkOutDate
        ).toLocaleString("en-US")}`,
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString("en-US")}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: 0,
          price: booking.room.pricePerNight,
        },
      ],
      bottomNotice:
        "This is auto generated invoice of your booking on E-booking.",
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_e-booking_${booking._id}.pdf`, result.pdf);
  };

  const deleteBookingHandler = (id) => {
    dispatch(deleteBooking(id));
  };

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          {myBookings && myBookings.length === 0 ? 
          <div className="alert alert-danger mt-5">No Bookings.</div>  
          : <h1 className="my-5">
          {`${myBookings && myBookings.length} Booking${
            myBookings.length === 1 ? "" : "s"}`}
        </h1>
        }
          
          {myBookings && myBookings.length > 0 && (
            <MDBDataTable
              data={setBookings()}
              className="px-2"
              bordered
              striped
              hover
            />
          )}
        </>
      )}
    </div>
  );
};

export default AllBookings;
