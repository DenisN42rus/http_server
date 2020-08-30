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

module.exports = logger;