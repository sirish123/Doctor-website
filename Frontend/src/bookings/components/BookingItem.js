import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./BookingItem.css";

const BookingItem = (props) => {
  return (
    <li className="booking-item">
      <Card className="booking-item__content center">
        <div className="booking-item__info">
          <h2>{props.uniqueid}{"   "}{props.date}</h2>
        </div>
        <Button to={`/booking/${props.id}`}>Update</Button>
      </Card>
      
    </li>
  );
};

export default BookingItem;
