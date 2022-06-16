import React from "react";
import Card from "../../shared/components/UIElements/Card";
import BookingItem from "./BookingItem";
import "./BookingList.css";

const BookingList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="booking-list center">
        <Card>
          <h3>No Bookings found</h3>
        </Card>
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
                <th>Name</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            {props.items.map((Booking) => (
              <BookingItem
                key={Booking.id}
                id={Booking.id}
                time={Booking.time}
                date={Booking.date}
                uniqueid={Booking.uniqueid}
                diagnosis={Booking.diagnosis}
                name={Booking.name}
              />
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingList;
