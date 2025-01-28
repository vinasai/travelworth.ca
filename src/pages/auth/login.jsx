import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/logo-white.png";
import BackToHome from "../../components/back-to-home";
import Switcher from "../../components/switcher";
import { useGlobalContext } from "../../context/GlobalProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState(null); // Store user details after login
  const navigate = useNavigate();
  const { login, isAuthenticated } = useGlobalContext();
  const [rememberMe, setRememberMe] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  // Make sure to set withCredentials for cross-origin requests
  axios.defaults.withCredentials = true;

  const storeAuthData = (token, user, email) => {
    if (rememberMe) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userEmail", email);
    } else {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("userEmail", email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/login`,
        { email, password }
      );

      const { token, user } = response.data;

      if (token && user) {
        // localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));
        // sessionStorage.setItem("userEmail", email);

        storeAuthData(token, user, email);

        login(token, user, rememberMe);
        // If the user is an admin, navigate to the admin page
        if (user.role == "admin") {
          navigate("/admin");
        } else {
          navigate("/"); // Redirect to a user dashboard or homepage
        }
      } else {
        setError("Invalid login response.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error during login");
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
        <div className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/6.jpg')] bg-no-repeat bg-center bg-cover"></div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2"
          id="particles-snow"
        ></div>
        <div className="container relative z-3">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
              <Link to="/">
                <img src={logo} className="mx-auto" alt="" />
              </Link>
              <h5 className="my-6 text-xl font-semibold">Login</h5>
              <form className="text-start" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginEmail">
                      Email Address:
                    </label>
                    <input
                      id="LoginEmail"
                      type="email"
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginPassword">
                      Password:
                    </label>
                    <input
                      id="LoginPassword"
                      type="password"
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && <div className="text-red-500 mb-4">{error}</div>}

                  <div className="flex justify-between mb-4">
                    <div className="flex items-center mb-0">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-red-500 focus:border-red-300 focus:ring focus:ring-offset-0 focus:ring-red-500/20 focus:ring-opacity-50 me-2"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        id="RememberMe"
                      />
                      <label
                        className="form-checkbox-label text-slate-400"
                        htmlFor="RememberMe"
                      >
                        Remember me
                      </label>
                    </div>
                    <p className="text-slate-400 mb-0">
                      <Link to="/forgot-password" className="text-slate-400">
                        Forgot password?
                      </Link>
                    </p>
                  </div>

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full"
                    >
                      Login
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-slate-400 me-2">
                      Don't have an account?
                    </span>
                    <Link
                      to="/signup"
                      className="text-black dark:text-white font-bold inline-block"
                    >
                      Sign Up
                    </Link>
                  </div>

                  {/* Display user details after login */}
                  {userDetails && (
                    <div className="mt-6 text-center">
                      <h6 className="text-lg font-semibold">
                        Welcome, {userDetails.email}!
                      </h6>
                      <p className="text-sm text-slate-400">
                        ID: {userDetails.id}
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Switcher />
      <BackToHome />
    </>
  );
};

export default Login;
