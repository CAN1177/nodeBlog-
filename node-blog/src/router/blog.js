const handleBlogRouter = (req, res) => {
  const method = req.method;

  if (method === "GET" && req.path === "/api/blog/list") {
    return {
      message: "列表",
    };
  }
  if (method === "GET" && req.path === "/api/blog/detail") {
    return {
      message: "详情",
    };
  }
  if (method === "POST" && req.path === "/api/blog/new") {
    return {
      message: "新建",
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
