import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import Layout from "./components/Layout";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";
import { FilesProvider } from "./context/FileContext";
import LandingPage from "./components/Landing";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2D3748",
    },
    secondary: {
      main: "#38B2AC",
    },
  },
  typography: {
    h2: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 400,
    },
    body1: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 300,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoutes>
                    <LandingPage />
                  </PublicRoutes>
                }
              />
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
                    <FilesProvider>
                      <Dashboard />
                    </FilesProvider>
                  </PrivateRoutes>
                }
              />
            </Routes>
          </Layout>
          {/* </ThemeProvider> */}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
