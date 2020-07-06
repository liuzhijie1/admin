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

export const reqMenus = ()=>{
    return request1('menus');
}

export const getUsers = (params)=>{
    return request1({
        url:'users',
        method:'get',
        params,
    })
}