import axiosClient from "./axiosClient";

const authApi = {
  login(data) {
    const url = "/api/auth/login";
    return axiosClient.post(url, data);
  },
  refreshToken(data) {
    const url = "/api/auth/refresh-token";
    return axiosClient.post(url, data);
  },
};

export default authApi;
