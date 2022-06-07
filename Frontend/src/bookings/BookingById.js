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
      <div className="search-input">
        <input className="left" type="text" onBlur={getInputValue} />
        <button
          type="button"
          className="other"
          onClick={() => setIdchange((idChange) => !idChange)}
        >
          Search Query
        </button>
        <button
          type="button"
          className="date-button"
          onClick={() => setDatechange((dateChange) => !dateChange)}
        >
          Search By Date
        </button>
        <input className="theright" type="text" onBlur={getDateValue} />
        
      </div>
      <BookingList items={loadedBookings} />
      <BookingList items={loadedBookingsDate} />
    </>
  );
};

export default BookingById;
