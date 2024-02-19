import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import Layout from "./components/Layout";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

function App() {
  return (
    <Router>
      {/* <ThemeProvider theme={theme}> */}
      <Layout>
        <Routes>
          <Route
            path="/register"
            element={
              <SignupForm email={""} password={""} confirm_password={""} />
            }
          />
        </Routes>
      </Layout>
      {/* </ThemeProvider> */}
    </Router>
  );
}

export default App;
