const redis = require('redis');

// 创建redis客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error',(err)=>{
	console.error(err);
})

// 测试redis
redisClient.set('name', 'yican', redis.print);
redisClient.get('name',(err,val)=>{
	if (err) {
		console.error(err);
	}
	console.log(val);
	// 推出redis
	redisClient.quit();
})