import React, { useState, useEffect } from "react";
import PriceList from "../components/PriceList";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

function FetchTreatment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedPrices, setloadedPrices] = useState([]);
  const API_URL = `http://localhost:5000/api/price/getit`;

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData.price);
        setloadedPrices(responseData.price);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3 p-2 justify-content-center text-center">
        <div className="col-lg-10 p-0 shadow-sm recordHolder">
          <table className="table table-condensed recordTable">
            <thead>
              <tr>
                <th>Treatment</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <PriceList items={loadedPrices} />
          </table>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-lg-6 col-md-8 col-12">
            <Card>
              <h3 className="text-muted">Treatment not found?</h3>
              <Button type="button" special={`/billing/update`}>
                <a href="/#" className="btn btn-primary">
                  <i className="bi bi-pen-fill p-2"></i>Create Treatment
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FetchTreatment;
