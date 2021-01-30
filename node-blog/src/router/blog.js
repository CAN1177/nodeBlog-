const { getList, getDetails, newBlog, updateBlog, deleteBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }
  if (method === "GET" && req.path === "/api/blog/detail") {
    const listData = getDetails(id);
    return new SuccessModel(listData);
  }

  if (method === "POST" && req.path === "/api/blog/new") {
    const blogData = req.body;
    const data = newBlog(blogData)
    return new SuccessModel(data);
  }
  if (method === "POST" && req.path === "/api/blog/update") {
    const updateData = updateBlog(id,req.body)
    if (!updateData) {
      return new ErrorModel('updateBlog fail');
    }
    return new SuccessModel(updateData);
  }
  if (method === "POST" && req.path === "/api/blog/del") {
    const deleteData = deleteBlog(id)
    if (!deleteData) {
      return new ErrorModel('deleteData fail');
    }
    return new SuccessModel(deleteData);
  }
};

module.exports = handleBlogRouter;
