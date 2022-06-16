import React from "react";
import { useHistory } from "react-router-dom";

import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_DATEOFBIRTH,
} from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";

import "./PatientForm.css";

const NewPatient = () => {
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
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a Name"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="textarea"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Address."
          onInput={inputHandler}
        />
        <Input
          id="gender"
          element="input"
          label="Gender"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter the Gender."
          onInput={inputHandler}
        />
        <Input
          id="dateofbirth"
          element="input"
          label="DateOfBirth"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_DATEOFBIRTH()]}
          errorText="Please enter the DateOfBirth."
          onInput={inputHandler}
        />
        <Button type="submit" className = "btn btn-primary" disabled={!formState.isValid}>
          ADD PATIENT
        </Button>
      </form>

      <div class="row mt-3 p-2 justify-content-center text-center">
        <div class="col-lg-4 p-0 shadow-sm bg-white p-3">
          <div className="modal-header text-center">
            <h5 className="modal-title">Register new patient</h5>
          </div>
          <form id="create-new-patient-form">
            <div className="modal-body">
              <div className="row g-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="cnp-Name"
                    placeholder="Name"
                  />
                  <label for="cnp-Name">Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="tel"
                    className="form-control"
                    value="+91 7780151257"
                    id="cnp-PhoneNumber"
                    disabled
                  />
                  <label for="cnp-PhoneNumber">Phone Number</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="cnp-Address"
                    placeholder="Address"
                  />
                  <label for="cnp-Address">Address</label>
                </div>
                <div className="form-floating">
                  <h6 className="text-muted text-start ps-1">Gender</h6>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="GenderRadio"
                      id="cnp-Male"
                      value="Male"
                    />
                    <label className="form-check-label" for="cnp-Male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="GenderRadio"
                      id="cnp-Female"
                      value="Female"
                    />
                    <label className="form-check-label" for="cnp-Female">
                      Female
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="GenderRadio"
                      id="cnp-Other"
                      value="Other"
                    />
                    <label className="form-check-label" for="cnp-Other">
                      Other
                    </label>
                  </div>
                </div>
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="date"
                    id="cnp-DOB"
                    placeholder="Date of Birth"
                  />
                  <label for="cnp-DOB">Date of Birth</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewPatient;
