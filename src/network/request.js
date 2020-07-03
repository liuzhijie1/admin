import axios from 'axios';


export const request1 = (config)=>{
    let instance = axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:10000,
    })

    instance.interceptors.request.use((config)=>{
        return config;
    })

    instance.interceptors.response.use((response)=>{
        // console.log(response);
        return response.data
    })

    return instance(config);
}