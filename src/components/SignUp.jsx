import React, { useEffect, useContext } from "react";
import Button from "./SharedComponents/Button";
import { useForm } from "../hooks/useForm";
import { addUser, getUsersList } from "../services/localStorage";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { context } from "../Context/Store";
import Joi from "joi";

const SignUp = () => {
  const {
    users,
    setUsers,
    errorMessage,
    setErrorMessage,
    showPass,
    setShowPass,
    errorList,
    setErrorList
  } = useContext(context);

  const navigate = useNavigate();
  
  const { inputValues, handleInputChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setUsers(getUsersList());
  }, []);

  const checkUser = users.find(
    (user) =>
      user.email === inputValues.email
  );


  // Validation scheme

  const validateSignIn = () => {
    let scheme = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string()
        .email({ tlds: ["com"] })
        .required(),
      password: Joi.string()
        .required()
        .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),   
    });
    
    return scheme.validate(inputValues, { abortEarly: false });
  };


  // Submit form function

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateSignIn();
    if (validation.error) {
      setErrorList(validation.error.details);
    } else {
      if (checkUser) {
        console.log("exist");
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
      } else {
        addUser(inputValues);
        console.log("not");
        navigate("/");
      }
    }
  };



  return (
    <>
      {errorList.forEach((err) => {
        if (err.context.label === "password") {
          err.message =
            "Min 8 characters, at least one uppercase letter, at least one digit.";
        } else if (err.context.label === "name") {
          err.message = "Name must be at least 3 characters";
        } else {
          err.message = "Invalid email.";
        }
      })}

      <div className="form_shadow container mx-auto bg-gray-100 rounded-2xl py-8 px-5 max-w-96 my-auto mt-40">
        <form
          className=" flex-col justify-center items-center space-y-3 w-full   "
          onSubmit={handleSubmit}
        >
          <h3 className="text-left text-2xl font-bold">Sign Up</h3>
          {errorMessage && (
            <div className="text-center border rounded-md p-2 bg-rose-400 bg-opacity-20">
              <p className=" text-[#EA1515] ">
                {" "}
                Email already exist!
              </p>
            </div>
          )}
          <div className="w-full">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Name 
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:border-[#26b7cd]"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
              onChange={handleInputChange}
              value={inputValues.name}
            />
            <p className="text-left text-sm text-[#ed4141] font-normal relative">
              {
                errorList.filter((err) => err.context.label === "name")[0]
                  ?.message
              }
            </p>
          </div>

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
            <p className="text-left text-sm text-[#ed4141] font-normal relative">
              {
                errorList.filter((err) => err.context.label === "email")[0]
                  ?.message
              }
            </p>
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
            <p className="text-left text-sm text-[#ed4141] font-normal relative">
              {
                errorList.filter((err) => err.context.label === "password")[0]
                  ?.message
              }
            </p>
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
              onClick={() => navigate("/")}
            >
              SignIn
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
