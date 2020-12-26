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
        method:'post',
        data:data
    })
}

export const getListNoAuthor = (params)=>{
    return request({
        url:'/noauthor-list',
        method:'get',
        params:params
    })
}

export const getOne = (uuid)=>{
    return request({
        url:'/get-one',
        method:'get',
        params:uuid
    })
}