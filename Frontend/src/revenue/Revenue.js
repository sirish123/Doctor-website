import React, { useEffect, useState } from "react";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../shared/hooks/http-hook";
import RevenueCalc from "./components/RevenueCalc";
const Revenue = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loadedBookingsDate, setLoadedBookingsDate] = useState([]);
  const [cswitch, setCswitch] = useState(false);
  const [totalRevenue, setTotalReveneue] = useState(0);

  const calculateTotal = (props) => {
    const sum = props.reduce((accumulator, object) => {
      return accumulator + object.paymentamount;
    }, 0);

    setTotalReveneue(sum);

    //    const arr = props.sort(function(a, b){
    //         var keyA = new Date(a.date),
    //             keyB = new Date(b.date);
    //         // Compare the 2 dates
    //         if(keyA < keyB) return -1;
    //         if(keyA > keyB) return 1;
    //         return 0;
    //     });
    // const arr = props.sort(function (a, b) {
    //     return a.time.localeCompare(b.time);
    // });
    //     console.log(arr);
  };
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchByDate = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/booking/revenue/${startDate}/${endDate}`
        );

        calculateTotal(responseData.booking);
        setLoadedBookingsDate(responseData.booking);
      } catch (err) {}
    };
    fetchByDate();
  }, [sendRequest, cswitch]);

  const getStartValue = (event) => {
    setStartDate(event.target.value);
  };
  const getEndValue = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-4 border border-2 rounded shadow-sm searchBox">
            <input
              type="date"
              className="form-control"
              id="searchByDateHistory"
              placeholder="Date of Appointment"
              onBlur={getStartValue}
            />
            <input
              type="date"
              className="form-control"
              id="searchByDateHistory"
              placeholder="Date of Appointment"
              onBlur={getEndValue}
            />
            <div className="mb-3 w-100 text-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setCswitch((cswitch) => !cswitch);
                }}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isLoading && loadedBookingsDate && (
          <RevenueCalc
            totrevenue={totalRevenue}
            bookings={loadedBookingsDate.length}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Revenue;
