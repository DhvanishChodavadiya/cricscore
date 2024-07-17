import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import {Route,Routes} from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="register" element={<RegisterForm />} />
      <Route path="home" element={<Home />} />
    </Routes>
  )
}

export default App
