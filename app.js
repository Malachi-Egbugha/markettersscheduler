const cron = require("node-cron");
require("dotenv").config();
const { checktransactions } = require("./controllers/scheduler");

cron.schedule("3 10 * * *", checktransactions, {
  scheduled: true,
});
