const http = require('http');
require('dotenv').config();
const nanoid = require('nanoid').nanoid;

const DELAY = process.env.DELAY || 1000;
const LIMIT = process.env.LIMIT || 10;
const PORT = process.env.PORT || 3000;

const connections = {};
http.createServer((req, res) => {
  if (req.url === '/date') {
    res.setHeader('Content-type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    const id = nanoid();
    const user = {
      id,
      res,
      tick: 0,
      intervalTime: function () {
        const currentTime = logger(this.id, this.tick);
        this.tick++;
        if (this.tick > LIMIT) {
          delete connections[this.id];
          res.end(`${currentTime}`);
        }
      }
    };
    connections[id] = user;
  }
}).listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});

const logger = (id, tick) => {
  const date = new Date();
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const currentTime = date.toLocaleString('ru', options);
  console.log(`User: ${id}: ${currentTime}, tick: ${tick}`);
  return currentTime;
};

const run = () => {
  Object.values(connections).map((user) => {
    user.res.write(`Please wait you current tick: ${user.tick}\n`);
    user.intervalTime();
  });
};

setInterval(run, DELAY);
