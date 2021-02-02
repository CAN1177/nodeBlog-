const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const queryString = require("querystring");

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
  return d.toGMTString();
};
// 全局session data
const SESSION_DATA = {};

//异步处理post data
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
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
  // 解析query
  req.query = queryString.parse(url.split("?")[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }
    let arr = item.split("=");
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });

  // 解析session
  let needSession = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (SESSION_DATA[userId]) {
      req.session = SESSION_DATA[userId];
    } else {
      SESSION_DATA[userId] = {};
      req.session = SESSION_DATA[userId];
    }
  } else {
    needSession = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
    req.session = SESSION_DATA[userId];
  }
  //处理post data
  getPostData(req).then((postData) => {
    req.body = postData;
    //处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        if (needSession) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 处理user路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        console.log("userData: ", userData);
        if (needSession) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(userData));
      });
      return;
    }

    // 未命中路由
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 not found");
    res.end();
  });
};

module.exports = serverHeader;
