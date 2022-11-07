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
    let accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const expiration = new Date(payload.exp * 1000).getTime();
    console.log("local storage token: ", accessToken);
    const now = new Date().getTime();

    if (expiration < now) {
      try {
        console.error("AccessToken Expired");
        const response = await authApi.refreshToken({ token: refreshToken });

        if (response.status === true) {
          let { accessToken: accessTokenRes, refreshToken } = response.data;
          console.log("token response", accessTokenRes);
          accessToken = accessTokenRes;
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    console.log("local storage token 2: ", accessToken);
    // accessToken = localStorage.getItem("access_token");
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
