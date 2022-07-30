import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/features/user/userAction";
function Login() {
  const { isLoading, error, user, success } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFromValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // useState(() => {}, [email, password]);
  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success || user) navigate("/");
    // redirect authenticated user to profile screen
  }, [navigate, user, success]);
  //

  const changeHandler = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFromValues({ ...formValues, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const { email, password } = formValues;
      dispatch(login({ email, password }));
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^/s@]+\.[^s@]{2,}$/i;
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
      <h1 className="font-bold  text-3xl mb-8 text-center">Login</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-7">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="input"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            value={formValues.email}
          />
          {formErrors.email && (
            <p className="text-red-600">{formErrors.email}</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            value={formValues.password}
          />
          {formErrors.password && (
            <p className="text-red-600">{formErrors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-mygreen text-white py-2.5 rounded-md outline-none"
        >
          Submit
        </button>
      </form>
      <p className="mt-3">
        New User?{" "}
        <Link to="/register" className="text-blue-600 outline-none">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
