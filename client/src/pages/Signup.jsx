import React, { useState } from "react";
import { Link } from "react-router-dom";
import FrontImage from "../../assets/front-image.png";

const Signup = () => {
  const [formInfo, setFormInfo] = useState({});

  // form data is collected here
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(document.getElementById("sign-in-form"));
    const formData = {};
    for (let [key, value] of form) {
      formData[key] = value;
    }

    setFormInfo(formData);

    fetch("/api/v1/users").then((data)=>{
      console.log(data);
    })
  };

  console.log(formInfo);
  return (
    <div className="flex justify-center items-center gradiant-blue-l h-screen">
      <div className="w-[60%] h-[80vh] gradiant-blue-r rounded-[10px]  flex overflow-hidden drop-shadow-lg shadow-blue">
        {/* left side */}
        <div className=" px-8 py-5 md:w-[60%] h-full hidden md:flex flex-col gap-2">
          <div className="w-[300px] bg-red-9">
            <img
              src={FrontImage}
              alt="frontImage"
              className="w-[100%] object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Councel Your patients <br></br>online
          </h1>
          <p className="text-white">Maintain relationship with them</p>
        </div>

        {/* right side */}
        <div className="md:w-[40%] w-full bg-white px-8 py-5">
          <h1 className="font-extrabold text-2xl gradiant-blue-l text-gradiant">
            Docterz
          </h1>
          <h1 className="mt-[40px] font-NunitoSans text-2xl font-extrabold text-center gradiant-blue-l text-gradiant">
            Welcome! lets <br /> signup
          </h1>
          <form id="sign-in-form" className="mt-5">
            <div className="mt-4">
              <input
                type="text"
                placeholder="username"
                name="username"
                required
                className="px-3 py-2 border-none outline-none bg-slate-100 text-gray w-full rounded-lg"
              />
            </div>
            <div className="mt-4">
              <input
                type="email"
                placeholder="email"
                name="email"
                required
                className="px-3 py-2 border-none outline-none bg-slate-100 text-gray w-full rounded-lg"
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                placeholder="password"
                name="password"
                autoComplete="true"
                required
                className="px-3 py-2 border-none outline-none bg-slate-100 text-gray w-full rounded-lg"
              />
            </div>
            <button
              className="px-5 py-2 gradiant-blue-l mt-4 rounded-lg w-full font-bold text-xl text-white"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Sign up
            </button>
          </form>
          <div className="flex mt-1 justify-evenly items-center">
            <p className="text-[12px] font-semibold text-gray-500">
              If already account
            </p>
            <Link
              className="font-semibold text-[1rem] text-blue-900 underline"
              to="/signin"
            >
              signin
            </Link>
          </div>
          <div className="mt-3 text-center">
            <p className="text-[12px] font-semibold text-gray-500">
              by signin, you accept to
            </p>
            <h3 className="font-bold text-[12px] text-blue-900">
              Terms & Condition
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
