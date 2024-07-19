import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import spinner from "../assets/spinner.gif";
import { useNavigate } from "react-router-dom";
// import Home from "./Home.jsx";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registeredOrLoggedin, setRegisteredOrLoggedin] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [loadind, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    mobileNo: "",
    password: ""
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // const onImageChangeHandler = (e) => {
  //   const file = e.target.files[0];
  //   setFileToBase(file);
  // };
  // const setFileToBase = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       profilePhoto: reader.result,
  //     }));
  //   };
  //   console.log(formData);
  // };

  useEffect(() => {
    setEmailError("");
    setMobileError("");
    setPasswordError("");
    setError("");
    setTimeout(() => {
      setRegisteredOrLoggedin("");
    }, 2000);
  }, [isRegistered]);

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(formData);
    setError("");
    setMobileError("");
    setEmailError("");
    setPasswordError("");
    try {
      const response = await axios.post("/api/v1/user/register", formData);
      if (response) {
        setLoading(false);
        setIsRegistered(true);
        setRegisteredOrLoggedin(response.data.message);
        setFormData({
          email: "",
          mobileNo: "",
          password: "",
          fullName: "",
        });
        setError("");
        setMobileError("");
        setEmailError("");
        setPasswordError("");
      }
    } catch (err) {
      setLoading(false);
      if (err.response.data.message == "All fields are required.") {
        setError(err.response.data.message);
        console.error(error);
      }
      if (
        err.response.data.message == "Email already exist, try different email."
      ) {
        setEmailError(err.response.data.message);
        console.error(emailError);
      }
      if (
        err.response.data.message ==
        "Mobile number already exist, try different mobile number."
      ) {
        setMobileError(err.response.data.message);
        console.error(mobileError);
      }
      if (err.response.data.message == "Mobile number should be 10 digits.") {
        setMobileError(err.response.data.message);
      }
      if (
        err.response.data.message ==
        "Password must be between 8 and 16 characters."
      ) {
        setPasswordError(err.response.data.message);
        console.error(passwordError);
      }
    }
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmailError("");
    setPasswordError("");
    try {
      const response = await axios.post("/api/v1/user/login", formData);
      if (response) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data.loggedInUser)
        );
        setLoading(false);
        setRegisteredOrLoggedin(response.data.message);
        setFormData({
          email: "",
          password: "",
        });
        setEmailError("");
        setPasswordError("");
        setError("");
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      if (err.response.data.message == "All fields are required.") {
        setError(err.response.data.message);
      }
      if (err.response.data.message == "User is not found with this email.") {
        setEmailError(err.response.data.message);
      }
      if (err.response.data.message == "Invalid password.") {
        setPasswordError(err.response.data.message);
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100%] lg:flex lg:justify-center items-center">
      <div className="w-[100%]  lg:flex lg:justify-center">
        <img src={logo} className="lg:w-[100%]" />
      </div>
      <form className="w-[100%]">
        <h1 className="w-[100%] text-center mb-5 text-3xl font-semibold text-blue-600">
          {!isRegistered ? "Register" : "Login"}
        </h1>
        <div>
          <div className="w-[100%] text-center">
            <input
              value={formData.email}
              type="text"
              placeholder="Enter email"
              name="email"
              className={
                !error && !emailError
                  ? "lg:w-[65%] lg:p-3 border-2 border-gray-500 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
                  : "lg:w-[65%] lg:p-3 border-[3px] border-red-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2"
              }
              onChange={onChangeHandler}
            />
          </div>
          {!isRegistered && (
            <div className="w-[100%] text-center">
              <input
                value={formData.fullName}
                type="text"
                placeholder="Enter full name"
                name="fullName"
                className={
                  !error
                    ? "lg:w-[65%] lg:p-3 border-2 border-gray-500 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
                    : "lg:w-[65%] lg:p-3 border-[3px] border-red-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2"
                }
                onChange={onChangeHandler}
              />
            </div>
          )}
          {!isRegistered && (
            <div className="w-[100%] flex justify-center">
              <input
                readOnly
                value="+91"
                type="text"
                className="mr-[2%] lg:w-[10%] lg:p-3 border-2 border-gray-500 w-[15%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
              />
              <input
                value={formData.mobileNo}
                type="text"
                placeholder="Enter mobile number"
                name="mobileNo"
                className={
                  !error && !mobileError
                    ? "lg:w-[53%] lg:p-3 border-2 border-gray-500 w-[73%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
                    : "lg:w-[53%] lg:p-3 border-[3px] border-red-600 w-[73%] p-4 rounded font-mono text-xl mb-4 mt-2"
                }
                onChange={onChangeHandler}
              />
            </div>
          )}
          <div className="w-[100%] text-center">
            <input
              value={formData.password}
              type="text"
              placeholder="Enter password"
              name="password"
              className={
                !error && !passwordError
                  ? "lg:w-[65%] lg:p-3 border-2 border-gray-500 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
                  : "lg:w-[65%] lg:p-3 border-[3px] border-red-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2"
              }
              onChange={onChangeHandler}
            />
          </div>
        </div>

        {loadind ? (
          <div className="w-full flex justify-center items-center mt-5">
            <img src={spinner} className="h-[40px] w-[40px]" />
          </div>
        ) : (
          <div>
            {error && (
              <div className="w-[100%] flex justify-center">
                <p className="lg:w-[65%] lg:p-3 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 text-red-800 bg-red-400">
                  {error}
                </p>
              </div>
            )}
            {emailError && (
              <div className="w-[100%] flex justify-center">
                <p className="lg:w-[65%] lg:p-3 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 text-red-800 bg-red-400">
                  {emailError}
                </p>
              </div>
            )}
            {mobileError && (
              <div className="w-[100%] flex justify-center">
                <p className="lg:w-[65%] lg:p-3 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 text-red-800 bg-red-400">
                  {mobileError}
                </p>
              </div>
            )}
            {passwordError && (
              <div className="w-[100%] flex justify-center">
                <p className="lg:w-[65%] lg:p-3 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 text-red-800 bg-red-400">
                  {passwordError}
                </p>
              </div>
            )}
            {registeredOrLoggedin && (
              <div className="w-[100%] flex justify-center">
                <p className="lg:w-[65%] lg:p-3 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 text-green-800 bg-green-400">
                  {registeredOrLoggedin}
                </p>
              </div>
            )}
          </div>
        )}

        {!loadind ? (
          <div
            className={
              error ||
              emailError ||
              mobileError ||
              passwordError ||
              registeredOrLoggedin
                ? "flex justify-center mt-2"
                : "flex justify-center mt-24"
            }
          >
            <button
              className="w-[150px] p-4 font-mono rounded-md bg-blue-600 text-white"
              onClick={!isRegistered ? onSubmitHandler : onLoginHandler}
            >
              {!isRegistered ? "Register" : "Login"}
            </button>
          </div>
        ) : (
          <div
            className={
              error ||
              emailError ||
              mobileError ||
              passwordError ||
              registeredOrLoggedin
                ? "flex justify-center mt-2"
                : "flex justify-center mt-24"
            }
          >
            <button className="opacity-50 cursor-not-allowed w-[150px] flex justify-center items-center p-4 font-mono rounded-md bg-blue-600 text-white">
              Wait...
            </button>
          </div>
        )}
        {!isRegistered ? (
          <div className="w-full text-center font-mono text-blue-600 mt-4">
            <p className="cursor-pointer" onClick={() => setIsRegistered(true)}>
              Already have a user?
            </p>
          </div>
        ) : (
          <div className="w-full text-center font-mono text-blue-600 mt-4">
            <p
              className="cursor-pointer"
              onClick={() => setIsRegistered(false)}
            >
              Dont have an account?
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
