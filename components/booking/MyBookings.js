import React, { useEffect } from "react";

import { MDBDataTable } from "mdbreact"

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import { myBookings, clearErrors } from "../../redux/actions/bookingActions";

const MyBookings = () => {

    const dispatch = useDispatch();

    const { myBookings, error } = useSelector((state) => state.myBookings)

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, error]);

    
    const setBookings = () => {
        const data ={
            columns : [
                {
                    label : 'Booking ID',
                    field : 'id',
                    sort : 'asc',
                },
                {
                    label : 'Check In',
                    field : 'checkIn',
                    sort : 'asc',
                },
                {
                    label : 'Check Out',
                    field : 'checkOut',
                    sort : 'asc',
                },
                {
                    label : 'Amount Paid',
                    field : 'amount',
                    sort : 'asc',
                },
                {
                    label : 'Actions',
                    field : 'actions',
                    sort : 'asc',
                },
            ],
            rows : [],
        }

        myBookings && myBookings.forEach(booking => {
            data.rows.push({
                id : booking._id,
                checkIn : new Date(booking.checkInDate).toLocaleString('en-US'),
                checkOut : new Date(booking.checkOutDate).toLocaleString('en-US'),
                amount :`$${booking.amountPaid}`,
                actions :
                <>
                    <Link href={`/bokings/${booking._id}`}>
                        <a className="btn btn-primary">
                            <i className="fa fa-eye"></i>
                        </a>
                    </Link>

                    <button className="btn btn-success mx-2">
                        <i className="fa fa-download"></i>
                    </button>
                </>
            })
        });

        return data
    }

    return (
        <div className="container container-fluid">
            <h1 className="my-5">
                My Bookings
            </h1>

            <MDBDataTable
                data = {setBookings()}
                className="px-3"  
                bordered
                striped 
                hover
            />
        </div>
    )
}

export default MyBookings
