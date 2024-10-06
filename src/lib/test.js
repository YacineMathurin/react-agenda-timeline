const Logger = require("./logger");
const logger = new Logger();

logger.on("great", (arg) => {
  console.log("Received event", arg);
});

logger.log("Salaam");
