import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEyeSlash } from "react-icons/fa";
import logo from "../../images/assets/brahmmis logo recreate.png"
import { registerUser } from "../../store/reducers/userReducers";
import { Link } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [role, setRole] = useState("client");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); // State for checkbox

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!termsAccepted) {
      alert("You must accept the terms and conditions to register.");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role,
    };

    // Dispatch the registerUser action with the userData
    dispatch(registerUser(userData));
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-100">
  <img src={logo} alt="Brahmmis Logo" className="w-44" />
</div>

        <div className="w-full p-8 lg:w-1/2">
        <div className="hidden lg:flex lg:w-1/2 align-items-center items-center justify-center bg-gray-100">
          <img src={logo} alt="Brahmmis Logo" style={{ width: "30%" }} />
        </div>



          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-3 block w-full appearance-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-3 block w-full appearance-none"
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
                  Forgot Password?
                </Link>
              </div>

                <div className="relative">
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-3 pr-10 block w-full appearance-none"
                    value={password}
                    type={passwordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FaRegEyeSlash
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    style={{ width: "20px", height: "20px" }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <Link to="/forgot-password" className="text-xs text-gray-500">
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-3 pr-10 block w-full appearance-none"
                  value={cpassword}
                  type={cpasswordVisible ? "text" : "password"}
                  onChange={(e) => setCPassword(e.target.value)}
                  required
                />
                <FaRegEyeSlash
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  style={{ width: "20px", height: "20px" }}
                  onClick={() => setCPasswordVisible(!cpasswordVisible)}
                />
              </div>
            </div>

            <div className="form-check d-flex justify-content-center mb-5">
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                id="form2Example3cg"
              />
              <label className="form-check-label text-black-500 hover:text-blue-700 text-xs" htmlFor="form2Example3g">
                I agree to the{" "}
                <a 
                  href="#!" 
                  className="text-blue-500 hover:text-blue-700 text-xs"
                >
                  <u>Terms & Conditions</u>
                </a>

              </label>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={status === "pending" || !termsAccepted}
                className="bg-gray-700 text-white font-bold py-1 px-3 w-full rounded hover:bg-gray-600"
              >
                {status === "pending" ? "Registering..." : "Sign Up"}
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
