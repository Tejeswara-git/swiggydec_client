import React from "react";
import Mainpage from "./Pages/Mainpage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./Components/ProductPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/product/:firmId/:firmName" element={<ProductPage />} />
      </Routes>
    </div>
  );
};

export default App;
