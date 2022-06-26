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
        <h4 className="p-3 w-100 col-4   text-center roboto">No Patients Found.</h4>
          <Button special={`/newPatient`}>
            <a  href="/#" className="btn btn-primary w-100">
              <i class="bi bi-pen-fill p-2"></i>Create New Patient
            </a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div class="row mt-3 p-2 justify-content-center text-center">
        <div class="col-lg-10 p-0 shadow-sm recordHolder">
          <table class="table table-condensed recordTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Date of Birth</th>
                <th>Book</th>
                <th>Delete</th>
              </tr>
            </thead>
            {props.items.map((Patient) => (
              <PatientItem
                key={Patient.id}
                id={Patient.id}
                name={Patient.name}
                address={Patient.address}
                number={Patient.number}
                dateofbirth={Patient.dateofbirth}
                onDelete = {props.onDelete}
              />
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientList;
