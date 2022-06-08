import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./BookingItem.css";

const BookingItem = (props) => {
  return (
    <>


      <li className="booking-item">
        <div className="accordion-item">
          <div className="accordion-header">
            <button
              className="accordion-button p-0 collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#patientTwo"
              aria-expanded="false"
              aria-controls="patientTwo"
            >
              <div className="d-flex row w-100 align-items-center text-center">
                <span className="p-2 col-4 overflow-auto">{props.name}</span>
                <span className="p-2 col-2 overflow-auto">{props.uniqueid}</span>
                <span className="p-2 col-2 overflow-auto"> {props.date}</span>
                <span className="p-2 col-2 overflow-auto">{props.time}</span>
                <span className="p-2 col-2 overflow-auto">
                  <a type="button" className="btn btn-outline-dark">
                    <i className="bi bi-mouse p1"></i>
                  </a>
                </span>
              </div>
            </button>
          </div>
          <div
            id="patientTwo"
            className="accordion-collapse collapse"
            aria-labelledby="patientTwo"
            data-bs-parent="#appointmentsList"
          >
            <div className="accordion-body">{props.diagnosis}</div>
            <Button to={`/booking/${props.id}`}>Update</Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default BookingItem;
