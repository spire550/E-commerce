import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserToken } from "../../context/userToken";
export default function Navbar() {
  let navigate = useNavigate();
  let { userToken, setToken } = useContext(UserToken);

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="Home">
            <img src={logo} alt="logo" width={150} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken != null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="carts">
                    Carts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="categories">
                  Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="favorite">
                    Favorite
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-youtube"></i>
                <i className="fab mx-2 fa-tiktok"></i>
                <i className="fab mx-2 fa-instagram"></i>
              </li>

              {userToken == null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    onClick={() => {
                      logOut();
                    }}
                    className="nav-link "
                    to="login"
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
