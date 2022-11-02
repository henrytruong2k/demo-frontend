import axios from "axios";
import authApi from "./authApi";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    if (
      config.url.indexOf("/login") >= 0 ||
      config.url.indexOf("/refresh-token") >= 0
    ) {
      return config;
    }
    const timeExpired = localStorage.getItem("time_expired");
    const refreshToken = localStorage.getItem("refresh_token");

    const now = new Date().getTime();
    console.log(`timeExpired:${timeExpired} vs now:${now}`);

    if (timeExpired < now) {
      try {
        console.log("AccessToken Expired");
        const response = await authApi.refreshToken({ token: refreshToken });
        console.log({ response });

        if (response.status === true) {
          const { accessToken, refreshToken, timeExpired } = response.data;
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          localStorage.setItem("time_expired", timeExpired);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }

    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response);
  }
);

export default axiosClient;
