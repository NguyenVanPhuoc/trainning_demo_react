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
  store(params) {
    const url = "admin/admins/store";
    return axiosClient.post(url, params);
  },
  edit(id) {
    const url = `admin/admins/edit/${id}`;
    return axiosClient.get(url);
  },
  update(params, id) {
    const url = `admin/admins/update/${id}`;
    return axiosClient.post(url, params);
  },
  destroy(id) {
    const url = `admin/admins/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default adminApi;
