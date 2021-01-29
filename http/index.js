const http = require("http");

const queryString = require("querystring");

const server = http.createServer((req, res) => {
  /* GET请求 */
  // const method = req.method;
  // console.log("method: ", method);
  // const url = req.url;
  // console.log("url: ", url);
  // req.query = queryString.parse(url.split("?")[1]);
  // console.log("req.query: ", req.query);
  // res.end(JSON.stringify(req.query));

  /* POST请求 */
  // if (req.method == "POST") {
  //   // 请求头格式
  //   console.log("content-typw", req.headers["content-type"]);
  //   //接收数据
  //   let postData = "";
  //    //req.on 信息流可以被监听，用data和end表示
  //   req.on("data", chunk => {
  //     postData += chunk.toString();
  //   });
  //   req.on("end", () => {
  //     console.log("postData", postData); 
  //     res.end("hello world");  //异步这里 
  //   });
  // }

  /* 综合示例 */

  const method = req.method
  const url = req.url
  const path = url.split("?")[0];
  const query = queryString.parse(url.split("?")[1]) 
  // 设置响应数据格式
  res.setHeader("Content-Type", "application/json");

  //返回的数据

  const resData = {
    method,
    path,
    query
  }

  if (method==="GET") {
    res.end(JSON.stringify(resData))
  }
  if (method==='POST') {
    let postData = ''
    res.on('data', chunk=>{
      postData+=chunk.toString()
    })

    res.on('end',()=>{
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }

});

server.listen(8090);
