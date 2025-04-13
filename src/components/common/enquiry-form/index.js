"use client";
import Select from "react-select";
import { useState } from "react";
// import PriceRange from "./PriceRange";
// import Bedroom from "./Bedroom";
// import Bathroom from "./Bathroom";
// import Amenities from "./Amenities";
import { useRouter } from "next/navigation";

const EnquiryForm = ({title}) => {
  const router = useRouter();
  // const catOptions = [
  //   { value: "Banking", label: "Apartments" },
  //   { value: "Bungalow", label: "Bungalow" },
  //   { value: "Houses", label: "Houses" },
  //   { value: "Loft", label: "Loft" },
  //   { value: "Office", label: "Office" },
  //   { value: "Townhome", label: "Townhome" },
  //   { value: "Villa", label: "Villa" },
  // ];
  // const locationOptions = [
  //   { value: "All Cities", label: "All Cities" },
  //   { value: "California", label: "California" },
  //   { value: "Los Angeles", label: "Los Angeles" },
  //   { value: "New Jersey", label: "New Jersey" },
  //   { value: "New York", label: "New York" },
  //   { value: "San Diego", label: "San Diego" },
  //   { value: "San Francisco", label: "San Francisco" },
  //   { value: "Texas", label: "Texas" },
  // ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  // Example state to hold form data.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/XXXXXXXX/"; // Replace with your Zapier URL

    try {
      const res = await fetch(zapierWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Optionally, you can get the response from Zapier if needed.
      const data = await res.json();
      console.log("Success:", data);
      setResponseMessage("Data has been sent successfully!");
      // Optionally reset the form:
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to send data to Zapier:", error);
      setResponseMessage("There was an error sending your data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
          {title}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        {/* End modal-header */}

        <div className="modal-body pb-0">
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Price Range</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange />
                </div>
              </div>
            </div>
          </div> */}
          {/* End .row */}

          <div className="row">
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Type</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[catOptions[1]]}
                    name="colors"
                    options={catOptions}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div> */}
            {/* End .col-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">First Name</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Last Name</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Email</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Phone</h6>
                <div className="form-style2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
              </div>
            </div>
            {/* End .col-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bedrooms</h6>
                <div className="d-flex">
                  <Bedroom />
                </div>
              </div>
            </div> */}
            {/* End .col-md-6 */}

            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom />
                </div>
              </div>
            </div> */}
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Location</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[locationOptions[0]]}
                    name="colors"
                    styles={customStyles}
                    options={locationOptions}
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div> */}
            {/* End .col-md-6 */}

            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Square Feet</h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Min."
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          {/* <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">Amenities</h6>
              </div>
            </div>
            <Amenities />
          </div> */}
        </div>
        {/* End modal body */}

        <div className="modal-footer justify-content-between">
          {/* <button className="reset-button">
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button> */}
          <div className="btn-area">
            <button type="submit" className="ud-btn btn-thm" onClick={handleSubmit} >
              {/* <span className="flaticon-search align-text-top pr10" /> */}
              Submit
            </button>
          </div>
        </div>
        {/* End modal-footer */}
      </div>
    </div>
  );
};

export default EnquiryForm;
