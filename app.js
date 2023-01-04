const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const blogs = require('./routes/blogs')
const info = require('./routes/info')
const koajwt = require('koa-jwt')
const { ErrorModel } = require('./Model/resModel')
// error handler
onerror(app)

//cors
app.use(cors({
  origin: function (ctx) {
    return '*' // 允许来自所有域名请求
    // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



//jwt
app.use(koajwt({
  secret:"Gopal_token"
}).unless({
  path:[/\/api\/users\/login/,/\/api\/users\/register/,/\/api\/blogs/]
}))

app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = new ErrorModel()
    } else {
      throw err;
    }
  })
})


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(blogs.routes(),blogs.allowedMethods())
app.use(info.routes(),info.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
