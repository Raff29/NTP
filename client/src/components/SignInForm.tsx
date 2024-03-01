import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoaderSpinner from "./LoaderSpinner";

interface SignInFormData {
  email: string;
  password: string;
}

interface ErrorData {
  message: string;
}

const SignInForm: React.FC<SignInFormData> = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSumit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try { //TODO: replace this
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData: ErrorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      setIsSubmitted(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in", error);
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
          Sign in
        </Typography>
      </div>
      <form onSubmit={handleSumit} className="w-full mt-8">
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
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2, mb: 2 }}
            disabled={isLoading}
            color="primary"
            fullWidth
          >
            Sign In
          </Button>
        </Box>
        {isLoading && <LoaderSpinner loading={isLoading} />}
        {isSubmitted && !errorMessage ? (
          <Alert severity="success" sx={{ mt: 2 }}>
            Sign-in successful!
          </Alert>
        ) : (
          errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )
        )}
      </form>
    </Container>
  );
};

export default SignInForm;
