"use client";

import React from "react";
import EnquiryForm from "@/components/common/enquiry-form";

const Modal = ({ title, 
  id,
  ariaLabelledBy = "advanceSeachModalLabel"
}) => {
  return (
    <div className="advance-feature-modal">
      <div
        className="modal fade"
        id={id}
        tabIndex={-1}
        aria-labelledby={ariaLabelledBy}
        aria-hidden="true"
      >
        <EnquiryForm title={title}/>
      </div>
    </div>
  );
};

export default Modal;