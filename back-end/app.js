const koa = require('koa')
const app = new koa()
const cros = require('koa2-cors')
const bodyParse = require('koa-bodyparser')
const koaBody = require('koa-body')
const path = require('path')
const {creatDir} = require('./utils/util')

app.use(cros({
    origin: '*',
    maxAge:10,
    credentials:true,
    allowMethods:['GET','POST', 'DELETE', 'HEAD', 'OPTIONS'],
    allowHeaders:['Content-Type','Authorization','Accept','X-Requested-With']
}))

app.use(koaBody({
    multipart:true,
    formidable:{
        maxFileSize:10*1024*1024,
        uploadDir:path.resolve(__dirname,'upload'),
        keepExtensions:true,
        onFileBegin:(_,file)=>{
            const dir = path.join(__dirname,'upload')
            creatDir(dir)

            const ext = (file.name.substr(file.name.lastIndexOf('.')+1)).toLowerCase()
            const alloweExt = ['jpg','png','gif']
            if(alloweExt.indexOf(ext)<0) throw new Error('文件不合法')
        }
    }
}))


const _route = require('./app/router/router')

app.use(bodyParse())
app.use(_route.routes(),_route.allowedMethods())



app.listen(5000)
console.info('启动成功>>>>>>>')
console.log('http://localhost:5000')