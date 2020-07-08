import {request1} from './request';

// 登录验证接口
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

// 获得左侧菜单权限
export const reqMenus = ()=>{
    return request1('menus');
}

// 获得所有用户数据列表
export const getUsers = (params)=>{
    return request1({
        url:'users',
        method:'get',
        params,
    })
}

// 修改用户状态
export const changeUserState = (uId,type) => {
    return request1({
        url:`users/${uId}/state/${type}`,
        method:'put',
    })
}

// 添加用户
export const addUser = (data) => {
    return request1({
        url:'/users',
        method:'post',
        data,
    })
}

// 编辑用户提交
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

// 删除单个用户
export const deleteUser = (id) => {
    return request1({
        url:`users/${id}`,
        method:'delete'
    })
}

// 所有权限列表
export const allRight = (type)=>{
    return request1({
        url:`rights/${type}`,
        method:'get'
    })
}

// 角色列表
export const allRoles = ()=>{
    return request1({
        url:'roles',
        method:'get'
    })
}

// 分配用户角色
export const allotRole = (userId,rid)=>{
    return request1({
        url:`users/${userId}/role`,
        method:'put',
        data:{
            rid,
        }
    })
}

// 删除角色指定权限
export const deleteUserRight = (userId,rid)=>{
    return request1({
        url:`roles/${userId}/rights/${rid}`,
        method:'delete'
    })
}

// 添加角色
export const AddRoles = (data)=>{
    return request1({
        url:"roles",
        method:'post',
        data,
    })
}


// 编辑提交角色
export const editRoles = (id,data) => {
    return request1({
        url:`roles/${id}`,
        method:'put',
        data,
    })
}

// 删除角色
export const deleteRole = (id)=>{
    return request1({
        url:`roles/${id}`,
        method:'delete'
    })
}


// 角色授权
export const RoleAuth = (userId,rids)=>{
    return request1({
        url:`roles/${userId}/rights`,
        method:'post',
        data:{
            rids,
        }
    })
}


// 请求商品列表数据
export const AllGoods = (params)=> {
    return request1({
        url:'goods',
        method:'get',
        params,
    })
}