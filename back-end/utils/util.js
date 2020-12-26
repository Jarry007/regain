const path = require('path')
const fs = require('fs')

const creatDir = (name)=>{
    if(!fs.existsSync(name)){
        fs.mkdirSync(name)
    }
}

module.exports = {
    creatDir:creatDir
}