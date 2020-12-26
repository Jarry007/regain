import Vuex from 'vuex'
import {setTokens } from '@/utils/util'

export default Vuex.createStore({
    state:{token:''},
    getters:{token:state=>state.token},
    mutations:{
        setToken(state, token){
            if(token){
                state.token = token
            }
            setTokens(token)
        }
    }
})