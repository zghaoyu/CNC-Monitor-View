//axios 封装，待完成
import axios from 'axios'

// axios 实例
const requests = axios.create({
    baseURL: 'api',
    timeout: 10000
});

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 请求拦截器,发送请求前的处理
requests.interceptors.request.use((config) => {
    return config
}, error => {
    return Promise.reject(new Error("failed"));
});

// 响应拦截器，接收响应数据后的处理
requests.interceptors.response.use((res) => {
    // if (res.status == 200){
        return res.data
    // } 
    // else{
    //     return Promise.reject(res)
    // }

}, error => {
    return Promise.reject(new Error("Failed"));
});

//对外暴露
export default requests;