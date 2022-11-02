import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import authApi from "../api/authApi";
import userApi from "../api/userApi";
import { Input } from "../components/Input";

const SignupSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const [message, setMessage] = useState("");
  const onSubmit = async (values) => {
    const response = await authApi.login(values);
    if (response.status === true) {
      const { accessToken, refreshToken, timeExpired, user } = response.data;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("time_expired", timeExpired);
      localStorage.setItem("user", JSON.stringify(user));
    }
    setMessage(response.message);
  };

  const handleClick = async () => {
    try {
      const response = await userApi.dashboard();
      console.log({ response });
    } catch (error) {
      setMessage(error.data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="User Name"
          name="username"
          register={register}
          className="form-control"
          errors={errors.username}
        />
        <br />
        <Input
          label="Password"
          name="password"
          register={register}
          className="form-control"
          errors={errors.password}
        />
        <button type="submit">Gửi</button>
      </form>
      <p>{message}</p>

      <button onClick={handleClick}>Click</button>
    </>
  );
};

export default Login;
