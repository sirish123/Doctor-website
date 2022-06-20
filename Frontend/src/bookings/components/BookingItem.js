import React from "react";
import Button from "../../shared/components/FormElements/Button";
import "./BookingItem.css";

let id = 0;
const BookingItem = (props) => {
  return (
    <>
      <tr className="accordion-toggle align-middle record">
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
            <Button special={`/booking/${props.id}`}>
              <a href="/#" className="btn m-1">
                <i className="bi bi-mouse p1"></i>
              </a>
            </Button>
          ) : (
            <Button special={`/booking/${props.id}`}>
              <a href="/#" className="btn m-1">
                <i className="bi bi-credit-card p1"></i>
              </a>
            </Button>
          )}

          <a
            href="/#"
            type="button"
            className="btn m-1"
            data-bs-toggle="collapse"
            data-bs-target={"#patient" + id}
          >
            <i className="bi bi-eye"></i>
          </a>
        </td>
      </tr>

      <tr>
        <td
          className="accordion-body collapse p-2"
          id={"patient" + id++}
          colspan="12"
        >
          <div>
            <div className="text-start p-3">
              <p className="diagonis text-muted text-center">{props.diagnosis}</p>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default BookingItem;
