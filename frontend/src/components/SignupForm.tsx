import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import LoaderSpinner from "./LoaderSpinner.tsx";

interface SignupFormData {
  email: string;
  password: string;
  confirm_password: string;
}

const SignupForm: React.FC<SignupFormData> = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirm_password: "",
  });

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setPasswordError(true);
      return;
    }

    setIsLoading(true);

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setIsSubmitted(true);
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
      })
      .catch((error) => {
        console.error("Error submitting form", error);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} className="w-full">
        <TextField
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
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
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
          margin="normal"
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          Sign Up
        </Button>
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
    </Box>
  );
};

export default SignupForm;
