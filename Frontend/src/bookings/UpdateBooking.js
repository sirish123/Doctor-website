import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import Card from '../shared/components/UIElements/Card';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../shared/util/validators';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import './BookingForm.css';

const UpdateBooking = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedBooking, setLoadedBooking] = useState();
  const BookingId = useParams().bid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      paymentamount: {
        value: '',
        isValid: false
      },
      diagnosis: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/booking/${BookingId}`
        );
        setLoadedBooking(responseData.booking);
        setFormData(
          {
            paymentamount: {
              value: responseData.booking.paymentamount,
              isValid: true
            },
            diagnosis: {
              value: responseData.booking.diagnosis,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchBooking();
  }, [sendRequest, BookingId, setFormData]);

  const BookingUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/booking/${BookingId}`,
        'PATCH',
        JSON.stringify({
          paymentamount: formState.inputs.paymentamount.value,
          diagnosis: formState.inputs.diagnosis.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/');//+ auth.userId + '/Bookings'
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedBooking && (
        <form className="booking-form" onSubmit={BookingUpdateSubmitHandler}>
          <Input
            id="paymentamount"
            element="input"
            type="text"
            label="paymentamount"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid paymentamount."
            onInput={inputHandler}
            initialValue={loadedBooking.paymentamount}
            initialValid={true}
          />
          <Input
            id="diagnosis"
            element="textarea"
            label="diagnosis"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid diagnosis (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedBooking.diagnosis}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Booking
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateBooking;
