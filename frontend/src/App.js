import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
