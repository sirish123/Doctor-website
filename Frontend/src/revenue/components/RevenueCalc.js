import React from "react";

const RevenueCalc = (props) => {
  return (
    <div className="row justify-content-center mt-5 m-0 p-0">
      <div className="col-lg-4 col-12 justify-content-center text-center">
        <div className="col text-start bg-white p-4 rounded-5 shadow-sm">
          <h4 className="fw-bold p-2 text-center text-primary">
            Revenue Report
          </h4>
          <h5>
            <span className="fw-bold pe-3">Revenue :</span>{" "}
            <span className="pe-1">₹</span>
            {props.totrevenue}
          </h5>
          <h5>
            <span className="fw-bold pe-3">Bookings:</span>
            <i className="bi bi-journal-check pe-1"></i>
            {props.bookings}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default RevenueCalc;
