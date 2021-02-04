const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, 'data.txt');

// // 读取文件内容
// fs.readFile(fileName,(err, data) => {
// 	if (err) {
// 		console.error(err);
// 		return
// 	}
// 	// data是二进制类型需要转化为字符串
// 	console.log(data.toString());
// })

// 写入文件内容
const content = '102-'
const options = {
	flag: 'a'   // a 表示追加append w表示覆盖/重写为write
}
fs.writeFile(fileName,content,options,err=>{
	if (err) {
		console.error(err);
		return
	}
})