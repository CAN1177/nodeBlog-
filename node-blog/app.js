const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const queryString = require("querystring");

//异步处理post data
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method != "POST") {
      resolve({});
      return;
    }
    if (req.headers["Content-Type"] != "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    res.on("data", (chunk) => {
      postData += chunk.toString();
    });

    res.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
	});
	
};

const serverHeader = (req, res) => {
  // 返回格式
  res.setHeader("Content-Type", "application/json");

  // 处理路径path 
  const url = req.url;
  req.path = url.split("?")[0];

  //处理post data

  getPostData(req).then((postData) => {
    req.body = postData;
    //处理blog路由
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }

    // 处理user路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }

    // 未命中路由
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 not found");
    res.end();
  });

  // 解析query
  req.query = queryString.parse(url.split("?")[1]);
};

module.exports = serverHeader;
