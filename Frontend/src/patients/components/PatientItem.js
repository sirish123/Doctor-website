import React from "react";
import Button from "../../shared/components/FormElements/Button";


import "./PatientItem.css";

const PatientItem = (props) => {
  return (
    <>
      <div className="accordion accordion-flush" id="appointmentsList">
        <div className="accordion-item p-2">
          <div className="accordion-header">
           
              <div className="d-flex row w-100 header-row text-center">
                <span className="p-2 col-4">
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
                    <i className="bi bi-calendar p-2"></i>Date Of Birth
                  </strong>
                </span>
              </div>
          </div>
        </div>
      </div>
      <li className="patient-item ">
        <div className="accordion-header">
         
            <div className="d-flex row w-100 align-items-center text-center">
              <span className="p-2 col-4 overflow-auto">{props.name}</span>
              <span className="p-2 col-2 overflow-auto">{props.number}</span>
              <span className="p-2 col-2 overflow-auto">
                {props.dateofbirth}
              </span>
              <span className="p-2 col-2 overflow-auto">
              <Button to={`/booking/${props.name}/${props.number}`}>Book</Button>
              </span>
            </div>
         
        </div>
      </li>
    </>
  );
};

export default PatientItem;
