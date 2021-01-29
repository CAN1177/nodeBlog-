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

  if (req.method == "POST") {
    console.log("content-typw", req.headers["content-type"]);
    //接收数据
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      console.log("postData", postData); 
      res.end("hello world");  //异步这里 
    });
  }
});

server.listen(8090);
