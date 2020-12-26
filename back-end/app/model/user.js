const sequelize = require('./db')
const {Model,Sequelize } = require('sequelize')
const md5 = require('../../utils/md-5')

class User extends Model{}
console.log('user')

User.init({
    uuid:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING(64),
        unique:true
    },
    password:{
        type:Sequelize.STRING(32),
        allowNull:false,
        set(val){
            this.setDataValue('password',md5(val))
        }
    }
},{
    sequelize,
    modelName:"user",
    tableName:"user"
})
console.log('daoch')
module.exports = User