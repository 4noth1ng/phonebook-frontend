const router = require('koa-router')()
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const {
    insertInfo, deleteInfo, updateInfo, getInfo
} = require('../controller/info')
router.prefix('/api/info')

/**
 * 添加信息
 * param
 * return {promise}
*/
router.post('/insertInfo', async function(ctx, next) {
    const data = await insertInfo(ctx.request.body)
    if (data) ctx.body = new SuccessModel('添加成功')
    else ctx.body = new ErrorModel('添加失败')
})
router.post('/deleteInfo', async function(ctx, next) {
    const data = await deleteInfo(ctx.request.body.id)
    if (data) ctx.body = new SuccessModel('删除成功')
    else ctx.body = new ErrorModel('删除失败')
})
router.post('/updateInfo', async function (ctx, next) {
    let { id,name, phone, address, email, remark, userid } = ctx.request.body
    const result = await updateInfo(id,name, phone, address, email, remark, userid)
    if (result) ctx.body = new SuccessModel("更新成功")
    else ctx.body = new ErrorModel("更新失败")
})
router.get('/getInfo', async function(ctx, next) {
    const {userid} = ctx.query
    const result = await getInfo(userid)
    if(result) ctx.body = new SuccessModel(result)
    else ctx.body = new ErrorModel()
})
module.exports = router;