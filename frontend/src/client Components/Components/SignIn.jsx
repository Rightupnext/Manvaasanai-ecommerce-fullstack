import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/reducers/userReducers";
import loginImg from "../../images/assets/login-img.jpg"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth.loginUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      Swal.fire({
        icon: "warning",
        title: "Terms & Conditions",
        text: "You must accept the terms and conditions to log in.",
      });
      return;
    }

    const loginData = { email, password };
    dispatch(loginUser(loginData));
  };

  // Handle navigation based on authentication status
  useEffect(() => {
    if (status === "success") {
      const role = localStorage.getItem("role");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${role === "admin" ? "Admin" : "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate(role === "admin" ? "/dashboard" : "/");
      });

      setEmail("");
      setPassword("");
      setTermsAccepted(false);
    } else if (status === "error" && error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error,
      });
    }
  }, [status, error, navigate]);
  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
       <div
         className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-100 bg-cover bg-center"
         style={{ backgroundImage: `url(${loginImg})` }}
       >
         {/* <img src={logo} alt="Brahmmis Logo" style={{ width: "30%" }} /> */}
       </div>
       
       
       
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
                  Forget Password?
                </Link>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-3 block w-full appearance-none"
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
