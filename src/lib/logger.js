const EventEmiter = require("events");

class Logger extends EventEmiter {
  log = (msg) => {
    console.log(msg);

    this.emit("great", { id: 1 });
  };
}

module.exports = Logger;
