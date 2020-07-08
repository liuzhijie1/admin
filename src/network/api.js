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

export const allRoles = ()=>{
    return request1({
        url:'roles',
        method:'get'
    })
}

export const allotRole = (userId,rid)=>{
    return request1({
        url:`users/${userId}/role`,
        method:'put',
        data:{
            rid,
        }
    })
}

export const deleteUserRight = (userId,rid)=>{
    return request1({
        url:`roles/${userId}/rights/${rid}`,
        method:'delete'
    })
}

export const AddRoles = (data)=>{
    return request1({
        url:"roles",
        method:'post',
        data,
    })
}

export const editRoles = (id,data) => {
    return request1({
        url:`roles/${id}`,
        method:'put',
        data,
    })
}

export const deleteRole = (id)=>{
    return request1({
        url:`roles/${id}`,
        method:'delete'
    })
}