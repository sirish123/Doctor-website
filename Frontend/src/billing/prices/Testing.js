import React, { useState, useEffect } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function Testing() {
  const API_URL = `http://localhost:5000/api/price/getit`;
  const [treatmentPrice, settreatmentPrice] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [display, setdisplay] = useState();
  const [total, setTotal] = useState(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedBooking, setLoadedBooking] = useState();
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
          diagnosis:display
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {console.log(err)}
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
    const totalPrice2 = updatedCheckedState.reduce(
        (sum, currentState, index) => {
          if (currentState === true) {
              
            return sum + treatmentPrice[index].treatmentName;
          }
          return sum;
        },
        0
      );
    setdisplay(totalPrice2);
    setTotal(totalPrice);
  };

  return (
    <div className="App">
      <h3>Select treatmentPrice</h3>
      <ul className="treatmentPrice-list">
        {treatmentPrice.map(({ treatmentName, price }, index) => {
          return (
            <li key={index}>
              <div className="treatmentPrice-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={treatmentName}
                    value={treatmentName}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>
                    {treatmentName}
                  </label>
                </div>
                <div className="right-section">{getFormattedPrice(price)}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="treatmentPrice-list-item">
            <div className="left-section">Total:</div>
            <div className="right-section">{getFormattedPrice(total)}</div>
            <h1>{display}</h1>
            <button tyep ="button" onClick ={BookingUpdateSubmitHandler }>update</button>
          </div>
        </li>
      </ul>
    </div>
  );
}
