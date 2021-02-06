const express = require("express");

// 当前http请求实例
const app = express();

app.use((req, res, next) => {
  console.log("请求开始", req.method, req.url);
  next();
});

app.use((req, res, next) => {
	console.log("cookie");
  // 假设处理cookie
   req.cookie = {
    userId: "121903i1",
  };
  next();
});
app.use((req, res, next) => {
  // 假设处理post data,因为是异步，所以setTimeout处理
	console.log('post data');
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200,
    };
    next();
  });
});
app.use("/api", (req, res, next) => {
  console.log("处理api: ");
  next();
});
app.get("/api", (req, res, next) => {
  console.log("get处理api: ");
  next();
});
app.post("/api", (req, res, next) => {
  console.log("post处理api: ");
  next();
});

app.get("/api/get-cookie", (req, res, next) => {
  console.log("get-cookie处理api: ");
  res.json({
    error: 0,
    data: req.cookie
  });
});

app.post("/api/post-data", (req, res, next) => {
  console.log("post-data处理api: ");
  res.json({
    error: 0,
    data: req.body,
  });
});

app.use((req, res, next) => {
  console.log("处理404");
  res.json({
    error: -1,
    message: "not found",
  });
});

app.listen(4000, () => {
  console.log("post 400");
});
