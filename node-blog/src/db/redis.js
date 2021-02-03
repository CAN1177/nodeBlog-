const redis = require("redis");

const { REDIS_CONF } = require("../config/db");

const redisClient = redis.createClient(REDIS_CONF.post, REDIS_CONF.host);
redisClient.on("error", (err) => console.error(err));

function set(key, value) {
  if (typeof value === Object) {
    value = JSON.stringify(value);
  }
  redisClient.set(key, value, redis.print);
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
      }
      // resolve(val);

      if (val === null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }

      // // 推出redis 单例模式不需要推出
      // redisClient.quit();
    });
  });
}

module.exports = {
  set,
  get,
};
