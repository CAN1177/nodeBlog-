const {
  getList,
  getDetails,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

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
    })
  }
  if (method === "POST" && req.path === "/api/blog/new") {
    const result = newBlog(req.body);
    return result.then((data) => {
      return new SuccessModel(data);
    })
  }
  if (method === "POST" && req.path === "/api/blog/update") {
    const result = updateBlog(id, req.body);
    return result.then((val) => {
      if (!val) {
        return new ErrorModel("updateBlog fail");
      }
      return new SuccessModel();
    })
   
  }
  if (method === "POST" && req.path === "/api/blog/del") {

    const author = 'manji'
    const result = deleteBlog(id, author);

    return result.then((val) => {
      if (!val) {
        return new ErrorModel("deleteBlog fail");
      }
      return new SuccessModel();
    })
  }
};

module.exports = handleBlogRouter;
