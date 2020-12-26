import request from '@/utils/request'

export const getFileList = (params)=>{
    return request({
        url:'/get-list',
        method:'get',
        params:params
    })
} 

export const addFiles = (data)=>{
    return request({
        url:'/add-list',
        method:'post',
        data:data
    })
}

export const deleteFiles = (data)=>{
    return request({
        url:'/delete-list',
        method:'put',
        data:data
    })
}