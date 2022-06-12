import React, { useState, useEffect } from "react";
import PatientList from "./components/PatientList";
import Card from "../shared/components/UIElements/Card";
const Patient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPatients, setLoadedPatients] = useState([]);
  const [change, setchange] = useState(false);
  const [patientId, setPatientId] = useState();
  const API_URL = `http://localhost:5000/api/patient/${patientId}`;

  const getInputValue = (event) => {
    setPatientId(event.target.value);
    console.log(patientId);
  };

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData.patient);
        setLoadedPatients(responseData.patient);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [change, API_URL]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
    
      <div className="search-area center">
        <input className="searchinp" type="text" onBlur={getInputValue} />
        <button
          type="button"
          className="other"
          onClick={() => setchange((change) => !change)}
        >
          Search Query
        </button>
      </div>

      <PatientList items={loadedPatients} />
    </>
  );
};

export default Patient;
