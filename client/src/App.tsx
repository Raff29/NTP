import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import Layout from "./components/Layout";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <ThemeProvider theme={theme}> */}
        <Layout>
          <Routes>
            <Route path="/" />
            <Route
              path="/register"
              element={
                <SignUpForm email={""} password={""} confirm_password={""} />
              }
            />
            <Route
              path="/login"
              element={<SignInForm email={""} password={""} />}
            />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Layout>
        {/* </ThemeProvider> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
