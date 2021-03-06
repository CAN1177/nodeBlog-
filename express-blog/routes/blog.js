var express = require("express");
var router = express.Router();
const {
  getList,
  getDetails,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

/* GET home page. */
router.get("/list", (req, res, next) => {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";

  if (req.query.isadmin) {
    // 管理员界面
    if (req.session.username == null) {
      res.json(new ErrorModel("小爷，您还未登录！"));
      return;
    }
    // 强制查询自己的blog
    author = req.session.username;
  }

  const result = getList(author, keyword);
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

router.get("/detail", (req, res, next) => {
  const result = getDetails(req.query.id);
  return result.then((detailData) => {
    res.json(new SuccessModel(detailData));
  });
});

router.post("/new", loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const result = newBlog(req.body);
  return result.then((data) => {
    res.json(new SuccessModel(data));
  });
});

router.post("/update", loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id,req.body);
  return result.then((val) => {
    if (!val) {
      res.json(new ErrorModel("updateBlog fail"));
    }
    res.json(new SuccessModel());
  });
});

router.post("/del", loginCheck, (req, res, next) => {
  const author = req.session.username;
  const result = deleteBlog(req.query.id, author);
  return result.then((val) => {
    if (!val) {
      res.json(new ErrorModel("deleteBlog fail"));
    }
    res.json(new SuccessModel());
  });
});

module.exports = router;
