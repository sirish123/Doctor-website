import React, { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import "./BookingById.css";
function GetBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedBookingsDate, setLoadedBookingsDate] = useState([]);
  const [dateChange, setDatechange] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().slice(0, 10));
  const API_URL = `http://localhost:5000/api/booking/date/${bookingDate}`;

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData.booking);
        setLoadedBookingsDate(responseData.booking);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [dateChange, API_URL]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 border border-2 rounded shadow-sm searchBox">
            <form className="row g-3 m-2">
              <h1>Search Appointments</h1>
              <div>
                <input
                  type="date"
                  className="form-control"
                  id="searchByDateAppointments"
                  placeholder="Date of Appointment"
                  onBlur={(e) => setBookingDate(e.target.value)}
                />
              </div>
              <div className="mb-3 w-100 text-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setDatechange((dateChange) => !dateChange)}
                >
                  <i className="bi bi-search p-2"></i>Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <BookingList items={loadedBookingsDate} code={1} />
      </div>
    </>
  );
}

export default GetBooking;
