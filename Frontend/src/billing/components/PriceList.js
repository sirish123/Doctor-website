import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PriceItem from "./PriceItem";
import "./PriceList.css";

const PriceList = (props) => {
  
  if (props.items.length === 0) {
    return (
      <div className="Price-list center">
        <Card>
          <h3>No Prices found</h3>
        </Card>
      </div>
    );
  }

  return (
    <>
   
      <ul className="price-details">
        <div className="accordion-header">
          <div className="d-flex row w-150 header-row text-center">
            <span className="p-2 col-3">
              <strong>
              <i className="bi bi-file-medical p-2"></i>TreatmentName
              </strong>
            </span>
            <span className="p-2 col-3">
              <strong>
              <i class="bi bi-cash"></i>Price
              </strong>
            </span>
          </div>
        </div>
        {props.items.map((Price) => (
          <PriceItem
            key={Price.id}
            id={Price.id}
            price ={Price.price}
            treatmentName={Price.treatmentName}
          />
        ))}
      
      </ul>
      <Button to={`/billing/update`}>Create</Button>
    </>
  );
};

export default PriceList;
