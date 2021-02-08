const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const fs = require('fs');
const morgan = require('koa-morgan')
const path = require('path')

const user = require('./routes/user')
const blog = require('./routes/blog')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(morgan('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const { REDIS_CONF }= require('./config/db')

// session配置
app.keys= ['miMa1213']
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 12*60*60*1000
  },
  // 配置redis
  store: redisStore({
    // all: "127.0.0.1:6379"
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
 
}))

// routes   这里的allowedMethods就是一个method方法集
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
