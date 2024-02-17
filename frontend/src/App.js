import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm.tsx";
import Layout from "./components/layout";

function App() {
  return (
    <Router>
    <Layout>
       <Routes>
        <Route path="/register" element={<SignupForm />} />
      </Routes>
    </Layout>
    </Router>
  );
}

export default App;
