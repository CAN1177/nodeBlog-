const { exec } = require("../db/mysql.js");
const xss = require("xss")

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author = '${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }

  sql += `order by createTime desc;`;

  return exec(sql);
};

const getDetails = (id) => {
  const sql = `select * from blogs where id = '${id}'`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  const title =xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const createTime = Date.now();

  const sql = ` insert into blogs (title,content,createTime,author) values ('${title}','${content}', '${createTime}', '${author}')`;

  return exec(sql).then((insertData) => {
    console.log("insertData: ", insertData);
  });
};

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blogs set title='${title}', content='${content}' where id = ${id} `;
  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id =${id} and author = '${author}'`;
  return exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });

};
module.exports = {
  getList,
  getDetails,
  newBlog,
  updateBlog,
  deleteBlog,
};
