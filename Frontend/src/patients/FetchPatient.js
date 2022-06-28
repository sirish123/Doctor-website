import React, { useState, useEffect } from "react";
import PatientList from "./components/PatientList";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../shared/hooks/http-hook";

const FetchPatient = () => {
  const [loadedPatients, setLoadedPatients] = useState([]);
  const [patientId, setPatientId] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [switchstatenumber, setswitchstatenumber] = useState(false);
  const getInputValue = (event) => {
    setPatientId(event.target.value);
    //console.log(patientId);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/patient/${patientId}`
        );
        setLoadedPatients(responseData.patient);
      } catch (err) { }
    };
    fetchPatients();
  }, [sendRequest, switchstatenumber]);

  const patientDeletedHandler = (deletedpatientId) => {
    setLoadedPatients((prevpatients) =>
      prevpatients.filter((patient) => patient.id !== deletedpatientId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 border border-2 rounded shadow-sm searchBox">
            <form className="row g-3 m-2">
              <h1>Search Patient</h1>
              <div>
                <input
                  type="tel"
                  className="form-control"
                  onBlur={getInputValue}
                  id="searchByPhoneNumberpatients"
                  placeholder="Phone Number"
                />
              </div>
              <div className="mb-3 w-100 text-end">
                <button type="button" className="btn btn-primary" onClick={() => setswitchstatenumber((switchstatenumber) => !switchstatenumber)}>
                  <i className="bi bi-search p-2"></i>Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && loadedPatients && (
        <PatientList items={loadedPatients} onDelete={patientDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default FetchPatient;
