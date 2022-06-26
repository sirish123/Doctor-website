import React from "react";
import Card from "../../shared/components/UIElements/Card";
import BookingItem from "./BookingItem";
import "./BookingList.css";

const BookingList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="booking-list center">
        <h4 className="p-3 w-100 col-4 rounded-2 shadow-sm border bg-white text-center roboto">
          No Booking Found
        </h4>
      </div>
    );
  }

  return (
    <>
      <div class="row mt-3 p-2 justify-content-center text-center">
        <div class="col-lg-10 p-0 shadow-sm recordHolder">
          <table class="table table-condensed recordTable">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Time</th>
                <th>Bill</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            {props.items.map((Booking) => (
              <BookingItem
                key={Booking.id}
                id={Booking.id}
                time={Booking.time}
                date={Booking.date}
                paymentamount={Booking.paymentamount}
                uniqueid={Booking.uniqueid}
                diagnosis={Booking.diagnosis}
                name={Booking.name}
                onDelete={props.onDelete}
              />
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingList;
