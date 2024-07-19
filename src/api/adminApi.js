import axiosClient from "./axiosClient";

const adminApi = {
  login(params) {
    const url = "admin/auth/login";
    return axiosClient.post(url, params);
  },
  list(params) {
    const url = "admin/admins/";
    return axiosClient.get(url, params);
  },
  destroy(id) {
    const url = `admin/admins/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default adminApi;
