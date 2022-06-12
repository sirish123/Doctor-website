import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./BookingItem.css";

const BookingItem = (props) => {
  return (
    <>
      <li className="booking-item">
        <div className="accordion-item">
          <div className="accordion-header">
            <div className="d-flex row w-200 align-items-center text-center">
              <span className="p-2 col-2 overflow-auto">{props.name}</span>
              <span className="p-2 col-2 overflow-auto">{props.uniqueid}</span>
              <span className="p-2 col-2 overflow-auto">
                {props.date.substring(8, 10) +
                  "-" +
                  props.date.substring(5, 7) +
                  "-" +
                  props.date.substring(0, 4)}
              </span>
              <span className="p-2 col-2 overflow-auto">{props.time}</span>
              <span className="p-2 col-2 overflow-auto">{props.diagnosis}</span>
              <span className="p-2 col-2 overflow-auto">
                <button to={`/booking/${props.id}`} className="btn btn-primary">
                  Update
                </button>
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default BookingItem;
