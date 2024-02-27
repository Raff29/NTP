import React from "react";
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import LoaderSpinner from "./LoaderSpinner";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
interface SignUpFormData {
  email: string;
  password: string;
  confirm_password: string;
}

interface ErrorData {
  message: string;
}

const SignUpForm: React.FC<SignUpFormData> = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setPasswordError(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData: ErrorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setIsSubmitted(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form", error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "white",
        boxShadow: 3,
        borderRadius: "8px",
      }}
    >
      <CssBaseline />
      <div className="container mx-auto mt-20 flex flex-col items-center">
        <Avatar
          sx={{
            marginBottom: 3,
            backgroundColor: "secondary.main",
            marginTop: 3,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit} className="w-full mt-8">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: "auto",
              padding: 2,
            }}
          >
            <TextField
              autoComplete="femail"
              autoFocus
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
              error={emailError}
              helperText={emailError ? "Invalid email format" : ""}
              onBlur={() => validateEmail(formData.email)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              error={passwordError}
              helperText={passwordError ? "Passwords do not match" : ""}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2, mb: 2 }}
              disabled={isLoading}
              color="primary"
              fullWidth
            >
              Sign Up
            </Button>
          </Box>
          {isLoading && <LoaderSpinner loading={isLoading} />}
          {isSubmitted && !errorMessage ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Sign-up successful!
            </Alert>
          ) : (
            errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )
          )}
        </form>
      </div>
    </Container>
  );
};

export default SignUpForm;
