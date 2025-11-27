import React, { useReducer, useCallback } from "react";
import "./MultiStepForm.css";

/*
  MultiStepForm.jsx
  - useReducer manages complex form state and step navigation.
  - Four steps: Personal -> Address -> Account -> Review & Submit
  - Each step is a small component (pure, presentational).
  - Validation occurs per-step before advancing.
*/

/* ---------- reducer & initial state ---------- */
const initialState = {
  step: 1,
  isSubmitting: false,
  form: {
    // Step 1: Personal
    firstName: "",
    lastName: "",
    dob: "",
    // Step 2: Address
    country: "",
    city: "",
    postalCode: "",
    // Step 3: Account
    email: "",
    password: "",
    confirmPassword: "",
    subscribe: false,
  },
  errors: {},
  touched: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value }
      };
    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, [action.field]: action.error } };
    case "CLEAR_ERROR":
      {
        const { [action.field]: _omit, ...rest } = state.errors;
        return { ...state, errors: rest };
      }
    case "SET_TOUCHED":
      return { ...state, touched: { ...state.touched, [action.field]: true } };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: Math.max(1, state.step - 1) };
    case "GOTO_STEP":
      return { ...state, step: action.step };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true };
    case "SUBMIT_SUCCESS":
      return { ...initialState, isSubmitting: false }; // reset on success
    case "SUBMIT_FAILURE":
      return { ...state, isSubmitting: false };
    default:
      return state;
  }
}

