import React from "react";
import { imageset } from "../imagedata";

const Itemdisplay = () => {
  return (
    <div className="item-display">
      <div className="item-grid">
        {imageset.map((item) => {
          return (
            <div key={item.id} className="item-card">
              <img src={item.image} alt="image pic" className="item-image" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Itemdisplay;
