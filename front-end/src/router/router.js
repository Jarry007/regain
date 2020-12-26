export default [
    {
        path:'/',
        name:'Login',
        component:()=>import ('@/views/login.vue'),
        meta:{
            title:'登录'
        }
    },
    {
        path:'/index',
        name:'Index',
        component:()=>import ('@/views/index.vue')
    },
    {
        path:'/code',
        name:'Code',
        component:()=>import ('@/views/code.vue')
    }
]