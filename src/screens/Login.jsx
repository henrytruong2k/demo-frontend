import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import authApi from "api/authApi";
import InputField from "components/form-controls/InputField";
import PasswordField from "components/form-controls/PasswordField";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const SignupSchema = yup.object().shape({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

const Login = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (values) => {
    const response = await authApi.login(values);
    if (!response.status) return;
    const { accessToken, refreshToken, user } = response.data;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputField
            form={form}
            margin="normal"
            fullWidth
            id="username"
            label="Username *"
            name="username"
            autoFocus
          />
          <PasswordField
            margin="normal"
            form={form}
            fullWidth
            label="Password *"
            name="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
