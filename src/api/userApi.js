import axiosClient from "./axiosClient";

const userApi = {
  dashboard() {
    const url = "/user/dashboard";
    return axiosClient.get(url);
  },
};

export default userApi;
