import React, { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import "./BookingById.css";
const GetBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedBookingsDate, setLoadedBookingsDate] = useState([]);
  const [dateChange, setDatechange] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const API_URL = `http://localhost:5000/api/booking/date/${bookingDate}`;

  const getDateValue = (event) => {
    setBookingDate(event.target.value);
    console.log(bookingDate);
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
        console.log(responseData.booking);
        setLoadedBookingsDate(responseData.booking);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [dateChange,API_URL]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 border border-2 rounded shadow-sm">
            <form>
              <div className="p-3">
                <h1>Search Appointments</h1>
              </div>
              <div className="p-3">
                  <input
                    type="text"
                    className="form-control"
                    id="searchByDateAppointments"
                    placeholder="DD/MM/YYYY"
                    onChange={getDateValue}
                  />
              </div>
              <div className="p-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setDatechange((dateChange) => !dateChange)}
                >
                  Search By Date
                </button>
              </div>
              <BookingList items={loadedBookingsDate} />
            </form>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default GetBooking;
