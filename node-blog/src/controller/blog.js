const getList = (author, keywords) => {
  return [
    {
      id: 1,
      title: ";黄河",
      content: "洮河与黄河的关系",
      createTime: new Date(),
    },
    {
      id: 2,
      title: ";黄河2",
      content: "洮河与黄河的关系2",
      createTime: new Date(),
    },
  ];
};

const getDetails = (id) => {
  return [
    {
      id: 1,
      title: ";黄河",
      content: "洮河与黄河的关系",
      create: new Date(),
    },
  ];
};

const newBlog = (blogData = {}) => {
  return {
    id: 23,
  };
};

const updateBlog = (id, blogData = {}) => {
  return false;
};

const deleteBlog = (id) => {
  return true;
};
module.exports = {
  getList,
  getDetails,
  newBlog,
  updateBlog,
  deleteBlog,
};
