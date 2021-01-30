const { getList, getDetails } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }
  if (method === "GET" && req.path === "/api/blog/detail") {
    const id = req.query.id;
    const listData = getDetails(id);
    return new SuccessModel(listData);
  }

  if (method === "POST" && req.path === "/api/blog/new") {
    const blogData = req.body;

    return {
      id: 23,
    };
  }
  if (method === "POST" && req.path === "/api/blog/update") {
    return {
      message: "更新",
    };
  }
  if (method === "DElETE" && req.path === "/api/blog/del") {
    return {
      message: "删除",
    };
  }
};

module.exports = handleBlogRouter;
