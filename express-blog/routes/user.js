var express = require("express");
var router = express.Router();
const login = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

/* GET home page. */
router.post("/login", function (req, res, next) {
  // 这里直接能拿到数据是因为app.js中app.use(express.json())的处理
  const { username, password } = req.body;
  let result = login(username, password);
  return result.then((data) => {
    if (data.username) {
      //设置session
      req.session.username = data.username;
      req.session.realname = data.realname;

      res.json(new SuccessModel());
			return
    }
    res.json(new ErrorModel("login fail"));
  });
});
module.exports = router;
