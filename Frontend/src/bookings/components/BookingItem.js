import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./BookingItem.css";

let id = 0;
const BookingItem = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/booking/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="price-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this Booking? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      {isLoading && (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && (
        <tr className="accordion-toggle align-middle record">
          <td>
            {props.paymentamount !== 0 ? (
              <i class="bi bi-check-circle-fill text-success"></i>
            ) : (
              <i class="bi bi-activity text-primary"></i>
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
          <td>{props.time}</td>
          <td>
            <Button special={`/billing/invoice/${props.id}`}>
              <a href="/#" className="btn m-1">
                <i class="bi bi-receipt-cutoff text-info"></i>
              </a>
            </Button>
          </td>
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
          <td>
            <button className="p-2 border-0" onClick={showDeleteWarningHandler}>
              <a href="/#" className="btn m-1">
                <i className="bi bi-trash text-danger"></i>
              </a>
            </button>
          </td>
        </tr>
      )}

      <tr>
        <td
          className="accordion-body collapse p-2"
          id={"patient" + id++}
          colspan="12"
        >
          <div>
            <div className="text-start p-3">
              <p className="diagonis text-muted text-center">
                {props.paymentamount}
              </p>
            </div>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default BookingItem;
