// crypto 模块提供了加密功能
const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'WJiol_8776#'

// md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex') // digest把输出变为16进制格式
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}


console.log('genPassword(123456): ', genPassword('123456'));
module.exports = {
    genPassword
}