import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./BookingItem.css";

let id = 0;
const BookingItem = (props) => {
  return (
    <>
      {/* <li className="booking-item">
        <div className="accordion-item">
          <div className="accordion-header">
            <div className="d-flex row w-200 align-items-center text-center">
              <span className="p-2 col-2 overflow-auto">{props.name}</span>
              <span className="p-2 col-2 overflow-auto">{props.uniqueid}</span>
              <span className="p-2 col-2 overflow-auto">
                {props.date.substring(8, 10) +
                  "-" +
                  props.date.substring(5, 7) +
                  "-" +
                  props.date.substring(0, 4)}
              </span>
              <span className="p-2 col-2 overflow-auto">{props.time}</span>
              <span className="p-2 col-2 overflow-auto">{props.diagnosis}</span>
              <span className="p-2 col-2 overflow-auto">
                {props.code === 1 ? (
                  <Button to={`/booking/${props.id}`}>Update</Button>
                ) : (
                  <Button to={`/booking/${props.id}`}>Bill</Button>
                )}
              </span>
            </div>
          </div>
        </div>
      </li> */}
      <tr class="accordion-toggle align-middle record">
        <td>{props.name}</td>
        <td>{props.uniqueid}</td>
        <td>
          {" "}
          {props.date.substring(8, 10) +
            "-" +
            props.date.substring(5, 7) +
            "-" +
            props.date.substring(0, 4)}
        </td>
        <td>{props.time}</td>
        <td>
          {props.code === 1 ? (
            <Button to={`/booking/${props.id}`}>
              <a className="btn m-1">
                <i class="bi bi-mouse p1"></i>
              </a>
            </Button>
          ) : (
            <Button to={`/booking/${props.id}`}>
              <a className="btn m-1">
                <i class="bi bi-credit-card p1"></i>
              </a>
            </Button>
          )}

          <a
            type="button"
            class="btn m-1"
            data-bs-toggle="collapse"
            data-bs-target={"#patient" + id}
          >
            <i class="bi bi-eye"></i>
          </a>
        </td>
      </tr>

      <tr>
        <td
          class="accordion-body collapse p-2"
          id={"patient" + id++}
          colspan="12"
        >
          <div>
            <div class="text-start p-3">
              <p class="diagonis text-muted text-center">{props.diagnosis}</p>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default BookingItem;
