import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

import RoomItem from "./room/RoomItem";
import { clearErrors } from "../redux/actions/roomActions";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } =
    useSelector((state) => state.allRooms);

  let { page = 1 } = router.query;
  page = +page;

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
        <h2 className="mb-3 ml-2 stays-heading">@find where to stay.</h2>

        <a href="#" className="ml-2 back-to-search">
          {" "}
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        <div className="row">
          {rooms && rooms.length === 0 ? (
            <div className="alter alter-danger">
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>

      {resPerPage < roomsCount && (
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
