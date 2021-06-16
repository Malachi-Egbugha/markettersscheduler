const cron = require("node-cron");
require("dotenv").config();
const { checktransactions } = require("./controllers/scheduler");

cron.schedule("0 8 * * *", checktransactions, {
  scheduled: true,
});
