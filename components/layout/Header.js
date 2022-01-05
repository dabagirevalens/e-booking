/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";

import { useDispatch, useSelector, useStore } from "react-redux";
import { signOut } from "next-auth/client";

import { loadUser } from "../../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.loadedUser);


  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className="navbar row d-flex justify-content-between align-items-center flex-wrap sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className='navbar-brand"'>
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link href="/">
              {/* <img
                style={{ cursor: "pointer" }}
                src="/images/e-booking_logo.png"
                alt="e-booking"
              /> */}
              <h1 style={{ color: "green" }}>
                Umwezi Hotel.
              </h1>
            </Link>
          </div>
        </div>
        <div className="col-3 mt-3 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-flex float-right">
              <a
                className="btn dropdown-toggle"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>

                <span> {user && user.name} </span>
              </a>

              <div
                className="dropdown-menu position-absolute w-100"
                aria-labelledby="dropDownMenuButton"
              >

                {user.role === 'admin' &&
                  <>
                    <Link href="/admin/rooms">
                      <a className="dropdown-item">Rooms</a>
                    </Link>

                    <Link href="/admin/bookings">
                      <a className="dropdown-item">Bookings</a>
                    </Link>

                    <Link href="/admin/users">
                      <a className="dropdown-item">Users</a>
                    </Link>
                    <hr />
                  </>
                }

                <Link href="/bookings/me">
                  <a className="dropdown-item">My Bookings</a>
                </Link>
                <Link href="/me/update">
                  <a className="dropdown-item">Profile</a>
                </Link>
                <Link href="/">
                  <a
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}>
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            (!loading && <Link href="/login">
              <a className="btn px-4 text-white login-header-btn float-right">
                Login
              </a>
            </Link>)
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
