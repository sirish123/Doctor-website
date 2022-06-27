import React from "react";
import { useHistory } from "react-router-dom";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";

import "./CreatePatient.css";

const CreatePatient = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      number: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      gender: {
        value: "",
        isValid: false,
      },
      dateofbirth: {
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
        "http://localhost:5000/api/patient",
        "POST",
        JSON.stringify({
          number: formState.inputs.number.value,
          name: formState.inputs.name.value,
          address: formState.inputs.address.value,
          gender: formState.inputs.gender.value,
          dateofbirth: formState.inputs.dateofbirth.value,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="row mt-3 p-2 justify-content-center">
        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isLoading && (
          <form className="patient-form" onSubmit={placeSubmitHandler}>
            <Input
              id="number"
              element="input"
              type="text"
              label="Number"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
              errorText="Please enter a valid Number."
              onInput={inputHandler}
            />
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a Name"
              onInput={inputHandler}
            />
            <Input
              id="address"
              element="textarea"
              type="text"
              label="Address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid Address."
              onInput={inputHandler}
            />
            <Input
              id="gender"
              element="input"
              type="text"
              label="Gender"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter the Gender."
              onInput={inputHandler}
            />
            <Input
              id="dateofbirth"
              element="input"
              type="date"
              label="Date Of Birth"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter the DateOfBirth."
              onInput={inputHandler}
            />
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={!formState.isValid}
            >
              ADD PATIENT
            </Button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default CreatePatient;
