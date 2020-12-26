const sequelize = require('./db')
const {Model,Sequelize } = require('sequelize')


class List extends Model{}

List.init(
    {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    uuid:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4
    },
    name:{
        type:Sequelize.STRING(20)
    },
    code_url:{
        type:Sequelize.STRING(120)
    },
    page_url:{
        type:Sequelize.STRING(120)
    },
    remark:{
        type:Sequelize.STRING(120)
    }

},{
    sequelize,
    modelName:'list',
    tableName:'list'
})

module.exports = List