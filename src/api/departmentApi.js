import axiosClient from "./axiosClient";

const departmentApi = {
  list(params) {
    const url = "admin/departments/";
    return axiosClient.get(url, params);
  },
};

export default departmentApi;
