const cron = require("node-cron");
require("dotenv").config();
const { checktransactions } = require("./controllers/scheduler");

//cron.schedule("59 * * * *", checktransactions, {
//scheduled: true,
//});
checktransactions();
