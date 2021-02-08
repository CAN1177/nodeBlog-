// escape 就是去特殊化，不让一些标识特殊化
const { exec, escape } = require("../db/mysql");
const { genPassword } = require("../utils/cryp.js")

const login = async (username, password) => {

  // escape去特殊化
  username =escape(username)
  // 密码加密
  password= genPassword(password)
  password = escape(password)
  // username password 去掉单引号是因为escape函数
  const sql = `select username,realname from users where username=${username} and password=${password}`

  const rows = await exec(sql)
  return rows[0] || {};
  // return exec(sql).then((rows) => {
  //   console.log("rows: ", rows);
  //   return rows[0] || {};
  // });
};
module.exports = login;
