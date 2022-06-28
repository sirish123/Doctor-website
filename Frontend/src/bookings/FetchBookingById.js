import React, { useState, useEffect } from "react";
import BookingList from "./components/BookingList";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../shared/hooks/http-hook";

const FetchBookingById = () => {
  const [loadedBookings, setLoadedBookings] = useState([]);
  const [loadedBookingsDate, setLoadedBookingsDate] = useState([]);
  const [customSwitch, setCustomSwitch] = useState(false);
  const [bookingId, setbookingId] = useState();
  const [bookingDate, setBookingDate] = useState();
  const [switchstatenumber,setswitchstatenumber]  = useState(false);
  const [switchstatedate,setswitchstatedate]  = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const SortByDateAndTime= (props) => {
         props.sort(function(a, b){
            var keyA = new Date(a.date),
                keyB = new Date(b.date);
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return a.time.localeCompare(b.time);
        });
}
const SortByTime= (props) => {


   props.sort(function (a, b) {
      return a.time.localeCompare(b.time);
  });

}
 const bookingDeletedHandlerNumber = (deletedbookingId) => {
  setLoadedBookings((prevbookings) =>
    prevbookings.filter((booking) => booking.id !== deletedbookingId)
  );
};
const bookingDeletedHandlerDate = (deletedbookingId) => {
  setLoadedBookingsDate((prevbookings) =>
    prevbookings.filter((booking) => booking.id !== deletedbookingId)
  );
};
  const getInputValue = (event) => {
    setbookingId(event.target.value);
   // console.log(bookingId);
  };
  const getDateValue = (event) => {
    setBookingDate(event.target.value);
    //console.log(bookingDate);
  };
  const changenumber = () => {
   setswitchstatenumber((switchstatenumber) => !switchstatenumber);
  };
  const changeDate = () => {
    setswitchstatedate((switchstatedate) => !switchstatedate);
   };
 

  useEffect(() => {
    const fetchByNumber = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/booking/number/${bookingId}`
        );
        SortByDateAndTime(responseData.booking)
        setLoadedBookings(responseData.booking);
      } catch (err) {}
    };
    fetchByNumber();
  }, [sendRequest, switchstatenumber]);

  useEffect(() => {
    const fetchByDate = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/booking/date/${bookingDate}`
        );
        SortByTime(responseData.booking)
        setLoadedBookingsDate(responseData.booking);
      } catch (err) {}
    };
    fetchByDate();
  }, [sendRequest, switchstatedate]);

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
                    changeDate();
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
                    changenumber()
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
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div className="d-flex justify-content-center mt-3">
              <h2 className="p-3 col-4 rounded-2 shadow-sm border bg-white text-center roboto">
                Booking By Date
              </h2>
            </div>
            {!isLoading && loadedBookingsDate && (
              <BookingList items={loadedBookingsDate}  onDelete={bookingDeletedHandlerDate} />
            )}
          </div>
        ) : (
          <div>
            {isLoading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div className="d-flex justify-content-center mt-3">
              <h2 className="p-3 col-4 rounded-2 shadow-sm border bg-white text-center roboto">
                Booking By Number
              </h2>
            </div>
            {!isLoading && loadedBookings && (
              <BookingList items={loadedBookings}  onDelete={bookingDeletedHandlerNumber}/>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default FetchBookingById;
