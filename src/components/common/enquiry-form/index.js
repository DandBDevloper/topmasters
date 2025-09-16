"use client";
import { useState } from "react";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Don't forget to import the styles

// It's best practice to store URLs like this in environment variables (.env.local)
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/XXXXXXXX/";

const EnquiryForm = ({ title }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ type: "", text: "" });

  // --- Form Validation ---
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!isPossiblePhoneNumber(formData.phone)) {
      newErrors.phone = "This phone number is not valid.";
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  
  // --- Input Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    // The 'value' is the phone number string in E.164 format
    setFormData((prev) => ({ ...prev, phone: value || "" }));
  };

  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage({ type: "", text: "" });

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setLoading(true);

    try {
      const res = await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      setResponseMessage({
        type: "success",
        text: "Thank you! Your enquiry has been sent successfully.",
      });
      // Reset the form after successful submission
      setFormData({ name: "", email: "", phone: "" });
      setErrors({});

    } catch (error) {
      console.error("Failed to send data to Zapier:", error);
      setResponseMessage({
        type: "error",
        text: "Sorry, there was an error sending your message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>

        <div className="modal-body pb-0">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row">
              <div className="col-sm-6">
                <div className="widget-wrapper">
                  <h6 className="list-title">Full Name</h6>
                  <div className="form-style2">
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <small className="text-danger mt-1 d-block">{errors.name}</small>}
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="widget-wrapper">
                  <h6 className="list-title">Email</h6>
                  <div className="form-style2">
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <small className="text-danger mt-1 d-block">{errors.email}</small>}
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="widget-wrapper">
                  <h6 className="list-title">Phone</h6>
                  <div className={`form-style2 ${errors.phone ? 'is-invalid-phone' : ''}`}>
                    <PhoneInput
                      international
                      defaultCountry="AE" // Setting default to UAE
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="form-control"
                    />
                    {errors.phone && <small className="text-danger mt-1 d-block">{errors.phone}</small>}
                  </div>
                </div>
              </div>
            </div>

            {responseMessage.text && (
              <div className={`mt-3 alert ${responseMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                {responseMessage.text}
              </div>
            )}
            
            <div className="modal-footer justify-content-end border-0 mt-2">
              <div className="btn-area">
                <button
                  type="submit"
                  className="ud-btn btn-thm"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;