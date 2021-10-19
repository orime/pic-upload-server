const multer = require('koa-multer')
const KoaRouter = require('koa-router')
const path = require('path')

const router = KoaRouter()

const storage = multer.diskStorage({
  // * 文件保存路径
  destination: function(req, file, cb) {
    cb(null, '../uploads/pictures/')
  },
  // * 修改文件名称
  filename: function(req, file, cb){
    const fileFormat = (file.originalname).split('.')
    console.log(fileFormat, 'fileFormat');
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

// * 加载配置
const upload = multer({storage})

// * 路由配置
router.post('/upload', upload.single('file'), async (ctx, next) => {
  console.log("ctx.req.file.filename:"+ctx.req.file.filename);
  // * 拼接路径
  const res = {
    url: `http://orime.top:3232/pictures/${ctx.req.file.filename}`,
    id: 111111111111111111
  }
  ctx.body = res
})

module.exports = router
