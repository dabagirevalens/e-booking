import React, { useEffect } from "react";
import { useRouter } from 'next/router'

import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import { getAdminRooms, clearErrors } from "../../redux/actions/roomActions";

const AllRooms = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, error, rooms } = useSelector((state) => state.allRooms)

    console.log(rooms);

    useEffect(() => {

        dispatch(getAdminRooms())

        if(error) {
            toast.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, error]);


    const setRooms = () => {
        const data ={
            columns : [
                {
                    label : 'Room Id',
                    field : 'id',
                    sort : 'asc',
                },
                {
                    label : 'Name',
                    field : 'name',
                    sort : 'asc',
                },
                {
                    label : 'Price / Night',
                    field : 'price',
                    sort : 'asc',
                },
                {
                    label : 'Category',
                    field : 'category',
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

        rooms && rooms.forEach(room => {
            data.rows.push({
                id : room._id,
                name : room.name,
                price : `$${room.pricePerNight}`,
                category : room.category,
                actions :
                <>
                    <Link href={`/admin/rooms/${room._id}`}>
                        <a className="btn btn-primary">
                            <i className="fa fa-pencil"></i>
                        </a>
                    </Link>

                    <button 
                    className="btn btn-danger mx-2"
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        });

        return data
    }

    return (
        <div className="container container-fluid">
        {loading ? <Loader /> :
        <>
            <h1 className="my-5">
               {`${rooms && rooms.length} Rooms.`}
            </h1>

            <MDBDataTable
            data = {setRooms()}
            className="px-2"  
            bordered
            striped 
            hover
        />
        </>
        }
    </div>
    )
}

export default AllRooms
