const {
  getList,
  getDetails,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("login fail"));
    // return new Promise((resolve, reject) => {
    //   new SuccessModel({
    //     session: req.session,
    //   });
    // });
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const result = getList(author, keyword);
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }
  if (method === "GET" && req.path === "/api/blog/detail") {
    const result = getDetails(id);
    return result.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }
  if (method === "POST" && req.path === "/api/blog/new") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck;
    }
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck;
    }
    const result = updateBlog(id, req.body);
    return result.then((val) => {
      if (!val) {
        return new ErrorModel("updateBlog fail");
      }
      return new SuccessModel();
    });
  }
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheck;
    }
    const author = req.session.username;
    const result = deleteBlog(id, author);

    return result.then((val) => {
      if (!val) {
        return new ErrorModel("deleteBlog fail");
      }
      return new SuccessModel();
    });
  }
};

module.exports = handleBlogRouter;
