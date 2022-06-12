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
   
      <ul className="booking-details">
        <div className="accordion-header">
          <div className="d-flex row w-150 header-row text-center">
            <span className="p-2 col-2">
              <strong>
                <i className="bi bi-person p-2"></i>Name
              </strong>
            </span>
            <span className="p-2 col-2">
              <strong>
                <i className="bi bi-telephone p-2"></i>Phone Number
              </strong>
            </span>
            <span className="p-2 col-2">
              <strong>
                <i className="bi bi-calendar p-2"></i>Date
              </strong>
            </span>
            <span className="p-2 col-2">
              <strong>
                <i className="bi bi-clock p-2"></i>Time
              </strong>
            </span>
            <span className="p-2 col-2">
              <strong>
                <i class="bi bi-file-medical p-2"></i>
                Diagnosis
              </strong>
            </span>
            <span className="p-2 col-2">
              <strong>
                <i className="bi bi-arrow-counterclockwise p-2"></i>
                Actions
              </strong>
            </span>
          </div>
        </div>
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
      </ul>
      
    </>
  );
};

export default BookingList;
