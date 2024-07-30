import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import UpdateProfile from "./components/UpdateProfile";
import {Route,Routes} from "react-router-dom";
import ProfilePhoto from "./components/ProfilePhoto";

function App() {

  return (
    <Routes>
      <Route path="register" element={<RegisterForm />} />
      <Route path="home" element={<Home />} />
      <Route path="updateProfile" element={<UpdateProfile />} />
      <Route path="profilePhoto" element={<ProfilePhoto />} />
    </Routes>
  )
}

export default App
