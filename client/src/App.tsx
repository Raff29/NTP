import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
    <Layout>
       <Routes>
        <Route path="/register" element={<SignupForm email={""} password={""} confirm_password={""} />} />
      </Routes>
    </Layout>
    </Router>
  );
}

export default App;