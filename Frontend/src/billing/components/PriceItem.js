import React, { useState} from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
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

      <li className="price-item">
        <div className="accordion-item">
          <div className="accordion-header">
            <div className="d-flex row w-200 align-items-center text-center">
              <span className="p-2 col-3 overflow-auto">
                {props.treatmentName}
              </span>
              <span className="p-2 col-3 overflow-auto">{props.price}</span>
              <span className="p-2 col-3 overflow-auto">
                <Button to={`/update/${props.id}`}>Update</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              </span>
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default PriceItem;
