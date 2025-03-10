import { useState, useEffect } from "react";
import "./feedbackform.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Load stored feedback from localStorage (if any)
    const savedFeedback = localStorage.getItem("feedbackData");
    if (savedFeedback) {
      setSubmittedFeedback(JSON.parse(savedFeedback));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Real-time validation
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: validateField(e.target.name, e.target.value),
    }));
  };

  const validateField = (name, value) => {
    if (!value.trim()) return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
    return "";
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.values(formErrors).every((error) => error === "")) {
      setSubmittedFeedback(formData);
      localStorage.setItem("feedbackData", JSON.stringify(formData)); // Save to localStorage
      setFormData({ name: "", email: "", feedback: "" });
      setErrors({});
      setSuccessMessage("Thank you! Your feedback has been submitted.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="title">Feedback Form</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className={errors.feedback ? "error-input" : ""}
          />
          {errors.feedback && <p className="error">{errors.feedback}</p>}
        </div>

        <button type="submit" className="submit-btn" disabled={Object.values(errors).some((err) => err)}>
          Submit
        </button>
      </form>

      {submittedFeedback && (
        <div className="feedback-display">
          <h3>Submitted Feedback:</h3>
          <p><strong>Name:</strong> {submittedFeedback.name}</p>
          <p><strong>Email:</strong> {submittedFeedback.email}</p>
          <p><strong>Feedback:</strong> {submittedFeedback.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
