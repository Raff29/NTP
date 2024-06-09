import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import AuthContext from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";

interface SignUpFormData {
  email: string;
  password: string;
  confirm_password: string;
}

const SignUpForm: React.FC<SignUpFormData> = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirm_password: "",
  });
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

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
      await auth?.register(
        formData.email,
        formData.password,
        formData.confirm_password
      );
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '75vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(3),
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={emailError}
              helperText={emailError ? "Invalid email format" : ""}
              onBlur={() => validateEmail(formData.email)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              error={passwordError}
              helperText={passwordError ? "Passwords do not match" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: theme.palette.primary.main,
                color: 'white',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
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
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
