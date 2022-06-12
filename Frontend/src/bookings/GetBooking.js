import React, { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import "./BookingById.css";
function GetBooking () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedBookingsDate, setLoadedBookingsDate] = useState([]);
  const [dateChange, setDatechange] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const API_URL = `http://localhost:5000/api/booking/date/${bookingDate}`;
  console.log(bookingDate);
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
  }, [dateChange]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-7 border border-2 rounded shadow-sm">
            <form>
              <div className="p-3">
                <h1>Search Appointments</h1>
              </div>
              <div className="p-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="dd-mm-yyyy"
                    onChange={e=>setBookingDate(e.target.value)}
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
