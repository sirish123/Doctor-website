import React, { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../shared/hooks/http-hook";

const BookingById = () => {
  const [loadedBookings, setLoadedBookings] = useState([]);
  const [loadedBookingsDate, setLoadedBookingsDate] = useState([]);
  const [customSwitch, setCustomSwitch] = useState(false);
  const [bookingId, setbookingId] = useState();
  const [bookingDate, setBookingDate] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  const getInputValue = (event) => {
    setbookingId(event.target.value);
    console.log(bookingId);
  };
  const getDateValue = (event) => {
    setBookingDate(event.target.value);
    console.log(bookingDate);
  };

  useEffect(() => {
    const fetchByNumber = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/booking/number/${bookingId}`
        );
        setLoadedBookings(responseData.booking);
      } catch (err) { }
    };
    fetchByNumber();
  }, [sendRequest, bookingId]);

  useEffect(() => {
    const fetchByDate = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/booking/date/${bookingDate}`
        );
        setLoadedBookingsDate(responseData.booking);
      } catch (err) { }
    };
    fetchByDate();
  }, [sendRequest, bookingDate]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="container-fluid mt-5">
        <div className="row ms-3 me-3">
          <div className="col-lg-5 mb-3 border border-2 rounded shadow-sm searchBox">
            <form className="row g-3 m-2">
              <h1>Search Appointments</h1>
              <div>
                <input
                  type="date"
                  className="form-control"
                  id="searchByDateHistory"
                  placeholder="Date of Appointment"
                  onBlur={getDateValue}
                />
              </div>
              <div className="mb-3 w-100 text-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setCustomSwitch(true);
                  }}
                >
                  <i className="bi bi-search p-2"></i>Search
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
                  className="btn btn-primary"
                  onClick={() => {
                    setCustomSwitch(false);
                  }}
                >
                  <i className="bi bi-search p-2"></i>Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {customSwitch === true ? (
          <div>
            {isLoading && (
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div class="d-flex justify-content-center mt-3">
              <h2>BOOKINGS BY DATE</h2>
            </div>
            {!isLoading && loadedBookingsDate && <BookingList items={loadedBookingsDate} />}

          </div>
        ) : (
          <div>
            {isLoading && (
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div class="d-flex justify-content-center mt-3">
              <h2>BOOKINGS BY NUMBER</h2>
            </div>
            {!isLoading && loadedBookings && <BookingList items={loadedBookings} />}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default BookingById;
