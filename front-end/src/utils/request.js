import axios from 'axios'
import { getToken } from './util'
import store from '@/store'

const service = axios.create({
    baseURL:'http://localhost:5000',
    timeout: 8000
})

service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = getToken()
        }
        return config
    }, error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    res=>{
        const code = ~~(res.data.code) || 500
        if(code===402){
            return store.commit('setToken','')
        }
        if(code === 200){
            return res.data
        }else{
            return Promise.reject(res.data)
        }
    },
    error=>{
        return Promise.reject(error)
    }
)

export default service