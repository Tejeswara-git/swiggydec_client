import React, { useState, useEffect } from "react";
import { API_PATH } from "../data";
import {
  MdOutlineArrowCircleLeft,
  MdOutlineArrowCircleRight,
} from "react-icons/md";
import { Link } from "react-router-dom";
import {ProgressBar} from "react-loader-spinner"
const Vendordisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollposition, setscrollposition] = useState(0);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_PATH}/vendor/allvendors`);
      const data = await response.json();
      console.log(data);
      setProducts(data.vendors);
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
  const handlescroll = (direction) => {
    const container = document.querySelector(".vendor-grid");
  
    if (direction === "left") {
      container.scroll({
        left: scrollposition - 300,
        behavior: "smooth",
      })
    } else {
      container.scroll({
        left: scrollposition + 300,
        behavior: "smooth",
      })
    }
  };

  return (
    <div className="vendor-display" >
      <div className="vendor-navigation">
        <MdOutlineArrowCircleLeft
          className="nav-arrow left-arrow nav-arrow-icon"
          onClick={() => {
            handlescroll("left");
          }}
        />
        <MdOutlineArrowCircleRight
          className="nav-arrow right-arrow nav-arrow-icon"
          onClick={() => {
         handlescroll("right");
          }}
        />
      </div>
      <div className="vendor-grid" onScroll={(e) => setscrollposition(e.target.scrollLeft)}>
        {products.map((item) => {
          return (
            <div key={item._id}>
              {item.firm.map((vendor) => {
                return (
                  <Link
                    to={`/product/${vendor._id}/${vendor.FirmName}`}
                    key={vendor._id}
                    className="vendor-link"
                  >
                    <div className="vendor-card">
                      <h3 className="vendor-name">{vendor.FirmName}</h3>
                      <img
                        src={`${API_PATH}/firm/uploads/${vendor.image}`}
                        alt={vendor.FirmName}
                        className="vendor-image"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vendordisplay;
