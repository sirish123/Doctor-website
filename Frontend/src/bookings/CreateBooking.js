import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import ErrorModal from "../shared/components/UIElements/ErrorModal";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_TIME,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";



const CreateBooking = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const name = useParams().kid;
  const number = useParams().did;
  const [formState, inputHandler] = useForm(
    {
      uniqueid: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
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

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/booking",
        "POST",
        JSON.stringify({
          uniqueid: formState.inputs.uniqueid.value,
          name: formState.inputs.name.value,
          paymentamount: formState.inputs.paymentamount.value,
          diagnosis: formState.inputs.diagnosis.value,
          date: formState.inputs.date.value,
          time: formState.inputs.time.value,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
    } catch (err) { }
  };
  return (
    <React.Fragment>
      <div className="row mt-3 p-2 justify-content-center text-center">
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isLoading && (
          <form className="booking-form" onSubmit={placeSubmitHandler}>
            <Input
              id="uniqueid"
              element="input"
              type="text"
              label="Phone Number"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
              errorText="Please enter a valid Phone Number."
              onInput={inputHandler}
              initialValue={number}
              initialValid={true}
            />
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a Name."
              onInput={inputHandler}
              initialValue={name}
              initialValid={true}
            />

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
            <Button type="submit" disabled={!formState.isValid}>
              Add Booking
            </Button>
          </form>)}
      </div>
    </React.Fragment>
  );
};

export default CreateBooking;
