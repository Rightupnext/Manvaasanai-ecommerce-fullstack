import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/reducers/userReducers";
import loginImg from "../../images/assets/login-img.jpg";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../images/assets/brahmmis logo recreate.png";
import { notification } from "antd";
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth.loginUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (status === "success") {
      const role = localStorage.getItem("role");

      navigate(role === "admin" ? "/dashboard" : "/");

      setEmail("");
      setPassword("");
      setTermsAccepted(false);
    } else if (status === "error" && error) {
      notification.open({
        type: "error",
        description: error,
        duration: 3,
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
          <img src={Logo} className="w-[110px] justify-center m-auto" />
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

              <div className="relative">
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-3 pr-10 block w-full appearance-none"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 flex items-center"
                  style={{ fontSize: "15px" }}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaLockOpen /> : <FaLock />}
                </span>
              </div>
            </div>

            <div className="form-check d-flex justify-content-center mb-5">
              <input
                className={
                  !termsAccepted
                    ? "border-red-500 form-check-input me-2 border-2 ring-red-500"
                    : "form-check-input me-2"
                }
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                id="form2Example3cg"
              />

              <label
                className="form-check-label text-black-500 hover:text-blue-700 text-xs"
                htmlFor="form2Example3g"
              >
                I agree to the{" "}
                <Link
                  href="/signin"
                  className="text-blue-500 hover:text-blue-700 text-xs"
                >
                  <u>Terms & Conditions</u>
                </Link>
              </label>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={status === "pending" || !termsAccepted}
                className={`${
                  !termsAccepted
                    ? "bg-gray-300 text-white font-bold py-1 px-3 w-full rounded cursor-not-allowed"
                    : "bg-gray-700 text-white font-bold py-1 px-3 w-full rounded hover:bg-gray-600"
                }`}
              >
                {status === "pending" ? "Logging in..." : "Sign In"}
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4" />
            <Link
              to="/signup"
              className="text-xs text-green-400 uppercase font-extrabold hover:underline underline-offset-[5px] hover:border-b-2 border-green-400"
            >
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
