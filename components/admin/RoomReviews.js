import React, { useState, useEffect } from "react";

import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import {
  getRoomReviews,
  deleteReview,
  clearErrors,
} from "../../redux/actions/roomActions";

import { DELETE_REVIEW_RESET } from "../../redux/constants/roomConstants";

const RoomReviews = () => {
  //

  const dispatch = useDispatch();
  const router = useRouter();

  const roomId = router.query.id;

  const { loading, error, reviews } = useSelector((state) => state.roomReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    //

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (roomId !== "") {
      dispatch(getRoomReviews(roomId));
    }

    if (deleteError) {
      toast.error(deleteError);
    }

    if (isDeleted) {
      toast.success("Review is deleted.");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, router, roomId, deleteError, isDeleted]);

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
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

    reviews &&
      reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,
          actions: (
            <button
              className="btn btn-danger mx-2"
              onClick={() => deleteReviewHandler(review._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          ),
        });
      });

    return data;
  };

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, roomId));
  };

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          {reviews && reviews.length === 0 ? (
            <div className="alert alert-danger mt-5 ">
              No Reviews For This Room.
            </div>
          ) : (
            <h1 className="my-5">
              {`${reviews && reviews.length} Review${
                reviews.length === 1 ? "" : "s"
              }`}
            </h1>
          )}
          {reviews && reviews.length > 0 && (
            <MDBDataTable
              data={setReviews()}
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

export default RoomReviews;
