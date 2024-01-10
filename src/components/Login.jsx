import React, { useEffect, useContext } from "react";
import Button from "./SharedComponents/Button";
import { useForm } from "../hooks/useForm";
import { getUsersList } from "../services/localStorage";
import { useNavigate } from "react-router-dom";
import { context } from "../Context/Store";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
const Login = () => {
  const {
    users,
    setUsers,
    errorMessage,
    setErrorMessage,
    setname,
    showPass,
    setShowPass,
    setNavigateHome
  } = useContext(context);
  const navigate = useNavigate();
  
  const { inputValues, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    setUsers(getUsersList());
  }, []);

  const checkUser = users.find(
    (user) =>
      user.email === inputValues.email && user.password === inputValues.password
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkUser) {
      setNavigateHome(true)
      navigate("/home");
      setname(checkUser.name);
    } else {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="form_shadow container mx-auto bg-gray-100 rounded-2xl py-8 px-5 max-w-96 my-auto mt-40">
        <form
          className=" flex-col justify-center items-center space-y-3 w-full   "
          onSubmit={handleSubmit}
        >
          <h3 className="text-left text-2xl font-bold">Sign In</h3>

          {errorMessage && (
            <div className="text-center border rounded-md p-2 bg-rose-400 bg-opacity-20">
              <p className=" text-[#EA1515] "> Invalid email or password!</p>
            </div>
          )}
          <div className="w-full">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email <span className="text-[#ed4141]">*</span>
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:border-[#26b7cd]"
              type="text"
              id="email"
              name="email"
              placeholder="Enter your Email"
              onChange={handleInputChange}
              value={inputValues.email}
            />
          </div>

          <div className="w-full relative">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password <span className="text-[#ed4141]">*</span>
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:border-[#26B7CD]"
              type={showPass ? "password" : "text"}
              id="password"
              name="password"
              placeholder="Enter your Password"
              onChange={handleInputChange}
              value={inputValues.password}
            />
            <span
              className="eyeIcon absolute text-xl top-9 right-4"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <IoIosEyeOff /> : <IoIosEye />}
            </span>
          </div>

          <Button type="submit" className="w-full h-11" task="add">
            Submit
          </Button>
          <p className="or text-center text-sm text-[#98A2B3] font-normal relative">
            OR
          </p>
          <p className=" text-center text-sm text-black font-normal ">
            Don’t have account?{" "}
            <button
              className="underline text-[#197A89]"
              onClick={() => navigate("/signUp")}
            >
              SignUp
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
