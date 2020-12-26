import  {createRouter,createWebHistory} from 'vue-router'
import routes from './router'
import {getToken} from '@/utils/util'

const router = createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes:routes
})

const noAuthor = 'Code'
const loginPage = 'Login'
const indexPage = 'Index'

router.beforeEach(async(to,from,next)=>{
    if(to.name=== noAuthor) return next()
    console.log('获取token')
    const token = getToken()
    if(!token && to.name !==loginPage){
        next({
            name:loginPage
        })
    }else if(!token && to.name === loginPage){
        next()
    }else if(token && to.name === loginPage){
        next({name:indexPage})
    }else{
        next()
    }
})

export default router