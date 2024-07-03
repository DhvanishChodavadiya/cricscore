import { useState } from "react";
import logo from "../assets/logo.png";
// import { FcAddImage } from "react-icons/fc";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    // jerseyNo: "",
    mobileNo: "",
    password: "",
    // city: "",
    // state: "",
    // DOB: "",
    // playingRole: "",
    // battingStyle: "",
    // bowlingStyle: "",
    // gender: "",
    // profilePhoto: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    console.log(formData);
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/v1/user/register", formData)
      .then((response) => {
        setFormData({
          email: "",
          mobileNo: "",
          password: "",
          fullName: "",
        });
        alert(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="h-[100vh] w-[100%] lg:flex lg:justify-center items-center">
      <div className="w-[100%]  lg:flex lg:justify-center">
        <img src={logo} className="lg:w-[50%]"/>
      </div>
      <form className="w-[100%] lg:bg-blue-500" onSubmit={onSubmitHandler}>
        <div className="w-[100%] text-center">
          <input
            value={formData.email}
            type="text"
            placeholder="Enter email"
            name="email"
            className="lg:w-[50%] lg:p-3 border-2 border-gray-500 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.fullName}
            type="text"
            placeholder="Enter full name"
            name="fullName"
            className="lg:w-[50%] lg:p-3 border-2 border-gray-500 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.mobileNo}
            type="text"
            placeholder="Enter mobile number"
            name="mobileNo"
            className="lg:w-[50%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.password}
            type="text"
            placeholder="Enter password"
            name="password"
            className="lg:w-[50%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        {/* <div className="w-[100%] text-center">
          <input
            value={formData.jerseyNo}
            type="text"
            placeholder="Enter jersey number"
            name="jerseyNo"
            className="lg:w-[50%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.city}
            type="text"
            placeholder="Enter city"
            name="city"
            className="lg:w-[50%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.state}
            type="text"
            placeholder="Enter state"
            name="state"
            className="lg:w-[50%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.DOB}
            type="date"
            placeholder="Enter birth date"
            name="DOB"
            className="lg:w-[50%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <select
            value={formData.playingRole}
            className="lg:w-[50%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            name="playingRole"
            onChange={onChangeHandler}
          >
            <option value="" className="font-thin text-xl">
              Select playing role
            </option>
            <option value="Top-order batter">Top-order batter</option>
            <option value="Middle-order batter">Middle-order batter</option>
            <option value="Wicket-keeper batter">Wicket-keeper batter</option>
            <option value="Wicket-keeper">Wicket-keeper</option>
            <option value="Bowler">Bowler</option>
            <option value="All-rounder">All-rounder</option>
            <option value="Lower-order batter">Lower-order batter</option>
            <option value="Opening-batter">Opening-batter</option>
            <option value="None">None</option>
          </select>
        </div>
        <div className="w-[100%] text-center">
          <select
            value={formData.battingStyle}
            className="lg:w-[50%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            name="battingStyle"
            onChange={onChangeHandler}
          >
            <option value="" className="font-thin text-xl">
              Select batting style
            </option>
            <option value="Left-hand bat">Left-hand bat</option>
            <option value="Right-hand bat">Right-hand bat</option>
          </select>
        </div>
        <div className="w-[100%] text-center">
          <select
            value={formData.bowlingStyle}
            className="lg:w-[50%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            name="bowlingStyle"
            onChange={onChangeHandler}
          >
            <option value="" className="font-thin text-xl">
              Select bowling style
            </option>
            <option value="Right-arm fast">Right-arm fast</option>
            <option value="Right-arm medium">Right-arm medium</option>
            <option value="Left-arm fast">Left-arm fast</option>
            <option value="Left-arm medium">Left-arm medium</option>
            <option value="Slow left-arm orthodox">
              Slow left-arm orthodox
            </option>
            <option value="Slow left-arm chinaman">
              Slow left-arm chinaman
            </option>
            <option value="Right-arm Off Break">Right-arm Off Break</option>
            <option value="Right-arm Leg Break">Right-arm Leg Break</option>
            <option value="None">None</option>
          </select>
        </div>
        <div className="w-[100%] flex justify-center">
          <label className="font-mono text-2xl pr-4">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={onChangeHandler}
            />
            Male
          </label>
          <label className="font-mono text-2xl pr-4">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={onChangeHandler}
            />
            Female
          </label>
          <label className="font-mono text-2xl pr-4">
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={onChangeHandler}
            />
            Other
          </label>
        </div> */}
        {/* <div className="w-[100%] flex justify-center">
          <FcAddImage className="text-3xl mt-2" />
          <input
            type="file"
            className="mb-4 mt-2 ml-3"
            onChange={onImageChangeHandler}
          />
        </div> */}
        <div className="flex justify-center mt-2">
          <button className="w-[150px] p-4 font-mono rounded-md bg-blue-600 text-white mb-4">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
