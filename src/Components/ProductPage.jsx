import React, { useEffect } from "react";
import { useState } from "react";
import { API_PATH } from "../data";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {ProgressBar} from "react-loader-spinner"

const ProductPage = () => {
  // const [products, setProducts] = useState([]);
  const [kite, setKite] = useState([]);
  const [loading, setLoading] = useState(false);

  const { firmId, firmName } = useParams();
  console.log(firmId);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_PATH}/product/getallproducts/${firmId}`
      );
      const data = await response.json();
      setKite(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      await fetchdata();
    };
    loadData();
  }, []);

  const navigate = useNavigate();

  if (loading) {
  <h1>Loading...</h1>;
      <div className="loading-section">
          Loading vendors...
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
  }

  // ... (existing code)

  return (
    <div className="product-page">
      <Navbar />
      <div className="product-container">
        <div className="firm-details">
          <h1 className="firm-name">{firmName}</h1>
          <button className="back-button" onClick={() => navigate(-1)}>
            &larr; Back
          </button>
        </div>

        <div className="products-grid">
          {kite.map((item) => {
            return (
              <div className="product-card" key={item._id}>
                <img
                  src={`${API_PATH}/product/uploads/${item.Image}`}
                  alt={item.ProductName}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{item.ProductName}</h3>
                  <p className="product-price">₹{item.Price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
