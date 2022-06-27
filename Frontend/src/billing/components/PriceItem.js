import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PriceItem.css";

const PriceItem = (props) => {
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
        `http://localhost:5000/api/price/${props.id}`,
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
          Do you want to proceed and Delete this Item? Please note that it can't
          be undone thereafter.
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
        <tr className="align-middle">
          <td>{props.treatmentName}</td>
          <td>
            <span>₹</span>
            {props.price}
          </td>
          <td>
            <Button
              className="btn btn-danger align-middle"
              special={`/update/${props.id}`}
            >
              <span href="/#" className="btn btn-primary me-2">
                <i className="bi bi-arrow-clockwise p-1 m-1"></i>
                <span className="fw-bold">Update</span>
              </span>
            </Button>

            <button
              className="btn btn-danger align-middle fw-bold"
              onClick={showDeleteWarningHandler}
            >
              <i className="bi bi-trash3-fill p-1 m-1"></i>Delete
            </button>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default PriceItem;
