const UserModel = require('./user')
const ListModel = require('./list')

ListModel.belongsTo(UserModel,{foreignKey:'userId'})

module.exports = {
    UserModel,ListModel
}

