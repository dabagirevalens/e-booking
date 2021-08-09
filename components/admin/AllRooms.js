import React, { useEffect } from "react";

import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import {
  getAdminRooms,
  deleteRoom,
  clearErrors,
} from "../../redux/actions/roomActions";

import { DELETE_ROOM_REQUEST } from "../../redux/constants/roomConstants";

const AllRooms = () => {
  //

  const dispatch = useDispatch();

  const { loading, error, rooms } = useSelector((state) => state.allRooms);
  const { error: deleteError, isDeleted } = useSelector((state) => state.room);

  useEffect(() => {
    //
    dispatch(getAdminRooms());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
    }

    if (isDeleted) {
      router.push("/admin/rooms");
      dispatch({ type: DELETE_ROOM_REQUEST });
    }
  }, [dispatch, error, deleteError, isDeleted]);

  const setRooms = () => {
    const data = {
      columns: [
        {
          label: "Room Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price / Night",
          field: "price",
          sort: "asc",
        },
        {
          label: "Category",
          field: "category",
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

    rooms &&
      rooms.forEach((room) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: `$${room.pricePerNight}`,
          category: room.category,
          actions: (
            <>
              <Link href={`/admin/reviews/${room._id}`}>
                <a className="btn btn-success mr-2">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>

              <Link href={`/admin/rooms/${room._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>

              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteRoomHandler(room._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const deleteRoomHandler = (id) => {
    dispatch(deleteRoom(id));
  };

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">
            {`${rooms && rooms.length} Room${rooms.length === 1 ? "" : "s"}`}

            <Link href="/admin/rooms/new">
              <a className="mt-0 btn text-white float-right new-room-btn">
                Create new room
              </a>
            </Link>
          </h1>

          {rooms && rooms.length > 0 && (
            <MDBDataTable
              data={setRooms()}
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

export default AllRooms;
