import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useReactToPrint } from "react-to-print";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "../../bookings/BookingForm.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_TIME,
} from "../../shared/util/validators";

const BillingPage = () => {
  const [treatmentPrice, settreatmentPrice] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [address, setAddress] = useState(true);
  const [display, setdisplay] = useState([]);
  const [bookingInfo, setBookingInfo] = useState([]);
  const [total, setTotal] = useState(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const BookingId = useParams().sid;
  console.log(BookingId);
  const componentRef = useRef();
  const changeaddress = (inp) => {
    if (inp === 1) {
      setAddress(true);
    } else {
      setAddress(false);
    }
  };

  const [formState, inputHandler] = useForm(
    {
      paymentamount: {
        value: 0,
        isValid: true,
      },
      diagnosis: {
        value: "To Be Updated",
        isValid: true,
      },
      date: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/booking",
        "POST",
        JSON.stringify({
          uniqueid: bookingInfo.uniqueid,
          name: bookingInfo.name,
          paymentamount: formState.inputs.paymentamount.value,
          diagnosis: formState.inputs.diagnosis.value,
          date: formState.inputs.date.value,
          time: formState.inputs.time.value,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}
  };
  //----------------------------------------------------------------------------------------------------------------------//
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/price/getit`
        );

        console.log(responseData.price);
        settreatmentPrice(responseData.price);
        setCheckedState(new Array(responseData.price.length).fill(false));
      } catch (err) {}
    };
    fetchTreatment();
  }, [sendRequest]);
  //---------------------------------------------------------------------------------------------------------------------//
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/booking/${BookingId}`
        );
        console.log(responseData.booking);
        setBookingInfo(responseData.booking);
      } catch (err) {}
    };
    fetchBooking();
  }, [sendRequest]);

  const BookingUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/booking/${BookingId}`,
        "PATCH",
        JSON.stringify({
          paymentamount: total,
          diagnosis: "To Be Updated",
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

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

    const checkedItems = [];

    updatedCheckedState.map((item, index) =>
      item === true ? checkedItems.push(treatmentPrice[index]) : null
    );
    setdisplay(checkedItems);
    setTotal(totalPrice);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="container-fluid mt-5">
        <div className="row g-3 ms-2 me-2">
          <div className="col-lg-4 p-3 my-auto">
            <div className="row p-3 mb-4 shadow-sm rounded bg-white">
              <h4 className="fw-bold text-center mb-2">Treatment & Price</h4>
              <table className="table">
                <thead>
                  <tr className="align-middle">
                    <th scope="col">
                      <i className="bi bi-clipboard-check text-success"></i>
                    </th>
                    <th scope="col">Treatment</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}

                  {!isLoading &&
                    treatmentPrice &&
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
              <div className="row text-end">
                <div className="col">
                  <button
                    className="btn border border-0"
                    onClick={BookingUpdateSubmitHandler}
                  >
                    <a href="/#" className="btn btn-success">
                      Update
                    </a>
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <form
                className="booking-form w-100"
                onSubmit={placeSubmitHandler}
              >
                <h4 className="fw-bold text-center">Next Appointment</h4>
                <Input
                  id="date"
                  element="input"
                  type="date"
                  label="Date"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid date."
                  onInput={inputHandler}
                />

                <Input
                  id="time"
                  element="input"
                  label="Time"
                  type="time"
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_TIME()]}
                  errorText="Please enter a time in the field."
                  onInput={inputHandler}
                />
                <div className="col-12 text-end">
                  <Button type="submit" disabled={!formState.isValid}>
                    Add Booking
                  </Button>
                </div>
              </form>
            </div>
            <div className="row mt-5 bg-white shadow-sm p-3 rounded-2">
              <h3 className="text-center fw-bold">Select Branch</h3>
              <div className="form-check">
                <input
                  onChange={() => {
                    changeaddress(1);
                  }}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  RT Nagar Branch
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={() => {
                    changeaddress(2);
                  }}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                <label className="form-check-label" for="flexRadioDefault2">
                  Shivaji Nagar Branch
                </label>
              </div>
            </div>
          </div>

          <div ref={componentRef} className="col-lg-8">
            <div className="row p-3 justify-content-center">
              <div className="col-lg-10 p-4 bg-white shadow-sm rounded-2">
                <div className="row p-2 text-center"></div>
                <h2 className="fw-bold text-center p-2">INVOICE</h2>
                <div className="d-flex flex-row p-2 justify-content-end">
                  <div className="col flex-fill my-auto">
                    <div>
                      <h4 className="fw-bold font-primary">
                        Nature Wellness Center
                      </h4>
                      <span className="w-100">
                        <a
                          className="text-muted"
                          href="http://www.natureswellnesscentre.in/"
                        >
                          http://www.natureswellnesscentre.in/
                        </a>
                      </span>
                    </div>
                  </div>
                  <img
                    className="img"
                    style={{ height: "120px", width: "130px" }}
                    src={require("./nws.png")}
                    alt="fireSpot"
                  />
                </div>
                <div className="row justify-content-end">
                  <div className="col-8">
                    <div className="row p-2 text-end pe-5">
                      <div className="col">
                        <table className="float-end">
                          <tr>
                            <td>
                              <button
                                onClick={handlePrint}
                                className="btn btn-outline-danger m-1 hidden-print"
                              >
                                Print
                              </button>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <table className="table table-borderless">
                        <tr>
                          <td className="fw-bold fs-6 text-end">Name:</td>
                          <td>{bookingInfo.name || ""}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold fs-6 text-end">
                            Phone Number:
                          </td>
                          <td>{bookingInfo.uniqueid || ""}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row p-3 mb-3  rounded-3">
                  <div className="col-12">
                    <h6 className="fw-bold d-inline-block border border-1 border-dark p-2">
                      Booking Confirmation
                    </h6>
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
                <div className="row m-0 ">
                  <div className="col-lg-4">
                    <h6 className="fw-bold d-inline-block p-2 border border-1 border-dark">
                      Next Appointment:
                    </h6>
                    <div className="col ps-2 mb-1">
                      <span className="fw-bold">Date:</span>
                      <span className="ps-2">
                        {formState.inputs.date.value.substring(8, 10) +
                          "-" +
                          formState.inputs.date.value.substring(5, 7) +
                          "-" +
                          formState.inputs.date.value.substring(0, 4)}
                      </span>
                    </div>
                    <div className="col-12 ps-2">
                      <span className="fw-bold">Time:</span>
                      <span className="ps-2">
                        {formState.inputs.time.value}
                      </span>
                    </div>
                  </div>
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
                          {address === true
                            ? "9019848494 / 8880901440"
                            : "9110234932 / 9972952184"}
                        </span>
                      </div>
                      <div className="col-12">
                        <span>
                          <span className="fw-bold pe-1">Address:</span>
                          {address === true
                            ? "25/3, 1st Main, Athmananda Colony, near Syndicate Bank, Sultanpalya, RT Nagar, Bengaluru, Karnataka 560032"
                            : "#62, Opp. Modi Masjid Chick Bazaar Road, Off. Queens Road, Tasker Town, Shivajinagar Bengaluru, Karnataka 560051"}
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
    </React.Fragment>
  );
};
export default BillingPage;
