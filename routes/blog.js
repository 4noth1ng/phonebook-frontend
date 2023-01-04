const router = require('koa-router')()
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const {
    getBlogs,
    getBlogDetail,
    getBlogsByTitle,
    publishBlogs,
    deleteBlogs,
    blogsLength,
    getBlogByType,
    updateBlog
} = require('../controller/blog')
router.prefix('/api/blog')

//查看所有文章
// /getBlogs
//GET  query=page&limit 
router.get('/getBlogs', async function (ctx, next) {
    const { page, limit,blogType } = ctx.query
    const data = await getBlogs(page,limit,blogType)
    ctx.body = new SuccessModel(data)
})

//查看对应文章
// /getBlogDetail
//GET query=blogId
router.get('/getBlogDetail/:blogId', async function (ctx, next) {
    const { blogId } = ctx.params
    const data = await getBlogDetail(blogId)
    ctx.body = new SuccessModel(data)
})


//通过标题搜索文章
// /searchBlogsByTitle
// POST
router.post('/getBlogsByTitle', async function (ctx, next) {
    const { keyword } = ctx.request.body
    const data = await getBlogsByTitle(keyword)
    ctx.body = new SuccessModel(data)
})

/*
  发布文章  POST
*/
router.post('/publishBlogs', async function (ctx, next) {
    const data = await publishBlogs(ctx.request.body)
    if (data) ctx.body = new SuccessModel('发布成功')
    else ctx.body = new ErrorModel('发布失败')
})
/*
  删除文章 POST
*/

router.post('/deleteBlogs/:blogId', async function (ctx, next) {
    const result = await deleteBlogs(ctx.params.blogId)
    if (result) ctx.body= new SuccessModel('删除成功')
    else ctx.body =  new ErrorModel('删除失败')
    
})

/*
* 返回博客总数
*  GET
*/
router.get('/getBlogsLength', async function (ctx, next) {
    const { blogType, keyword } = ctx.query
    const result = await blogsLength(blogType,keyword)
    if (result) ctx.body = new SuccessModel(result)
    else ctx.body = new ErrorModel('error')
})

/*
* 按照类别返回文章 GET
*/
router.get('/getBlogByType/:blogType', async function (ctx, next) {
    const result = await getBlogByType(ctx.params.blogType)
    if (result) ctx.body = new SuccessModel(result)
    else ctx.body = new ErrorModel('error')
})

/*
*通过id更新文章
*/
router.post('/updateBlog', async function (ctx, next) {
    let { title, content, createtime, blogType, blogText,id } = ctx.request.body
    createtime = Date.now()
    const result = await updateBlog(title, content, createtime, blogType, blogText,id)
    if (result) ctx.body = new SuccessModel("更新成功")
    else ctx.body = new ErrorModel("更新失败")
})

module.exports = router