import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "../../bookings/BookingForm.css";

const UpdateTreatment = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedprice, setLoadedprice] = useState();

  const priceId = useParams().sid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      treatmentName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/price/update/${priceId}`
        );
        setLoadedprice(responseData.price);
        setFormData(
          {
            treatmentName: {
              value: responseData.price.treatmentName,
              isValid: true,
            },
            price: {
              value: responseData.price.price,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPrices();
  }, [sendRequest, priceId, setFormData]);

  const priceUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/price/${priceId}`,
        "PATCH",
        JSON.stringify({
          treatmentName: formState.inputs.treatmentName.value,
          price: formState.inputs.price.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="row mt-3 p-2 justify-content-center text-center">
        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isLoading && loadedprice && (
          <form className="booking-form" onSubmit={priceUpdateSubmitHandler}>
            <Input
              id="treatmentName"
              element="input"
              type="text"
              label="treatmentName"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid treatmentName."
              onInput={inputHandler}
              initialValue={loadedprice.treatmentName}
              initialValid={true}
            />
            <Input
              id="price"
              element="input"
              type="number"
              label="price"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid price (min. 5 characters)."
              onInput={inputHandler}
              initialValue={loadedprice.price}
              initialValid={true}
            />

            <Button type="submit" disabled={!formState.isValid}>
              Update price
            </Button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default UpdateTreatment;
