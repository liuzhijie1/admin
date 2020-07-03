import {request1} from './request';

export const reqLogin = ({username,password})=>{
    return request1({
        url:'login',
        method:'post',
        data:{
            username,
            password,
        }
    })
}