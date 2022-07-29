import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";
function Register() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFromValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState([]);
  // useState(() => {}, [email, password]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFromValues({ ...formValues, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));
    setIsSubmit(true);
  };

  const finalSubmit = async (e) => {
    setLoading(true);
    try {
      const res = await authApi.register({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      });
      console.log(res);
      setLoading(false);
    } catch (error) {
      if (error.data) {
        const errors = error.data.errors;
        errors.array.forEach((e) => {
          setBackendError([...backendError, e]);
        });
      } else {
        console.log(error);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      finalSubmit();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^/s@]+\.[^s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required";
    } else if (values.username.length < 3) {
      errors.username = "Please Enter atleast 3 character";
    } else if (values.username.length > 12) {
      errors.username = "Please Enter less than 12 character";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid Email";
      console.log("hi");
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Please Enter Atleast 6 character";
    } else if (values.password.length > 24) {
      errors.password = "Please Enter less than 24 character";
    }
    return errors;
  };
  return (
    <div>
      <h1 className="font-bold  text-3xl mb-8 text-center">Register</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-7">
        {backendError.length > 0 && (
          <div className="w-full bg-red-200 text-red-800 px-2.5 py-1.5">
            {backendError.map((value, index) => (
              <p key={index}>{value}</p>
            ))}
          </div>
        )}
        <div className="field">
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            className="input"
            name="username"
            placeholder="Jon45"
            onChange={changeHandler}
          />
          <p className="text-red-600">{formErrors.username}</p>
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="input"
            name="email"
            placeholder="jon45@abc.xyz"
            onChange={changeHandler}
          />
          <p className="text-red-600">{formErrors.email}</p>
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="*********"
            onChange={changeHandler}
          />
          <p className="text-red-600">{formErrors.password}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-mygreen text-white py-2.5 rounded-md outline-none"
        >
          Submit
        </button>
      </form>
      <p className="mt-3">
        Already a User?{" "}
        <Link to="/login" className="text-blue-600 outline-none">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
