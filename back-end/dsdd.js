const data = 'E:\\node-project\\koa-code\\upload\\upload_ebee0efd0c248a62493a81c99fccff7b.jpg'
console.log(data.lastIndexOf('\\'))
const path = data.substr(data.lastIndexOf('\\')+1)
console.log(path)