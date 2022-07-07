import React from "react";
import RevenueItem from "./RevenueItem";
import "./RevenueList.css";

const RevenueList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="revenue-list center">
        <h4 className="p-3 w-100 col-4 rounded-2 shadow-sm border bg-white text-center roboto">
          No Booking Found
        </h4>
      </div>
    );
  }

  return (
    <>
      <div className="row mt-3 p-2 justify-content-center text-center">
        <div className="col-lg-10 p-0 shadow-sm recordHolder">
          <table className="table table-condensed recordTable table-borderless position-relative">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Payment-Amount</th>
                <th>Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {props.items.map((Booking) => (
                <RevenueItem
                  key={Booking.id}
                  id={Booking.id}
                  time={Booking.time}
                  date={Booking.date}
                  paymentamount={Booking.paymentamount}
                  uniqueid={Booking.uniqueid}
                  diagnosis={Booking.diagnosis}
                  name={Booking.name}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RevenueList;
