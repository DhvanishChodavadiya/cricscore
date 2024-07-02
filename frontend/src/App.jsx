import RegisterForm from "./components/RegisterForm";
import {Route,Routes} from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="register" element={<RegisterForm />} />
    </Routes>
  )
}

export default App
