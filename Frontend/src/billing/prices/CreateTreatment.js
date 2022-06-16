import React from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "../../bookings/BookingForm.css";

const CreateTreatment = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //console.log(BookingId);
  const [formState, inputHandler] = useForm(
    {
      searchId: {
        value: "defaultId",
        isValid: true,
      },
      price: {
        value: "",
        isValid: false,
      },
      treatmentName: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/price",
        "POST",
        JSON.stringify({
          searchId: formState.inputs.searchId.value,
          price: formState.inputs.price.value,
          treatmentName: formState.inputs.treatmentName.value,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <form className="booking-form" onSubmit={placeSubmitHandler}>
        <Input
          id="treatmentName"
          element="input"
          type="text"
          label="treatmentName"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a treatmentName."
          onInput={inputHandler}
          
        />

        <Input
          id="price"
          element="input"
          type="number"
          label="price"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a price."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Add Treatment
        </Button>
      </form>
    </React.Fragment>
  );
};

export default CreateTreatment;
