import React from "react";
import Button from "../../shared/components/FormElements/Button";

import Card from "../../shared/components/UIElements/Card";
import "./PatientItem.css";

const PatientItem = (props) => {
  return (
    <li className="patient-item ">
      <Card className="patient-item__content center">
        <div className="patient-item__info">
          <h2>{props.name}{"  "}{props.number}{"  "}{props.dateofbirth}</h2>
        </div>
        <Button to={`/booking`}>Book</Button>
      </Card>
    </li>
  );
};

export default PatientItem;
