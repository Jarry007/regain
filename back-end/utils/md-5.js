const crypto = require('crypto')

const secert = require('../config/token-secret')

const md5 = text=>{
    return crypto.createHash('md5').update(secert).update(text).digest('hex')
}


module.exports = md5