import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/reducers/userReducers";
import { Link } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth.loginUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("You must accept the terms and conditions to register.");
      return;
    }

    const loginData = { email, password };
    dispatch(loginUser(loginData));
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")',
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Brand
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-gray-500">
                  Forget Password?
                </Link>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-check d-flex justify-content-center mb-5">
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                id="form2Example3cg"
              />
              <label className="form-check-label" htmlFor="form2Example3g">
                I agree to the{" "}
                <a href="#!" className="text-body">
                  <u>Terms of service</u>
                </a>
              </label>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={status === "pending" || !termsAccepted}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                {status === "pending" ? "Logging in..." : "Sign In"}
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4" />
            <Link to="/signup" className="text-xs text-gray-500 uppercase">
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
