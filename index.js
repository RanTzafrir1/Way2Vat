const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const validators = require('./util/validators');

const app = express();
app.use(bodyParser.json());

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

app.post('/echoAtTime', (req, res) => {
  let messageParams = {
    message: req.body.message,
    jsDateTime: req.body.time
  };
  //Validate request
  if(!messageParams.message || !messageParams.jsDateTime) {
    return res.json({
      message: 'Bad request',
      status: 200
    });
  } else if (!validators.validateDate) {
    return res.json({
      message: 'Bad request',
      status: 200
    });
  }

  client.publish('waiting-message', JSON.stringify(messageParams));

  return res.json({
    message: `Message: ${messageParams.message}, was logged into task scheduler to be notified at ${messageParams.jsDateTime}`,
    status: 200
  });
});

app.listen(8080, () => {
  console.log('server is listening to port 8080');
});
