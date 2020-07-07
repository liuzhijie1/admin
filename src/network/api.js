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

export const changeUserState = (uId,type) => {
    return request1({
        url:`users/${uId}/state/${type}`,
        method:'put',
    })
}

export const addUser = (data) => {
    return request1({
        url:'/users',
        method:'post',
        data,
    })
}

export const editUser = ({id,email,mobile}) => {
    return request1({
        url:`users/${id}`,
        method:'put',
        data:{
            email,
            mobile,
        }
    })
}

export const deleteUser = (id) => {
    return request1({
        url:`users/${id}`,
        method:'delete'
    })
}

export const allRight = (type)=>{
    return request1({
        url:`rights/${type}`,
        method:'get'
    })
}