/* ---------- Validation helpers ---------- */
const validateStep = (step, form) => {
  const errors = {};

  if (step === 1) {
    if (!form.firstName.trim()) errors.firstName = "First name is required.";
    if (!form.lastName.trim()) errors.lastName = "Last name is required.";
    if (!form.dob) errors.dob = "Date of birth is required.";
  }

  if (step === 2) {
    if (!form.country.trim()) errors.country = "Country is required.";
    if (!form.city.trim()) errors.city = "City is required.";
    if (!form.postalCode.trim()) errors.postalCode = "Postal/ZIP code is required.";
    else if (!/^[A-Za-z0-9 -]{3,10}$/.test(form.postalCode)) errors.postalCode = "Invalid postal code format.";
  }

  if (step === 3) {
    if (!form.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email address.";
    if (!form.password) errors.password = "Password is required.";
    else if (form.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

/* ---------- Small presentational step components ---------- */
const StepHeader = ({ step, total = 4 }) => {
  const percent = Math.round((step / total) * 100);
  return (
    <div className="msf-header">
      <div className="msf-steps">
        <span>Step {step} of {total}</span>
        <div className="msf-progress">
          <div className="msf-progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
};

const Step1 = ({ form, onChange, errors, touched }) => (
  <div className="msf-step">
    <h3>Personal Information</h3>
    <label>
      First name
      <input name="firstName" value={form.firstName} onChange={onChange} />
      {touched.firstName && errors.firstName && <div className="msf-error">{errors.firstName}</div>}
    </label>

    <label>
      Last name
      <input name="lastName" value={form.lastName} onChange={onChange} />
      {touched.lastName && errors.lastName && <div className="msf-error">{errors.lastName}</div>}
    </label>

    <label>
      Date of Birth
      <input name="dob" type="date" value={form.dob} onChange={onChange} />
      {touched.dob && errors.dob && <div className="msf-error">{errors.dob}</div>}
    </label>
  </div>
);

const Step2 = ({ form, onChange, errors, touched }) => (
  <div className="msf-step">
    <h3>Address</h3>
    <label>
      Country
      <input name="country" value={form.country} onChange={onChange} />
      {touched.country && errors.country && <div className="msf-error">{errors.country}</div>}
    </label>

    <label>
      City
      <input name="city" value={form.city} onChange={onChange} />
      {touched.city && errors.city && <div className="msf-error">{errors.city}</div>}
    </label>

    <label>
      Postal / ZIP code
      <input name="postalCode" value={form.postalCode} onChange={onChange} />
      {touched.postalCode && errors.postalCode && <div className="msf-error">{errors.postalCode}</div>}
    </label>
  </div>
);

const Step3 = ({ form, onChange, errors, touched }) => (
  <div className="msf-step">
    <h3>Account</h3>
    <label>
      Email
      <input name="email" value={form.email} onChange={onChange} />
      {touched.email && errors.email && <div className="msf-error">{errors.email}</div>}
    </label>

    <label>
      Password
      <input name="password" type="password" value={form.password} onChange={onChange} />
      {touched.password && errors.password && <div className="msf-error">{errors.password}</div>}
    </label>

    <label>
      Confirm Password
      <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={onChange} />
      {touched.confirmPassword && errors.confirmPassword && <div className="msf-error">{errors.confirmPassword}</div>}
    </label>

    <label className="msf-checkbox">
      <input name="subscribe" type="checkbox" checked={form.subscribe} onChange={onChange} />
      Subscribe to newsletter
    </label>
  </div>
);

const Review = ({ form, onEdit }) => (
  <div className="msf-step">
    <h3>Review & Submit</h3>
    <div className="msf-review-grid">
      <div><strong>First name</strong><div>{form.firstName}</div></div>
      <div><strong>Last name</strong><div>{form.lastName}</div></div>
      <div><strong>Date of Birth</strong><div>{form.dob}</div></div>
      <div><strong>Country</strong><div>{form.country}</div></div>
      <div><strong>City</strong><div>{form.city}</div></div>
      <div><strong>Postal</strong><div>{form.postalCode}</div></div>
      <div><strong>Email</strong><div>{form.email}</div></div>
      <div><strong>Subscribed</strong><div>{form.subscribe ? "Yes" : "No"}</div></div>
    </div>

    <div className="msf-edit-links">
      <button type="button" onClick={() => onEdit(1)}>Edit Personal</button>
      <button type="button" onClick={() => onEdit(2)}>Edit Address</button>
      <button type="button" onClick={() => onEdit(3)}>Edit Account</button>
    </div>
  </div>
);

/* ---------- Main MultiStepForm ---------- */
const MultiStepForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, form, errors, touched, isSubmitting } = state;

  const updateField = useCallback((e) => {
    const { name, type, value, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    dispatch({ type: "UPDATE_FIELD", field: name, value: val });
    dispatch({ type: "SET_TOUCHED", field: name });
    // Real-time simple validation clear
    dispatch({ type: "CLEAR_ERROR", field: name });
  }, []);

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      // set errors in state for display
      Object.entries(stepErrors).forEach(([field, err]) => {
        dispatch({ type: "SET_ERROR", field, error: err });
      });
      // mark all fields as touched so errors show
      Object.keys(stepErrors).forEach(field => {
        dispatch({ type: "SET_TOUCHED", field });
      });
      return; // prevent navigation
    }
    dispatch({ type: "NEXT_STEP" });
  };

  const goPrev = () => dispatch({ type: "PREV_STEP" });
  const gotoStep = (s) => dispatch({ type: "GOTO_STEP", step: s });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // final validation across all steps (robust check)
    const errors1 = validateStep(1, form);
    const errors2 = validateStep(2, form);
    const errors3 = validateStep(3, form);
    const allErrors = { ...errors1, ...errors2, ...errors3 };

    if (Object.keys(allErrors).length > 0) {
      Object.entries(allErrors).forEach(([field, err]) => {
        dispatch({ type: "SET_ERROR", field, error: err });
        dispatch({ type: "SET_TOUCHED", field });
      });
      // jump to first error step
      if (Object.keys(errors1).length) dispatch({ type: "GOTO_STEP", step: 1 });
      else if (Object.keys(errors2).length) dispatch({ type: "GOTO_STEP", step: 2 });
      else if (Object.keys(errors3).length) dispatch({ type: "GOTO_STEP", step: 3 });
      return;
    }

    // Simulate submission
    try {
      dispatch({ type: "SUBMIT_START" });
      await new Promise((res) => setTimeout(res, 1200)); // mock network
      // success
      alert("Form submitted successfully!");
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch  {
      dispatch({ type: "SUBMIT_FAILURE" });
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <form className="msf-container" onSubmit={handleSubmit} noValidate>
      <StepHeader step={step} total={4} />

      {step === 1 && <Step1 form={form} onChange={updateField} errors={errors} touched={touched} />}
      {step === 2 && <Step2 form={form} onChange={updateField} errors={errors} touched={touched} />}
      {step === 3 && <Step3 form={form} onChange={updateField} errors={errors} touched={touched} />}
      {step === 4 && <Review form={form} onEdit={gotoStep} />}

      <div className="msf-actions">
        <button type="button" onClick={goPrev} disabled={step === 1 || isSubmitting} className="msf-btn msf-btn--light">
          Back
        </button>

        {step < 4 ? (
          <button type="button" onClick={goNext} className="msf-btn msf-btn--primary">
            Next
          </button>
        ) : (
          <button type="submit" className="msf-btn msf-btn--success" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
