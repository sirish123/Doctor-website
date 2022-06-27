import React, { useState, useEffect } from "react";
import PriceList from "../components/PriceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

function FetchTreatment() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPrices, setloadedPrices] = useState([]);
  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/price/getit`
        );
        console.log(responseData.price);
        setloadedPrices(responseData.price);
      } catch (err) {}
    };
    fetchTreatment();
  }, [sendRequest]);

  const priceDeletedHandler = (deletedpriceId) => {
    setloadedPrices((prevprices) =>
      prevprices.filter((price) => price.id !== deletedpriceId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="container-fluid">
        <div className="row mt-3 p-2 justify-content-center text-center">
          <div className="col-lg-10 p-0 shadow-sm recordHolder">
            {isLoading && (
              <div
                style={{ zIndex: 10000 }}
                className="position-fixed start-50 top-50 justify-content-center"
              >
                <div className="spinner-border p-4" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <table className="table table-condensed recordTable table-borderless position-relative">
              <thead>
                <tr>
                  <th>Treatment</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {!isLoading && loadedPrices && (
                <PriceList
                  items={loadedPrices}
                  onDeletePrice={priceDeletedHandler}
                />
              )}
            </table>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-6 col-md-8 col-12">
              <Card>
                <h3 className="text-center roboto">Treatment not found?</h3>
                <Button type="button" special={`/billing/update`}>
                  <span href="/#" className="btn btn-primary">
                    <i className="bi bi-pen-fill p-2"></i>Create Treatment
                  </span>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FetchTreatment;
