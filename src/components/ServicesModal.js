import React from "react";

const ServicesModal = ({ showServices }) => {
  return (
    <div className={showServices ? "d-block" : "d-none"}>
      
      <div className="services-modal-main">
        <div className="container">services modal</div>
      </div>
    </div>
  );
};

export default ServicesModal;
