import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import Input from '../shared/components/FormElements/Input'
import Button from '../shared/components/FormElements/Button';
import {VALIDATOR_REQUIRE,
        VALIDATOR_MINLENGTH,
        VALIDATOR_DATEOFBIRTH} from '../shared/util/validators'
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';

import './BookingForm.css';

const Booking = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      uniqueid: {
        value: '',
        isValid: false
      },
      paymentamount: {
        value: '',
        isValid: false
      },
      diagnosis: {
        value: '',
        isValid: false
      },
      date: {
        value: '',
        isValid: false
      },
      time: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/booking/new',
        'POST',
        JSON.stringify({
          uniqueid: formState.inputs.uniqueid.value,
          paymentamount: formState.inputs.paymentamount.value,
          diagnosis: formState.inputs.diagnosis.value,
          date:formState.inputs.date.value,
          time:formState.inputs.time.value
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
    
      <form className="booking-form" onSubmit={placeSubmitHandler}>
        <Input
          id="uniqueid"
          element="input"
          type="text"
          label="Phone Number"
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a valid uniqueid."
          onInput={inputHandler}
        />
        <Input
          id="paymentamount"
          element="input"
          label="Payment Amount"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a paymentamount"
          onInput={inputHandler}
        />
        <Input
          id="diagnosis"
          element="textarea"
          label="Diagnosis"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid diagnosis."
          onInput={inputHandler}
        />
        <Input
          id="date"
          element="input"
          label="Date"
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_DATEOFBIRTH()]}
          errorText="Please enter a valid date."
          onInput={inputHandler}
        />
         
         <Input
          id="time"
          element="input"
          label="Time"
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_DATEOFBIRTH()]}
          errorText="Please enter the time."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD booking
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Booking;