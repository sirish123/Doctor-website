import React from "react";

let id = 0;
const RevenueItem = (props) => {
  return (
    <React.Fragment>
      <tr className="accordion-toggle align-middle record p-1">
        <td>
          {props.paymentamount !== 0 ? (
            <i className="bi bi-check-circle-fill text-success"></i>
          ) : (
            <i className="bi bi-activity text-primary"></i>
          )}
        </td>
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
        <td><span className="pe-1">₹</span>{props.paymentamount}</td>
        <td>
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
          colSpan="12"
        >
          <div>
            <div className="text-start p-3">
              <div className="diagonis text-muted text-center">
                <div>
                  <span className="fs-2 ">Diagnosis:</span>
                  <h4>{props.diagnosis}</h4>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default RevenueItem;
