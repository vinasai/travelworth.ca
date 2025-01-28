import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/logo-white.png";
import BackToHome from "../../components/back-to-home";
import Switcher from "../../components/switcher";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role is "user"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Clear form state when component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Log the full request payload

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/register`,
        {
          email,
          password,
          role,
        }
      );

      // Log the response
      console.log("Registration response:", response.data);

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Error during registration");
      console.error("Error during registration:", error);
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
                <img src={logo} className="mx-auto" alt="FlyPlaces Logo" />
              </Link>
              <h5 className="my-6 text-xl font-semibold">Signup</h5>
              <form className="text-start" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="SignupEmail">
                      Email Address:
                    </label>
                    <input
                      id="SignupEmail"
                      type="email"
                      autoComplete="off"
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="SignupPassword">
                      Password:
                    </label>
                    <input
                      id="SignupPassword"
                      type="password"
                      autoComplete="off"
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="SignupRole">
                      Select Role:
                    </label>
                    <select
                      id="SignupRole"
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  {error && <div className="text-red-500 mb-4">{error}</div>}

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full"
                    >
                      Register
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-slate-400 me-2">
                      Already have an account?
                    </span>
                    <Link
                      to="/login"
                      className="text-black dark:text-white font-bold inline-block"
                    >
                      Sign in
                    </Link>
                  </div>
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
}
