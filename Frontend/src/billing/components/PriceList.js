import React from "react";
import Card from "../../shared/components/UIElements/Card";
import PriceItem from "./PriceItem";
import "./PriceList.css";

const PriceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="Price-list">
        <Card>
          <h3>No Prices found</h3>
        </Card>
      </div>
    );
  }

  return (
    <>
      <tbody>
        {props.items.map((Price) => (
          <PriceItem
            key={Price.id}
            id={Price.id}
            price={Price.price}
            treatmentName={Price.treatmentName}
          />
        ))}
      </tbody>
    </>
  );
};

export default PriceList;
