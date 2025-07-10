import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Stack,
  Link,
  Alert,
  FormControlLabel,
  Checkbox,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  MailOutline as MailOutlineIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import logo from "../assets/logo.png";
import illustration from "../assets/login-illustration.png";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    loginMode: "employee",
  });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  const handleLoginModeChange = (event, newMode) => {
    if (newMode !== null) {
      setFormData({ ...formData, loginMode: newMode });
      setErrorMsg("");
      setErrors({});
    }
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password cannot be empty";
    }
    return newErrors;
  }, [formData.email, formData.password]);

  useEffect(() => {
    if (formData.email || formData.password) {
      const timer = setTimeout(() => {
        setErrors(validateForm());
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formData.email, formData.password, validateForm]);

  const handleLogin = async () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMsg("Please correct the errors above.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const { email, password, loginMode } = formData;
      if (
        (loginMode === "admin" &&
          email === "admin@domain.com" &&
          password === "admin123") ||
        (loginMode === "employee" &&
          email === "employee@domain.com" &&
          password === "employee123")
      ) {
        setErrorMsg("Login successful! Redirecting...");
        onLoginSuccess?.(loginMode);
        setTimeout(() => {
          navigate(loginMode === "admin" ? "/AdminDashboard" : "/AttendanceCard");
        }, 1000);
      } else {
        setErrorMsg("Invalid credentials for selected role.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        background:
          "linear-gradient(-45deg, #2193b0, #6dd5ed, #b92b27, #1565C0)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
        "@keyframes gradientAnimation": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          overflow: "hidden",
          maxWidth: 960,
          width: "100%",
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#f4f9fc",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            py: 4,
            px: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Your gateway to On-Duty: A portal that opens the door to{" "}
            <Box component="span" sx={{ color: "#f97316", fontWeight: "bold" }}>
              Active Work.
            </Box>
          </Typography>
          <Box sx={{ mt: 6 }}>
            <img
              src={illustration}
              alt="Illustration"
              style={{ maxWidth: "100%", width: "300px" }}
            />
          </Box>
          <Typography mt={3} textAlign="center" fontSize="16px" color="black">
            <Box component="span" fontWeight="bold">
              Every Head Count
            </Box>{" "}
            - Tracking attendance in{" "}
            <Box component="span" sx={{ color: "#f97316", fontWeight: "bold" }}>
              Real-Time.
            </Box>
          </Typography>
        </Box>

        {/* RIGHT SIDE - LOGIN FORM */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fff",
            px: 5,
            py: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              my: 2,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ height: 60, position: "relative", bottom: 40 }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <ToggleButtonGroup
              value={formData.loginMode}
              exclusive
              onChange={handleLoginModeChange}
              aria-label="login mode"
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: "30px",
                padding: "4px",
                "& .MuiToggleButtonGroup-grouped": {
                  border: "none",
                  borderRadius: "26px",
                  textTransform: "none",
                  padding: "6px 20px",
                  color: "#666",
                  fontWeight: 500,
                  "&.Mui-selected": {
                    backgroundColor: "#f97316",
                    color: "white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#ea580c",
                    },
                  },
                  "&:not(:first-of-type)": {
                    marginLeft: "4px",
                    borderLeft: "1px solid transparent",
                  },
                  "&:first-of-type": {
                    marginRight: "4px",
                  },
                },
              }}
            >
              <ToggleButton value="employee" aria-label="employee login">
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon fontSize="small" />
                  <span>Employee</span>
                </Box>
              </ToggleButton>
              <ToggleButton value="admin" aria-label="admin login">
                <Box display="flex" alignItems="center" gap={1}>
                  <AdminIcon fontSize="small" />
                  <span>Admin</span>
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Typography variant="subtitle1" mb={3}>
            A quick identity check: Pop in your{" "}
            <Box
              component="span"
              sx={{ color: "#f97316", fontWeight: "bold" }}
            >
              "Credentials"
            </Box>
          </Typography>

          <Stack spacing={2}>
            <TextField
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
                      <Typography variant="body1" fontSize="1.2rem">
                        {showPassword ? "🙈" : "👁️"}
                      </Typography>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    name="rememberMe"
                  />
                }
                label="Remember me"
              />

              <Link
                component="button"
                onClick={() => navigate("/ForgotPassword")}
                underline="hover"
              >
                Forgotten Password?
              </Link>
            </Box>

            {errorMsg && (
              <Alert
                severity={errorMsg.includes("success") ? "success" : "error"}
              >
                {errorMsg}
              </Alert>
            )}

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleLogin}
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  height: 48,
                  width: "300px",
                  borderRadius: "24px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  backgroundColor: "#f97316",
                  "&:hover": {
                    backgroundColor: "#ea580c",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                  "&:active": {
                    transform: "translateY(1px)",
                  },
                }}
                endIcon={
                  <KeyboardArrowRightIcon sx={{ fontSize: "1.5rem" }} />
                }
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
