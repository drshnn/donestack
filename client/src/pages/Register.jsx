import React from "react";
import { Link } from "react-router-dom";
function Register() {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1 className="font-bold  text-3xl mb-8 text-center">Register</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-7">
        <div className="field">
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            className="input"
            name="username"
            placeholder="Jon45"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="input"
            name="email"
            placeholder="jon45@abc.xyz"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="*********"
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
        Already a User?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
