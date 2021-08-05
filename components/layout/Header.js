/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import { loadUser } from "../../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  console.log(user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className='navbar-brand"'>
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link href="/">
              <img
                style={{ cursor: "pointer" }}
                src="/images/bookit_logo.png"
                alt="e-booking"
              />
            </Link>
          </div>
        </div>
        <div className="col-3 mt-3 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-line">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className='rounded-circle'
                  />
                </figure>

                 <span> {user && user.name} </span>
              </a>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <a className="btn btn-primary px-4 text-white login-header-btn float-right">
                  Login
                </a>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
