import React, { useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Button from "../../shared/components/FormElements/Button";

const PatientItem = (props) => {
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
        `http://localhost:5000/api/patient/${props.id}`,
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
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && (
        <tr className="accordion-toggle align-middle record p-1">
          <td>{props.name}</td>
          <td>{props.number}</td>
          <td> {props.dateofbirth.substring(8, 10) +
              "-" +
              props.dateofbirth.substring(5, 7) +
              "-" +
              props.dateofbirth.substring(0, 4)}</td>
          <td>
            <Button special={`/booking/${props.name}/${props.number}`}>
              <i className="bi bi-bookmark-check-fill text-info"></i>
            </Button>
          </td>
          <td>
            <a
              type="button"
              className="btn m-1"
              onClick={showDeleteWarningHandler}
            >
              <i className="bi bi-trash text-danger"></i>
            </a>
            {/* <button className="p-2 border-0" onClick={showDeleteWarningHandler}>
              <i className="bi bi-trash text-danger"></i>
            </button> */}
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default PatientItem;
