const { ListModel, UserModel } = require('../model/index')

const addList = async (ctx) => {
    const { uuid } = ctx.userInfo
    const datas = ctx.request.body

    try {
        const data_ = datas
        data_.userId = uuid
        const list = await ListModel.create(data_)
        ctx.body = {
            code: 200,
            msg: '成功'
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            msg: error.message || '错误'
        }
    }
}

const getList = async (ctx) => {
    let { page = 1, pageSize = 10 } = ctx.request.query
    page = ~~page
    pageSize = ~~pageSize

    try {
        const list = await ListModel.findAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
            attributes: ['code_url', 'create_time', 'id', 'name', 'page_url', 'remark', 'uuid'],
            include: {
                model: UserModel,
                attributes: ['uuid', 'username']
            }
        })

        const result = list.length ? list : []

        ctx.body = {
            code: 200,
            msg: '成功',
            data: result
        }
    } catch (error) {
        ctx.response.body = {
            code: 500,
            msg: error.message || '错误'
        }
    }
}

const uploadFile = async (ctx) => {
    // console.log('ctx', ctx)
    // const { uuid } = ctx.userInfo
    const file = ctx.request.files
    let path = file.file.path

    const file_name = path.substr(path.lastIndexOf('\\') + 1)
    console.log(file_name)
    ctx.body = {
        code: 200,
        msg: '成功',
        data: file_name
    }
}

const deleList = async (ctx) => {
    console.log('get-body',ctx.request.body)
    const { uuid } = ctx.request.body //数据的UUID
    
    try {
        await ListModel.destroy({
            where: {
                uuid: uuid
            }
        })
        ctx.body = {
            code: 200,
            msg: '成功'
        }

    } catch (error) {
        ctx.body = {
            code: 500,
            msg: error.message || '错误'
        }
    }



}

module.exports = {
    addList, getList, uploadFile,deleList
}