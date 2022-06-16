import React, { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import "./BookingById.css";
const BookingById = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedBookings, setLoadedBookings] = useState([]);
  const [loadedBookingsDate, setLoadedBookingsDate] = useState([]);
  const [idChange, setIdchange] = useState(false);
  const [dateChange, setDatechange] = useState(false);
  const [customSwitch, setCustomSwitch] = useState(false);
  const [bookingId, setbookingId] = useState();
  const [bookingDate, setBookingDate] = useState();
  const API_URL = `http://localhost:5000/api/booking/number/${bookingId}`;
  const API_URL2 = `http://localhost:5000/api/booking/date/${bookingDate}`;

  const getInputValue = (event) => {
    setbookingId(event.target.value);
    console.log(bookingId);
  };
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
        setLoadedBookings(responseData.booking);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [idChange, API_URL]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL2);
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
  }, [dateChange, API_URL2]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {/* <div className="center">
        <input className="left" type="text" onBlur={getInputValue} />
        <button
          type="button"
          className="other"
          onClick={() => setIdchange((idChange) => !idChange)}
        >
          Search By Number
        </button>
      </div>
      <div className="center">
        <BookingList items={loadedBookings} />
      </div>
      <hr />
      <div className="center">
        <input className="theright" type="text" onBlur={getDateValue} />
        <button
          type="button"
          className="date-button"
          onClick={() => setDatechange((dateChange) => !dateChange)}
        >
          Search By Date
        </button>
      </div>
      <div className="center">
        <BookingList items={loadedBookingsDate} />
      </div>
      <hr /> */}

      <div className="container-fluid mt-5">
        <div className="row ms-3 me-3">
          <div className="col-lg-5 mb-3 border border-2 rounded shadow-sm searchBox">
            <form className="row g-3 m-2">
              <h1>Search Appointments</h1>
              <div>
                <input
                  type="date"
                  class="form-control"
                  id="searchByDateHistory"
                  placeholder="Date of Appointment"
                  onBlur={getDateValue}
                />
              </div>
              <div className="mb-3 w-100 text-end">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    setDatechange((dateChange) => !dateChange);
                    setCustomSwitch(true);
                  }}
                >
                  <i class="bi bi-search p-2"></i>Search
                </button>
              </div>
            </form>
          </div>

          <div className="col-lg-5 mb-3 ms-auto border border-2 rounded shadow-sm searchBox">
            <form className="row g-3 m-2">
              <h1>Search Appointments</h1>
              <div>
                <input
                  type="tel"
                  className="form-control"
                  id="searchByPhoneNumberHistory"
                  placeholder="Phone Number"
                  onBlur={getInputValue}
                />
              </div>
              <div className=" mb-3 w-100 text-end">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    setIdchange((idChange) => !idChange);
                    setCustomSwitch(false);
                  }}
                >
                  <i class="bi bi-search p-2"></i>Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {customSwitch === true ? (
          <div>
            <h2>BOOKINGS BY DATE</h2>
            <BookingList items={loadedBookingsDate} />
          </div>
        ) : (
          <div>
            <h2>BOOKINGS BY PATIENT</h2>
            <BookingList items={loadedBookings} />
          </div>
        )}
      </div>
    </>
  );
};

export default BookingById;
