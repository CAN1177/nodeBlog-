const router = require("koa-router")();
const {
  getList,
  getDetails,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");
// prefix设置路由的前缀
router.prefix("/api/blog");

router.get("/list", async function (ctx, next) {
  // console.log('ctx: ', ctx);
  let author = ctx.query.author || "";
  const keyword = ctx.query.keyword || "";

  if (ctx.query.isadmin) {
    // 管理员界面
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel("小爷，您还未登录！");
      return;
    }
    // 强制查询自己的blog
    author = ctx.session.username;
  }

  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData);
  // const result = getList(author, keyword);
  // return result.then((listData) => {
  //   res.json(new SuccessModel(listData));
  // });
});
router.get("/detail", async function (ctx, next) {
  const detailData = await getDetails(ctx.query.id);
  ctx.body = new SuccessModel(detailData)
});

router.post("/new", loginCheck, async function (ctx, next) {
  ctx.request.body.author = ctx.session.username;
  const data = await newBlog(ctx.request.body);
  ctx.body = new SuccessModel(data);
});
router.post("/update", loginCheck, async function (ctx, next) {
  const val = await updateBlog(ctx.query.id,ctx.request.body);
  if (!val) {
    ctx.body = new ErrorModel("updateBlog fail");
  }
  ctx.body = new SuccessModel();
});
router.post("/del", loginCheck, async function (ctx, next) {
  const author = ctx.session.username;
  const val = await deleteBlog(ctx.query.id, author);
  if (!val) {
    ctx.body = new ErrorModel("deleteBlog fail");
  }
  ctx.body = new SuccessModel();
});

module.exports = router;
