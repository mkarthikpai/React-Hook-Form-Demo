import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState(null);
  const onSubmit = async (data) => {
    // Simulating API Call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Submit form", data);
    setSuccessMessage("Data Submitted Successfully!");
    // Reset the form fields after submit
    reset();
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <>
      <h2>React Hook Form</h2>
      <form className="form-outline" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="form-label">First Name:</label>
          <input
            className={errors.firstName ? "form-input-error" : "form-input"}
            {...register("firstName", {
              required: true,
              minLength: 3,
              maxLength: 200,
            })}
          />
          {errors.firstName && (
            <p style={{ color: "red", fontSize: "0.75rem" }}>
              First name is required and Minimum atleast 3 characters and
              Maximum atmost 200 characters.
            </p>
          )}
        </div>
        <br />
        <div>
          <label className="form-label">Middle Name:</label>
          <input
            className={errors.middleName ? "form-input-error" : "form-input"}
            {...register("middleName")}
          />
        </div>
        <br />
        <div>
          <label className="form-label">Last Name:</label>
          <input
            className={errors.lastName ? "form-input-error" : "form-input"}
            {...register("lastName", {
              required: true,
              minLength: 3,
              maxLength: 200,
            })}
          />
          {errors.lastName && (
            <p style={{ color: "red", fontSize: "0.75rem" }}>
              Last name is required. Minimum 3 characters, Maximum 200
              characters.
            </p>
          )}
        </div>
        <br />
        {isSubmitSuccessful && successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        <input
          className="submit-button"
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Submitting" : "Submit"}
        />
      </form>
    </>
  );
}

export default App;
