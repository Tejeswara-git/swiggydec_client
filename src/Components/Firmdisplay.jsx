import React, { useEffect, useState } from "react";
import { API_PATH } from "../data";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";

const Firmdisplay = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchdata = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_PATH}/vendor/allvendors`);
      const data = await response.json();
      setProducts(data.vendors);
      setOriginalProducts(data.vendors);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  if (loading) {
    return (
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
    );
  }

  const regionfilter = (region) => {
    setActiveFilter(region);
    if (region === "all") {
      setProducts(originalProducts);
    } else {
      let filtered = originalProducts.filter((item) =>
        item.firm.some((vendor) => vendor.region.includes(region))
      );
      setProducts(filtered);
    }
  };

  return (
    <div className="firm-display">
      <div className="region-fil">
        <button
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => regionfilter("all")}
        >
          ALL
        </button>
        <button
          className={activeFilter === "north-indian" ? "active" : ""}
          onClick={() => regionfilter("north-indian")}
        >
          North-Indian
        </button>
        <button
          className={activeFilter === "south-indian" ? "active" : ""}
          onClick={() => regionfilter("south-indian")}
        >
          South-Indian
        </button>
        <button
          className={activeFilter === "chinese" ? "active" : ""}
          onClick={() => regionfilter("chinese")}
        >
          Chinese
        </button>
        <button
          className={activeFilter === "bakery" ? "active" : ""}
          onClick={() => regionfilter("bakery")}
        >
          Bakery
        </button>
      </div>
      <div className="firm-grid">
        {products.map((item) => {
          return (
            <div key={item._id}>
              {item.firm.map((vendor) => {
                return (
                  <div key={vendor._id} className="firm-card">
                    <Link
                      to={`/product/${vendor._id}/${vendor.FirmName}`}
                      className="firm-link"
                    >
                      <img
                        src={`${API_PATH}/firm/uploads/${vendor.image}`}
                        alt={vendor.FirmName}
                        className="firm-image"
                      />
                      <div className="firm-info">
                        <h3 className="firm-name">{vendor.FirmName}</h3>
                        <p className="firm-region">
                          {vendor.region.join(", ")}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Firmdisplay;
