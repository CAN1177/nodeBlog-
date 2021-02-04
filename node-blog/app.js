const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const queryString = require("querystring");
const{ access } = require("./src/utils/log")

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
  return d.toGMTString();
};

const { get, set } = require("./src/db/redis");
// 全局session data
// const SESSION_DATA = {};

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

    // 记录 access log   ⚠️注意：  req.headers["user-agent"] 这个是为了识别那个浏览器
    access(
      `${req.method} -- ${req.url} -- ${
        req.headers["user-agent"]
      } -- ${Date.now()}`
    );

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

  // // 解析session
  // let needSession = false;
  // let userId = req.cookie.userid;
  // if (userId) {
  //   if (SESSION_DATA[userId]) {
  //     req.session = SESSION_DATA[userId];
  //   } else {
  //     SESSION_DATA[userId] = {};
  //     req.session = SESSION_DATA[userId];
  //   }
  // } else {
  //   needSession = true;
  //   userId = `${Date.now()}_${Math.random()}`;
  //   SESSION_DATA[userId] = {};
  //   req.session = SESSION_DATA[userId];
  // }

  // 解析session 使用 redis
  let needSession = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSession = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化session中的session值
    set(userId, {});
  }
  req.sessionId = userId;
  get(req.sessionId).then((sessionData) => {
    if (sessionData === null) {
      // 初始化session中的session值
      set(req.sessionId, {});
      // 设置session 为空
      req.session={}
    }else{
      // 给session 实际值
      req.session = sessionData
    }
    // console.log('req.session: ',  req.session);
    return  getPostData(req) // 处理post data
  }).then((postData) => {
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
        // console.log("userData: ", userData);
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
