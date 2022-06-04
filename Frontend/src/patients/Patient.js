import React, { useState, useEffect } from "react";

import PatientList from "./components/PatientList";

const DUMMY_PLACES = [
  {
    id: "7760633623",
    name: "ASHOK",
    gender: "MALE",
    address: "shivajinagr",
  },
  {
    id: "7349359536",
    name: "Sirish",
    gender: "MALE",
    address: "kaggasdasapura",
  },
];

const Patient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPatients, setLoadedPatients] = useState([]);
  const [change, setchange] = useState(false);
  const [patientId, setPatientId] = useState("7760633620");
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
  }, [change]);
  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <div className="searcharea">
        <input type="text" onBlur={getInputValue} />
        <button
          type="button"
          className="btn btn-secondary btn-lg"
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
