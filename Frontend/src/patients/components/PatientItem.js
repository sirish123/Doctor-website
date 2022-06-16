import React from "react";
import Button from "../../shared/components/FormElements/Button";

import "./PatientItem.css";

const PatientItem = (props) => {
  return (
    <>
      {/* <li className="patient-item ">
        <div className="accordion-header">
          <div className="d-flex row w-100 align-items-center text-center">
            <span className="p-2 col-4 overflow-auto">{props.name}</span>
            <span className="p-2 col-2 overflow-auto">{props.number}</span>
            <span className="p-2 col-2 overflow-auto">{props.dateofbirth}</span>
            <span className="p-2 col-2 overflow-auto">
              <Button to={`/booking/${props.name}/${props.number}`}>
                Book
              </Button>
            </span>
          </div>
        </div>
      </li> */}

      <tr class="accordion-toggle align-middle record p-1">
        <td>{props.name}</td>
        <td>{props.number}</td>
        <td>{props.dateofbirth}</td>
        <td>
          <Button to={`/booking/${props.name}/${props.number}`}>
            <i class="bi bi-mouse p1"></i>
          </Button>
        </td>
      </tr>
    </>
  );
};

export default PatientItem;
