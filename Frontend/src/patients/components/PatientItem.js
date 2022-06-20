import React from "react";
import Button from "../../shared/components/FormElements/Button";

const PatientItem = (props) => {
  return (
    <>
      <tr className="accordion-toggle align-middle record p-1">
        <td>{props.name}</td>
        <td>{props.number}</td>
        <td>{props.dateofbirth}</td>
        <td>
          <Button special={`/booking/${props.name}/${props.number}`}>
            <i className="bi bi-mouse p1"></i>
          </Button>
        </td>
      </tr>
    </>
  );
};

export default PatientItem;
