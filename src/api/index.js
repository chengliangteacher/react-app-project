import axios from "axios";
import { API } from "../config"
import { message, Modal } from 'antd';

//=====================================axios拦截器====================================//
const axiosInstance = axios.create({
    baseURL: API
})

axiosInstance.defaults.withCredentials = false;
axiosInstance.defaults.timeout = 1000000;

axiosInstance.defaults.baseURL = API;

axiosInstance.interceptors.request.use(
    config => {
        if (sessionStorage.token) {
            config.headers.Authorization = sessionStorage.token;
        }
        config.headers.source = "pc";
        return config
    },
    err => {
        return Promise.reject(err);
    }
)
axiosInstance.interceptors.response.use(
    res => {
        if (res.data.code === 200 || res.data.success) {
            // message.success("请求成功")
            return res.data;
        } else {
            Modal.error({
                title: "操作失败",
                content: res.data.msg ? res.data.msg : "请联系管理员"
            })
            return Promise.reject(res.data.msg ? res.data.msg : "")
        }
    },
    err => {
        message.error("网络错误");
        return Promise.reject()
    }
)

export default axiosInstance;
