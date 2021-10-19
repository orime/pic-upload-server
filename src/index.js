const Koa = require('koa')
const uploadRouter = require('./routers/koaUploader')
const staticResource = require('koa-static');
const cors = require('koa2-cors')
const schedule = require('./schedule')


const path = require('path')

const app = new Koa()

// * 接口测试
app.use(async (ctx, next) => {
  if(ctx.request.url === '/test') {
    ctx.body = '服务正常运行~'
  }
  await next()
})
// 解决跨域
app.use(cors())

//配置静态资源中间件
app.use(staticResource('../uploads'))

app.use(uploadRouter.routes(), uploadRouter.allowedMethods())

// 清除文件夹工作
schedule()

app.listen(3232, () => {
  console.log('pic server is running at http://orime.top:3232');
})