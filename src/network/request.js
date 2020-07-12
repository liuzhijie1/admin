import axios from 'axios';
import storage from 'good-storage';
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'

export const request1 = (config)=>{
    let instance = axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:10000,
    })

    instance.interceptors.request.use((config)=>{
        NProgress.start();
        config.headers.Authorization = storage.session.get('token'); 
        return config;
    })

    instance.interceptors.response.use((response)=>{
        NProgress.done();
        // console.log(response);
        return response.data
    })

    return instance(config);
}