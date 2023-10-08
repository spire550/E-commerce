import React from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Offline>
        <div className="network">
          <i className="fas fa-wifi text-danger"></i>
           <span className="text-danger mx-1"> you are offline</span>
        </div>
      </Offline>
      <div className=" container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
