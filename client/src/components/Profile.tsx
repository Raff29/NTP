import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  useTheme,
  Container,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "./LoaderSpinner";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const fetchProfile = async () => {
    try {
      const response = await fetch("/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Profile fetch failed");
      }

      const data = await response.json();
      console.log("Profile data:", data);
      setName(data.name || "");
      setEmail(data.email || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "75vh",
          padding: theme.spacing(4),
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          <TextField
            margin="dense"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            label="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Change Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            margin="dense"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 1,
              bgcolor: theme.palette.primary.main,
              color: "white",
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
            disabled={isLoading}
          >
            Save
          </Button>
          {isLoading && <LoaderSpinner loading={isLoading} />}
          <Button
            onClick={handleCancel}
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              bgcolor: theme.palette.primary.main,
              color: "white",
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
