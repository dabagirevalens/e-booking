import React, { useEffect } from "react";

import { MDBDataTable } from "mdbreact";
import easyinvoice from "easyinvoice";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import { clearErrors } from "../../redux/actions/bookingActions";

const MyBookings = () => {
  const dispatch = useDispatch();

  const { myBookings, error } = useSelector((state) => state.myBookings);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: "Room Name",
          field: "room",
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
          room: booking.room.name,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
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
            </>
          ),
        });
      });

    return data;
  };

  const downloadInvoice = async (booking) => {
    var data = {
      documentTitle: "E-booking INVOICE",
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

  return (
    <div className="container container-fluid">

      {myBookings && myBookings.length === 0 ?
        <div className="alert alert-danger mt-5">No Bookings.</div>
        : <h1 className="my-5">
          {`${myBookings && myBookings.length} Booking${myBookings.length === 1 ? "" : "s"}`}
        </h1>
      }
      {myBookings.length === 0 &&
        <div className="">
          <p><Link href='/'><a className="back_to_book">Go back</a></Link> to book one.</p>
        </div>
      }

      {myBookings && myBookings.length > 0 &&
        <MDBDataTable
          data={setBookings()}
          className="px-2"
          bordered
          striped
          hover
        />
      }
    </div>
  );
};

export default MyBookings;
