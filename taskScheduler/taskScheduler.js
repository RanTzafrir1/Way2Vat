const express = require('express');
const redis = require('redis');
const insertMessageIntoRedis = require('./insertMessageIntoRedis');

const subscriber = redis.createClient({
  host: 'redis-server',
  port: 6379
});

const app = express();

subscriber.on('message', async (channel, message) => {
  this.message = JSON.parse(message);
  let messageToSend = this.message.message;
  let jsDayTime = this.message.jsDateTime;

  insertMessageIntoRedis(messageToSend, jsDayTime);
});

subscriber.subscribe('waiting-message');

app.listen(3006, () => {
  console.log('server is listening to port 3006');
});
