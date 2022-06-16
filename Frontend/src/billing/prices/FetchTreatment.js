import React, { useState, useEffect } from "react";
import PriceList from "../components/PriceList";
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
    <div>
      <PriceList items={loadedPrices} />
    </div>
  );
}

export default FetchTreatment;
