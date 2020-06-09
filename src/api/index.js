import axios from "axios";
import { API } from "../config"
import { message } from 'antd';

//=====================================axios拦截器====================================//
const axiosInstance = axios.create({
  baseURL: API
})

axiosInstance.defaults.withCredentials = false;
axiosInstance.defaults.timeout = 1000000;

axiosInstance.defaults.baseURL = API;

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err);
  }
)
axiosInstance.interceptors.response.use(
    res => {
    if (res.data.code === 200) {
      // message.success("请求成功")
      return res.data;
    } else {
      message.error(res.data.msg ? res.data.msg : "请联系管理员");
    }
  },
  err => {
    message.error("网络错误");
  }
)

export default axiosInstance;
