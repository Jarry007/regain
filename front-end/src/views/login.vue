<template>
    <div class="login-form">
        <a-card style="width:400px">
            <h1>xx 登录</h1>
            
            <a-form ref="loginFrom" :model="form" :rules="rule">
                <a-form-item label='用户名' name='username'>
                    <a-input type='text' v-model:value="form.username" placeholder="请输入用户名"></a-input>
                </a-form-item>
                <a-form-item label='密码' name='password'>
                    <a-input type='password' v-model:value="form.password" placeholder="请输入密码"></a-input>
                </a-form-item>
            </a-form>
            
            <a-button block type='primary' @click="handleLogin">登录</a-button>
        </a-card>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import {login} from '@/api/login'
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router'


export default {
    name:'Login',
    setup(){
        const datas = reactive({
            form:{
                username:'',
                password:''
            },
            rule:{
                username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                password:[{required:true,message:'请输入密码',trigger:'blur'}]
            }
        })

        const loginFrom = ref(null)

        const store = useStore()
        const router = useRouter()

        const handleLogin = async ()=>{
            try {
                await loginFrom.value.validate()
                const loginRes =  await login(datas.form)
                console.log(loginRes)
                store.commit('setToken',loginRes.data)
                router.push({
                    path:'/index'
                })
            } catch (error) {
                 message.error(error.msg||'登录失败')
            }
        }
        return {loginFrom,...toRefs(datas),handleLogin}
    }
}
</script>

<style scoped>
.login-form{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>