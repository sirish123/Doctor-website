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
      {/* <div className="search-area center">
        <input className="searchinp" type="text" onBlur={getInputValue} />
        <button
          type="button"
          className="other"
          onClick={() => setchange((change) => !change)}
        >
          Search Query
        </button>
      </div> */}

      <div class="container-fluid mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-6 border border-2 rounded shadow-sm searchBox">
            <form class="row g-3 m-2">
              <h1>Search Patient</h1>
              <div>
                <input
                  type="tel"
                  class="form-control"
                  onBlur={getInputValue}
                  id="searchByPhoneNumberBookings"
                  placeholder="Phone Number"
                />
              </div>
              <div class="mb-3 w-100 text-end">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => setchange((change) => !change)}
                >
                  <i class="bi bi-search p-2"></i>Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <PatientList items={loadedPatients} />
      </div>
    </>
  );
};

export default Patient;
