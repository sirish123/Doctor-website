import React, { useState, useEffect } from "react";
import BookingList from "../bookings/components/BookingList";

const BillingMainPage = (props) => {
  const [loadedBookings, setLoadedBookings] = useState([]);
  const [idChange, setIdchange] = useState(false);
  const [bookingId, setbookingId] = useState("7349359536");

  const API_URL = `http://localhost:5000/api/booking/number/${bookingId}`;

  const getInputValue = (event) => {
    setbookingId(event.target.value);
    console.log(bookingId);
  };

  useEffect(() => {
    const sendRequest = async () => {
      // setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData.booking);
        setLoadedBookings(responseData.booking);
      } catch (err) {
        //setError(err.message);
      }
      //setIsLoading(false);
    };
    sendRequest();
  }, [idChange, API_URL]);
  return (
    <>
      <div className="center">
        <input className="left" type="text" onBlur={getInputValue} />
        <button
          type="button"
          className="other"
          onClick={() => setIdchange((idChange) => !idChange)}
        >
          Search By Number
        </button>
      </div>
      <div className="left">
       <BookingList items={loadedBookings} code ={0}/>
      </div>
    </>
  );
};

export default BillingMainPage;
