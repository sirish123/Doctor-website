import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../shared/components/FormElements/Input'
import Button from '../shared/components/FormElements/Button';
import {VALIDATOR_REQUIRE,
        VALIDATOR_MINLENGTH} from '../shared/util/validators'
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';

import './PatientForm.css';

const NewPatient = () => {
 
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      number: {
        value: '',
        isValid: false
      },
      name: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      gender: {
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
        'http://localhost:5000/api/patient',
        'POST',
        JSON.stringify({
          number: formState.inputs.number.value,
          name: formState.inputs.name.value,
          address: formState.inputs.address.value,
          gender:formState.inputs.gender.value
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/');
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
          validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(10)]}
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
        <Button type="submit" disabled={!formState.isValid}>
          ADD PATIENT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPatient;
