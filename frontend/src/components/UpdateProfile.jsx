import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    mobileNo: "",
    jerseyNo: "",
    city: "",
    state: "",
    DOB: "",
    playingRole: "",
    battingStyle: "",
    bowlingStyle: "",
    gender: ""
  });

  useEffect(() => {
    const users = localStorage.getItem("user");
    const user = JSON.parse(users);
    setFormData({
      email: user.email,
      mobileNo: user.mobileNo,
      fullName: user.fullName,
    });
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  };

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("/api/v1/user/updateProfile",formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form>
        <div className="w-[100%] text-center">
          <input
            readOnly
            value={formData.email}
            type="text"
            placeholder="Enter email"
            name="email"
            className="lg:w-[65%] lg:p-3 border-2 border-gray-500 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.fullName}
            type="text"
            placeholder="Enter full name"
            name="fullName"
            className="lg:w-[65%] lg:p-3 border-2 border-gray-500 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] flex justify-center">
          <input
            readOnly
            value="+91"
            type="text"
            className="mr-[2%] lg:w-[10%] lg:p-3 border-2 border-gray-500 w-[15%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
          />
          <input
            readOnly
            value={formData.mobileNo}
            type="text"
            placeholder="Enter mobile number"
            name="mobileNo"
            className="lg:w-[53%] lg:p-3 border-2 border-gray-500 w-[73%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.jerseyNo}
            type="text"
            placeholder="Enter jersey number"
            name="jerseyNo"
            className="lg:w-[65%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.city}
            type="text"
            placeholder="Enter city"
            name="city"
            className="lg:w-[65%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.state}
            type="text"
            placeholder="Enter state"
            name="state"
            className="lg:w-[65%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <input
            value={formData.DOB}
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            placeholder="Enter birth date"
            name="DOB"
            className="lg:w-[65%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%] text-center">
          <select
            value={formData.playingRole}
            className="lg:w-[65%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            name="playingRole"
            onChange={onChangeHandler}
          >
            <option selected hidden value="none" className="font-thin text-xl">
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
            className="lg:w-[65%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            name="battingStyle"
            onChange={onChangeHandler}
          >
            <option selected hidden value="" className="font-thin text-xl">
              Select batting style
            </option>
            <option value="Left-hand bat">Left-hand bat</option>
            <option value="Right-hand bat">Right-hand bat</option>
          </select>
        </div>
        <div className="w-[100%] text-center">
          <select
            value={formData.bowlingStyle}
            className="lg:w-[65%] lg:p-3 border-2 border-gray-600 w-[90%] p-4 rounded font-mono text-xl mb-4 mt-2 focus:border-black"
            name="bowlingStyle"
            onChange={onChangeHandler}
          >
            <option value="" selected hidden className="font-thin text-xl">
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
          <div className="flex w-[90%] lg:w-[65%]">
            <label className="font-mono text-2xl pr-6">
              <input
                checked={formData.gender === "Male"}
                type="radio"
                name="gender"
                value="Male"
                className="mr-2 h-[18px] w-[18px]"
                onChange={onChangeHandler}
              />
              Male
            </label>
            <label className="font-mono text-2xl pr-6">
              <input
                checked={formData.gender === "Female"}
                type="radio"
                name="gender"
                value="Female"
                className="mr-2 h-[18px] w-[18px]"
                onChange={onChangeHandler}
              />
              Female
            </label>
            <label className="font-mono text-2xl pr-6">
              <input
                checked={formData.gender === "Other"}
                type="radio"
                name="gender"
                value="Other"
                className="mr-2 h-[18px] w-[18px]"
                onChange={onChangeHandler}
              />
              Other
            </label>
          </div>
        </div>
        <div className="text-center mt-8 mb-4">
          <button onClick={onSubmitHandler} className="w-[150px] p-4 font-mono rounded-md bg-blue-600 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
