import React from "react";
import { Link } from "react-router-dom";
function Login() {
  const submitHandler = (e) => {
    e.preventDefault();
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
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-mygreen text-white py-2.5 rounded-md"
        >
          Submit
        </button>
      </form>
      <p className="mt-3">
        New User?{" "}
        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
