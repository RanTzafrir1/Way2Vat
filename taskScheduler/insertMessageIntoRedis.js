const redis = require('redis');

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});
// Create Redis Client

client.on('connect', () => {
  console.log('Connected to Redis...');
});

module.exports = (messageToSend, timeToSchedule) => {
  let time = timeToSchedule.split('/');
  time = new Date(time[1] + '/' + time[0] + '/' + time[2]); // Javascript works with date format MM/DD/YYYY, can be altered using moment and area tz
  console.log(
    `Inserting the message: ${messageToSend} with the score: ${time} into Redis`
  );
  client.zadd('tasklist', time.getTime(), messageToSend);
};
