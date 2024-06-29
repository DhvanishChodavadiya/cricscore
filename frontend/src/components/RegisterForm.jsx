import { useState } from "react";
import { FcAddImage } from "react-icons/fc";

const RegisterForm = () => {
  const [formData,setFormData] = useState({
    email : "",
    fullName: "",
    jerseyNo: "",
    mobileNo: "",
    password: "",
    city: "",
    state: "",
    DOB: "",
    playingRole: "",
    battingStyle: "",
    bowlingStyle: "",
    gender: "",
    profilePhoto: ""
  })
  const onChangeHandler = (e) => {
    const {name,value} = e.target;
    setFormData(prevState => ({...prevState,[name]:value})
    )
    console.log(formData);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div className="h-[100%] w-[100%] flex justify-center">
      <form className="h-[100%] w-[90%]" onSubmit={onSubmitHandler}>
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Enter email"
            name="email"
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Enter full name"
            name="fullName"
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Enter mobile number"
            name="mobileNo"
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Enter password"
            name="password"
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Enter jersey number"
            name="jerseyNo"
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Enter city"
            name="city"
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Enter state"
            name="state"
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%]">
          <input
            type="date"
            placeholder="Enter birth date"
            name="DOB"
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
            onChange={onChangeHandler}
          />
        </div>
        <div className="w-[100%]">
          <select
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
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
        <div className="w-[100%]">
          <select
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
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
        <div className="w-[100%]">
          <select
            className="border border-black w-full p-3 rounded-md font-thin text-xl mb-4 mt-2"
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
        <div className="w-[100%] flex">
          <label className="font-thin text-2xl pr-4">
            <input type="radio" name="gender" value="Male" onChange={onChangeHandler}/> Male
          </label>
          <label className="font-thin text-2xl pr-4">
            <input type="radio" name="gender" value="Female" onChange={onChangeHandler}/> Female
          </label>
          <label className="font-thin text-2xl pr-4">
            <input type="radio" name="gender" value="Other" onChange={onChangeHandler}/>
            Other
          </label>
        </div>
        <div className="w-[100%] flex">
          <FcAddImage className="text-3xl mt-2"/>
          <input type="file" className="mb-4 mt-2 ml-3" onChange={onChangeHandler}/>
        </div>
        <div className="flex justify-center mt-2 mb-4">
          <button className="w-[150px] p-4 font-medium rounded-md bg-green-500 text-white">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
