import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PatientItem from "./PatientItem";
import "./PatientList.css";

const PatientList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="patient-list center">
        <Card>
          <h4 className="p-3 w-100 col-4   text-center roboto">
            No Patients Found.
          </h4>
          <Button special={`/newPatient`}>
            <span href="/#" className="btn btn-primary w-100">
              <i className="bi bi-pen-fill p-2"></i>Create New Patient
            </span>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="row mt-3 p-2 justify-content-center text-center">
        <div className="col-lg-10 p-0 shadow-sm recordHolder">
        <table className="table table-condensed recordTable table-borderless position-relative">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Date of Birth</th>
                <th>Book</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {props.items.map((Patient) => (
              <PatientItem
                key={Patient.id}
                id={Patient.id}
                name={Patient.name}
                address={Patient.address}
                number={Patient.number}
                dateofbirth={Patient.dateofbirth}
                onDelete={props.onDelete}
              />
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientList;
