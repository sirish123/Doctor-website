import React, { useState, useEffect } from "react";
import { useForm } from "../../shared/hooks/form-hook";

import { useHttpClient } from "../../shared/hooks/http-hook";
const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function Testing() {
  const API_URL = `http://localhost:5000/api/price/getit`;
  const [treatmentPrice, settreatmentPrice] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [display, setdisplay] = useState([]);
  const [total, setTotal] = useState(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const BookingId = "62aa167265dbb0b4e50660d4";

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(API_URL);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        //console.log(responseData.price);
        settreatmentPrice(responseData.price);
        setCheckedState(new Array(responseData.price.length).fill(false));
      } catch (err) {}
    };
    sendRequest();
  }, []);

  const BookingUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(total);
    try {
      await sendRequest(
        `http://localhost:5000/api/booking/${BookingId}`,
        "PATCH",
        JSON.stringify({
          paymentamount: total,
          diagnosis: display,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    //console.log(checkedState);
    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + treatmentPrice[index].price;
        }
        return sum;
      },
      0
    );
    const cars = [];
    updatedCheckedState.map((item, index) => {
      if (item === true) {
        cars.push(treatmentPrice[index]);
      }
    });
    setdisplay(cars);
    console.log(cars);
    setTotal(totalPrice);
  };

  return (
    // <div className="App">
    //   <h3>Select treatmentPrice</h3>
    //   <ul className="treatmentPrice-list">
    // {treatmentPrice &&
    //   treatmentPrice.map(({ treatmentName, price }, index) => {
    //     return (
    //       <li key={index}>
    //         <div className="treatmentPrice-list-item">
    //           <div className="left-section">
    //             <input
    //               type="checkbox"
    //               id={`custom-checkbox-${index}`}
    //               name={treatmentName || ""}
    //               value={treatmentName || ""}
    //               checked={checkedState[index] || false}
    //               onChange={() => handleOnChange(index)}
    //             />
    //             <label htmlFor={`custom-checkbox-${index}`}>
    //               {treatmentName}
    //             </label>
    //           </div>
    //           <div className="right-section">
    //             {getFormattedPrice(price)}
    //           </div>
    //         </div>
    //       </li>
    //     );
    //   })}
    //     <li>
    //       <div className="treatmentPrice-list-item">
    //         <div>
    // {display &&
    //   display.map((Price) => (
    //     <div>
    //       {Price.price}
    //       {Price.treatmentName}
    //     </div>
    //   ))}
    //         </div>
    //         <div className="left-section">Total:</div>
    //         <div className="right-section">{getFormattedPrice(total)}</div>
    // <button tyep="button" onClick={BookingUpdateSubmitHandler}>
    //   update
    // </button>
    //       </div>
    //     </li>
    //   </ul>
    // </div>

    <div className="container-fluid mt-5">
      <div className="row g-3 ms-2 me-2">
        <div className="col-lg-4 p-3 bg-white rounded shadow-sm my-auto">
          <div className="row p-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Treatment</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {treatmentPrice &&
                  treatmentPrice.map(({ treatmentName, price }, index) => {
                    return (
                      <tr className="align-middle">
                        <td>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input p-2"
                              id={`custom-checkbox-${index}`}
                              name={treatmentName || ""}
                              value={treatmentName || ""}
                              checked={checkedState[index] || false}
                              onChange={() => handleOnChange(index)}
                            />
                          </div>
                        </td>
                        <td>{treatmentName}</td>
                        <td>
                          <span>₹</span>
                          {price}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="row text-end">
            <div className="col">
              <button
                className="btn border border-0"
                onClick={BookingUpdateSubmitHandler}
              >
                <a href="/#" className="btn btn-danger">
                  Update
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row p-3 justify-content-center">
            <div className="col-lg-10 p-4 bg-white shadow-sm rounded-2">
              <div className="row p-2 text-center">
                <h2 className="fw-bold">INVOICE</h2>
              </div>
              <div className="row justify-content-end">
                <div className="col-lg-4">
                  <div className="row p-2 text-end pe-5">
                    <div className="col">
                      <table className="float-end">
                        <tr>
                          <td>
                            <button className="btn btn-outline-danger m-1">
                              Print
                            </button>
                            <button className="btn btn-outline-danger">
                              Download
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <table className="table table-borderless">
                      <tr>
                        <td className="fw-bold fs-6">Name</td>
                        <td>Sirish Sekhar</td>
                      </tr>
                      <tr>
                        <td className="fw-bold fs-6">Phone Number</td>
                        <td>9786453201</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row p-3 mb-3  rounded-3">
                <div className="col-12">
                  <h4 className="fw-bold">Booking Confirmation</h4>
                </div>
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <th></th>
                      <th>Treatment Name</th>
                      <th>Price</th>
                    </thead>
                    <tbody>
                      {display &&
                        display.map((Price, index) => (
                          <tr>
                            <td className="fw-bold">{index + 1}</td>
                            <td>{Price.treatmentName}</td>
                            <td>
                              <span>₹</span>
                              {Price.price}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row mb-3 me-4 text-end">
                <span className="fs-6 p-2">
                  <span className="p-2 border border-1 border-dark">
                    <span className="fw-bold">Total:</span>
                    <span className="pe-1">₹</span>
                    {total}
                  </span>
                </span>
              </div>
              <div className="row justify-content-center mb-3">
                <div className="col-10 col-md-8 col-lg-6 mt-3 border-top border-1">
                  <div className="row text-center justify-content-center">
                    <div className="col-12 p-1 fw-bold">
                      Nature Wellness Center
                    </div>
                    <div className="col-12">
                      <span>
                        <span className="fw-bold pe-1">Contact Info:</span>
                        7894561238
                      </span>
                    </div>
                    <div className="col-12">
                      <span>
                        <span className="fw-bold pe-1">Address:</span>Somewhere
                        in Nowhere far far away.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
