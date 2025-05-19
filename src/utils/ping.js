import ping from 'ping';

export const dontSleep = timeout => {
  const hosts = ['google.com', 'yahoo.com', 'bing.com'];

  setInterval(() => {
    hosts.forEach(host => {
      ping.sys.probe(
        host,
        res => console.log(`${host} says: [${res}] "Server, don't sleep!"`),
        { timeout },
      );
    });
  }, timeout);
};
