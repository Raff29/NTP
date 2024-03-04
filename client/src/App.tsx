import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignInForm from "./components/SignInForm";
import Layout from "./components/Layout";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";

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
      <PublicRoutes>
        <SignUpForm email="" password="" confirm_password="" />
      </PublicRoutes>
    }
  />
  <Route
    path="/login"
    element={
      <PublicRoutes>
        <SignInForm email="" password="" />
      </PublicRoutes>
    }
  />
  <Route
    path="/dashboard"
    element={
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    }
  />
</Routes>
          </Layout>
        {/* </ThemeProvider> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
