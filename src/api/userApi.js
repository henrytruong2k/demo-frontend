import axiosClient from "./axiosClient";

const userApi = {
    dashboard() {
        const url = '/api/user/dashboard';
        return axiosClient.get(url);
    }
}

export default userApi;