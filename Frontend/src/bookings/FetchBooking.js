import React, { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../shared/hooks/http-hook";

function FetchBooking() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedBookingsDate, setLoadedBookingsDate] = useState([]);
  const [switchstatedate,setswitchstatedate]  = useState(false);
  const [bookingDate, setBookingDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const calculateTotal = (props) => {
    props.sort(function (a, b) {
      return a.time.localeCompare(b.time);
    });
  };
  useEffect(() => {
    const fetchByDate = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/booking/date/${bookingDate}`
        );
        calculateTotal(responseData.booking);
        setLoadedBookingsDate(responseData.booking);
      } catch (err) {}
    };
    fetchByDate();
  }, [sendRequest, switchstatedate]);

  const bookingDeletedHandler = (deletedbookingId) => {
    setLoadedBookingsDate((prevbookings) =>
      prevbookings.filter((booking) => booking.id !== deletedbookingId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
                <button type="button" className="btn btn-primary" onClick ={()=>setswitchstatedate((switchstatedate)=> !switchstatedate)}>
                  <i className="bi bi-search p-2"></i>Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isLoading && loadedBookingsDate && (
          <BookingList
            items={loadedBookingsDate}
            code={0}
            onDelete={bookingDeletedHandler}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default FetchBooking;
