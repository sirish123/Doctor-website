import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './PatientItem.css';

const PatientItem = props => {
  return (
    <li className="patient-item">
      <Card className="patient-item__content">
        <div className="patient-item__info">
          <h3>{props.name}</h3>
          <h3>{props.number}</h3>
          <h3>{props.address}</h3>
        </div>
        
      </Card>
    </li>
  );
};

export default PatientItem;
