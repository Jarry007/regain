const Sequelize = require('sequelize')
const dbConfig = require('../../config/database')

const sequelize = new Sequelize(dbConfig.database,
    dbConfig.user, dbConfig.pwd, {
    dialect: 'mysql',
    host: dbConfig.url,
    port: dbConfig.port,
    timezone: '+08:00',
    logging: false,
    define: {
        createdAt: 'create_time',
        updatedAt: 'update_time',
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        }
    }

}
)

sequelize.sync({alter:true})

module.exports = sequelize