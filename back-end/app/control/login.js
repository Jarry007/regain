const token = require('../token/token')
const {UserModel} = require('../model/index')
const md5 = require('../../utils/md-5')

const index = async (ctx)=>{
    ctx.body = '首页'
}

const login = async (ctx)=>{
    const {username,password} = ctx.request.body
    try {
        const md5pass = md5(password)
        const loginInfo = await UserModel.findOne({
            where:{
                username:username,
                password:md5pass
            }
        })
        if(loginInfo){
            const _loginInfo = {uuid:loginInfo.dataValues.uuid,username:loginInfo.dataValues.username}

            console.log('logininfo', _loginInfo)
            const _token = token.setToken(_loginInfo)
            ctx.body = {
                code:200,
                msg:'登录成功',
                data:_token
            }
        }else{
            throw new Error('尚未注册')
        }
    } catch (error) {
        ctx.body={
            code:500,
            msg:error.message||'登录失败'
        }
    }

}

const register = async (ctx)=>{
    const {username,password} = ctx.request.body
    try {
        const user = await UserModel.findOne({
            where:{
                username:username,
                password:password
            }
        })

        if(user) throw new Error('该用户已被注册')

        await UserModel.create({
            username:username,
            password:password
        })

        ctx.body = {
            code: 200,
            msg: '注册成功'
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            msg: error.message || '注册失败'
        }
    }
}

module.exports = {
    login,register
}