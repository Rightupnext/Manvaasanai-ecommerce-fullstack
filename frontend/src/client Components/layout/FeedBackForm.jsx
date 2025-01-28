import React, { useState } from "react";


export default function FeedBackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    testimonial: "",
    rating: 4,
    date: "",
    satisfaction: 5,
    recommend: true,
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mb-4 text-center">Customer Testimonial</h2>
          <p className="text-center">
            We would love to hear about your experience with our service!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Your Testimonial</label>
              <textarea
                className="form-control"
                name="testimonial"
                placeholder="Share your experience with us..."
                value={formData.testimonial}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3 text-center">
              <label className="form-label">Overall Rating</label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      fontSize: "1.8rem",
                      cursor: "pointer",
                      color: star <= formData.rating ? "gold" : "gray",
                    }}
                    onClick={() => setFormData({ ...formData, rating: star })}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Experience</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 text-center">
              <label className="form-label">Satisfaction Level</label>
              <div>
                {[1, 2, 3, 4, 5].map((level) => (
                  <span
                    key={level}
                    style={{
                      fontSize: "2rem",
                      marginRight: "10px",
                      cursor: "pointer",
                      color:
                        level === formData.satisfaction ? "green" : "black",
                    }}
                    onClick={() =>
                      setFormData({ ...formData, satisfaction: level })
                    }
                  >
                    {["😡", "😞", "😐", "😊", "😁"][level - 1]}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Would you recommend us?</label>
              <div>
                <input
                  type="radio"
                  name="recommend"
                  value="yes"
                  checked={formData.recommend}
                  onChange={() => setFormData({ ...formData, recommend: true })}
                />{" "}
                Yes
                <input
                  type="radio"
                  name="recommend"
                  value="no"
                  className="ms-3"
                  checked={!formData.recommend}
                  onChange={() =>
                    setFormData({ ...formData, recommend: false })
                  }
                />{" "}
                No
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
              <label className="form-check-label">
                I consent to the use of my testimonial as outlined in the terms
                and conditions.
              </label>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
