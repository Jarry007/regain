const jwt = require('jsonwebtoken')
const secretKey = require('../../config/token-secret')
const {UserModel} = require('../model/index')

const setToken = user =>{
    return jwt.sign({
        user
    },secretKey,{
        expiresIn:'24h'
    })
}

const checkToken = async (ctx,next)=>{
    const author = ctx.get('Authorization')

    if(!author){
        ctx.body = {
            code:401,
            msg:'未登录'
        }
        return false
    }
    try{
        const verify_ = await jwt.verify(author,secretKey)
        const findUser = await UserModel.findOne({
            where:{uuid:verify_.user.uuid},
            attributes:['uuid','username']
        })
        // console.log('finduser', findUser)
        ctx.userInfo = findUser
        await next()
    }catch(err){
        ctx.body = {
            code:500,
            msg:err.message || '检验失败'
        }
        return false
    }
}

module.exports = {
    setToken,checkToken
}