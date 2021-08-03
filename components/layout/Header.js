/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className='navbar-brand"'>
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link href='/'>
            <img
              style={{ cursor: "pointer" }}
              src="/images/bookit_logo.png"
              alt="e-booking"
            />
            </Link>
          </div>
        </div>
        <div className="col-3 mt-3 mt-md-0 text-center">
          <a className="btn btn-primary px-4 text-white login-header-btn float-right">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
