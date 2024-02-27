import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import Layout from "./components/Layout";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      {/* <ThemeProvider theme={theme}> */}
      <Layout>
        <Routes>
          <Route
            path="/register"
            element={
              <SignUpForm email={""} password={""} confirm_password={""} />
            }
          />
          <Route
            path="/login"
            element={
              <SignInForm email={""} password={""}  />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard />
            }
          />
        </Routes>
      </Layout>
      {/* </ThemeProvider> */}
    </Router>
  );
}

export default App;
