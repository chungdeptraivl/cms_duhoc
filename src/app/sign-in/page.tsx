"use client";

import React, { useEffect, useState } from "react";
import { login } from "../../../services/authService";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setAuthResponse } from "../../../store/slices/adminSlice";

const SignInPage = () => {
  const router = useRouter();
  const dispath = useAppDispatch();
  const dataAdmin = useAppSelector((state) => state.admin.result);

  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const isFormValid =
    emailError === "" &&
    passwordError === "" &&
    username !== "" &&
    password !== "";

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const forbiddenCharacters = /[!#$%^&*()_+={}[\]|\\:";'<>?,/]/;
    const disposableDomains = [
      "tempmail.com",
      "mailinator.com",
      "guerrillamail.com",
      "10minutemail.com",
    ];

    if (username.trim() === "") {
      setEmailError("Email là bắt buộc.");
    } else if (!emailPattern.test(username)) {
      setEmailError("Email không hợp lệ.");
    } else if (username.trim().length > 254) {
      setEmailError("Email không dài quá 254 kí tự.");
    } else if (forbiddenCharacters.test(username)) {
      setEmailError("Email không được chứa ký tự đặc biệt không hợp lệ.");
    } else if (disposableDomains.some((domain) => username.endsWith(domain))) {
      setEmailError("Email không được từ các dịch vụ email tạm thời.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordBlur = async () => {
    if (password.trim() === "") {
      setPasswordError("Password là bắt buộc.");
    } else if (password.trim().length < 6) {
      setPasswordError("Password phải có ít nhất 6 kí tự.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const response = await login(username, password);
    if (response) {
      dispath(setAuthResponse(response));
      sessionStorage.setItem("admin", JSON.stringify(response));
      router.push("/home");
      console.log("Login successful", response);
    } else {
      setLoginError("Đăng nhập thất bại!!! Vui lòng thử lại");
    }
  };

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");
    
    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      const accessToken = parsedAdminData.result?.accessToken;
      if (accessToken) {
        router.push("/home");
      } else {
        router.push("/sign-in");
      }
    }
  }, [router]);


  return (
    <div className="w-screen h-screen relative flex items-center justify-center">
      <img
        src="/bg.jpeg"
        alt="back ground login"
        className="w-full h-full blur-sm absolute"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white sm:w-[24%] w-[94%] min-w-[350px] max-w-[500px] h-auto z-10 px-4 py-3 rounded-3xl shadow-[1px_1px_4px_1px_#dddddd]"
      >
        <p className="px-4 pt-2 pb-3 text-[32px] font-[500] text-gray-700 text-start">
          Sign In
        </p>

        <div className="py-3 flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="email" className="text-[16px] text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@123"
              value={username}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className="p-3 border border-gray-600 rounded-lg w-full focus:outline-gray-600"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="password" className="text-[16px] text-gray-700">
                Password:
              </label>

              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#8f8f8f"
                    className="w-6"
                  >
                    <path
                      d="M22 12C22 12 21.3082 13.3317 20 14.8335M10 5.23552C10.3244 5.15822 10.6578 5.09828 11 5.05822C11.3254 5.02013 11.6588 5 12 5C14.8779 5 17.198 6.43162 18.8762 8M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47202 13.8524 9.17073 13C9.11389 12.8392 9.07037 12.6721 9.0415 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
                      stroke="#5e5e5e"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#8f8f8f"
                    className="w-6"
                  >
                    <path
                      d="M22 12C22 12 18.3636 19 12 19C5.63636 19 2 12 2 12C2 12 5.63636 5 12 5C14.8779 5 17.198 6.43162 18.8762 8M9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9"
                      stroke="#5e5e5e"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                )}

                <span className="text-[16px] text-gray-700">
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className="p-3 border border-gray-600 rounded-lg w-full focus:outline-gray-600"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
        </div>

        {loginError && <p className="text-red-500">{loginError}</p>}

        <button
          type="submit"
          className={`w-full p-3 rounded-xl mt-10 mb-3 text-white text-xl font-[600] ${
            isFormValid ? "bg-gray-600 hover:bg-gray-700" : "bg-slate-300"
          }`}
          disabled={!isFormValid}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
