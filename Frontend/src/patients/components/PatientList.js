import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PatientItem from './PatientItem';
import './PatientList.css';

const PatientList = props => {
  if (props.items.length === 0) {
    return (
      <div className="patient-list center">
        <Card>
          <h2>No patients found.Create New Patient</h2>
          <button>Create</button>
        </Card>
      </div>
    );
  }

  return (
    <>
    <ul className="patient-details">
    {props.items.map(Patient => (
      <PatientItem
        key={Patient.id}
        id={Patient.id}
        name ={Patient.name}
        address ={Patient.address}
        number = {Patient.number}
      />
    ))}
  </ul>
  </>
  );
};

export default PatientList;
