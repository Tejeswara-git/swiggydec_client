import React from "react";
import Navbar from "../Components/Navbar";
import Itemdisplay from "../Components/Itemdisplay";
import Firmdisplay from "../Components/Firmdisplay";
import Vendordisplay from "../Components/Vendordisplay";

const Mainpage = () => {
  return (
    <div className="main-page">
      <Navbar />
      <section className="hero-section">
        <Itemdisplay />
      </section>
      <section className="vendor-section">
        <Vendordisplay />
      </section>
      <section className="firm-section">
        <Firmdisplay />
      </section>
    </div>
  );
};

export default Mainpage;
