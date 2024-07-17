

const Home = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user);
 
  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-[40%] h-[100%] p-8  bg-blue-500 flex items-center justify-center">
        <div className="w-[40%] p-2 flex justify-center items-center">
          <img
            src=""
            alt="Profile"
            className=" h-[120px] w-[120px] rounded-full border border-black"
          />
        </div>
        <div className="w-[60%]">
          <div className="">
            <h1 className="text-white font-semibold text-2xl lg:text-3xl">{userData.fullName}</h1>
            <p className="text-white font-thin lg:text-xl mt-1">{userData.mobileNo}</p>
            <button className="bg-blue-700 text-white mt-6 p-3 rounded-md">Complete profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
