const router = require('koa-router')()
const jwt = require("jsonwebtoken");
const {
  SuccessModel,
  ErrorModel
} = require('../Model/resModel')

const {
  userLogin,
  userRegister
} = require("../controller/users")

router.prefix('/api/users')

router.post('/login', async function (ctx, next) {
  const data = ctx.request.body
  console.log(data);
  const result = await userLogin(data)
  if (result.username) {
    const token = jwt.sign(
      {
        name: result.username
      },
      "Gopal_token",
      { expiresIn: 60*60*24 }
    );
    return ctx.body = new SuccessModel(result,token)
  }
  else ctx.body = new ErrorModel()
})

router.post('/register', async function (ctx, next) {
  const data = ctx.request.body
  const result = await userRegister(data)
  if (result) ctx.body = new SuccessModel("注册成功！")
  else ctx.body = new ErrorModel()
})

module.exports = router
