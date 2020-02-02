const redis = require('redis');

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

(async () => {
  while (true) {
    await sleep(60000); // Set message check interval
    let currentTime = new Date().getTime();
    client.zrangebyscore('tasklist', 0, currentTime, function(err, result) {
      if (err) {
        throw err; // this would be wrapped in a try/catch with error log in production
      }
      if (!result) {
        console.log('No messages to print');
      }
      result && result.forEach(res => {
        console.log(res);
      });
      client.zremrangebyscore('tasklist',0, currentTime);
    });
  }
})();
