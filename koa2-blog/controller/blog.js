const { exec } = require("../db/mysql.js");
const xss = require("xss")

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author = '${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }

  sql += `order by createTime desc;`;

  return await exec(sql);

};

const getDetails = async (id) => {
  const sql = `select * from blogs where id = '${id}'`;

  const rows =await exec(sql)
  return rows[0]
  // return exec(sql).then((rows) => {
  //   return rows[0];
  // });
};

const newBlog = async (blogData = {}) => {
  const title =xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const createTime = Date.now();

  const sql = ` insert into blogs (title,content,createTime,author) values ('${title}','${content}', '${createTime}', '${author}')`;

  const insertData =  await exec(sql)
  return {
    id: insertData.id
  }
  // return exec(sql).then((insertData) => {
  //   console.log("insertData: ", insertData);
  // });
};

const updateBlog = async (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blogs set title='${title}', content='${content}' where id = ${id} `;

  const updateData= await exec(sql)
  if (updateData.affectedRows > 0) {
    return true;
  }
  return false;
  // return exec(sql).then((updateData) => {
  //   if (updateData.affectedRows > 0) {
  //     return true;
  //   }
  //   return false;
  // });
};

const deleteBlog = async (id, author) => {
  const sql = `delete from blogs where id =${id} and author = '${author}'`;
  const deleteData = await exec(sql)
  if (deleteData.affectedRows > 0) {
    return true;
  }
  return false;

  // return exec(sql).then((deleteData) => {
  //   if (deleteData.affectedRows > 0) {
  //     return true;
  //   }
  //   return false;
  // });

};

module.exports = {
  getList,
  getDetails,
  newBlog,
  updateBlog,
  deleteBlog,
};
