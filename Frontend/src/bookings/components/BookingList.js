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
      <ul className="booking-details">
        {props.items.map((Booking) => (
          <BookingItem
            key={Booking.id}
            id={Booking.id}
            time={Booking.time}
            date={Booking.date}
            uniqueid={Booking.uniqueid}
          />
        ))}
      </ul>
  );
};

export default BookingList;
