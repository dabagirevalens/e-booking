import React from "react";

import { useSelector } from "react-redux";
import RoomItem from "./room/RoomItem";

const Home = () => {
  const { rooms } = useSelector((state) => state.allRooms);

  return (
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">STAYS IN NEW YORK</h2>

      <a href="#" className="ml-2 back-to-search">
        {" "}
        <i className="fa fa-arrow-left"></i> Back to Search
      </a>
      <div className="row">
        {rooms && rooms.length === 0 ?
        <div className="alter alter-danger">
          <b>No Rooms.</b>
        </div> :  
        rooms.map(room => (
          <RoomItem key={room._id} room={room} />
        ))
      }
      </div>
    </section>
  );
};

export default Home;
