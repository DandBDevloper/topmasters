'use client';

import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function Form({ title }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value || '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setResponseMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/sendmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && data.errors) {
          const serverErrors = {};
          for (const key in data.errors) {
            serverErrors[key] = data.errors[key][0];
          }
          setErrors(serverErrors);
        }
        throw new Error(data.message || 'An error occurred.');
      }

      setResponseMessage({ type: 'success', text: data.message });
      setFormData({ name: '', email: '', phone: '' }); // Reset form

    } catch (error) {
      setResponseMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="">

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
                      defaultCountry="AE"
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
            
            <div className="modal-footer justify-content-center border-0 mt-2">
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
}