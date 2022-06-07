import React, { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import "./BookingById.css";
const GetBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedBookingsDate, setLoadedBookingsDate] = useState([]);
  const [dateChange, setDatechange] = useState(false);
  const [bookingDate, setBookingDate] = useState();
  const API_URL2 = `http://localhost:5000/api/booking/date/${bookingDate}`;

  const getDateValue = (event) => {
    setBookingDate(event.target.value);
    console.log(bookingDate);
  };

  
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
      <div className="search-input center">
        <button
          type="button"
          className="date-button"
          onClick={() => setDatechange((dateChange) => !dateChange)}
        >
          Search By Date
        </button>
        <input className="left" type="text" onBlur={getDateValue} />
        
      </div>
      
      <BookingList items={loadedBookingsDate} />
    </>
  );
};

export default GetBooking;
