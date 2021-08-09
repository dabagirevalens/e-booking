import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

import RoomItem from "./room/RoomItem";
import { clearErrors } from "../redux/actions/roomActions";
import Link from "next/link";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } =
    useSelector((state) => state.allRooms);

  let { page = 1, location } = router.query;
  page = +page;

  let count = roomsCount;
  if (location) {
    count = filteredRoomsCount;
  }

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors());
  }, [dispatch, error]);

  const handleCurrentPage = (pageNumber) => {
    window.location.href = `/?page=${pageNumber}`;
  };

  return (
    <>
      <section id="rooms" className="container mt-5">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h2 className="mb-3 ml-2 stays-heading">
            {location ? `Rooms in ${location}` : `@find where to stay.`}
          </h2>

          <Link href="/search">
            <a className="back-to-search ml-3">
              <i className="fa fa-search"></i> Search .....
            </a>
          </Link>
        </div>
        <div className="row">
          {rooms && rooms.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100 ">
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>

      {resPerPage < count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
            onChange={handleCurrentPage}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass={"page-item"}
            linkClass={"page-link"}
          />
        </div>
      )}
    </>
  );
};

export default Home;
