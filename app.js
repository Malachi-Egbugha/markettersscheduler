const cron = require("node-cron");
require("dotenv").config();
const { checktransactions } = require("./controllers/scheduler");

cron.schedule("3 08 * * *", checktransactions, {
  scheduled: true,
});
