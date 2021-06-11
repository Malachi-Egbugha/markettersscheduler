const { stats, sendtransactions } = require("./../apicalls/callapi");
var dateFormat = require("dateformat");
exports.checktransactions = async () => {
  try {
    let staffid = "";
    let message = "";
    let transactioninfo = await stats();
    //store number of  transaction variable from transaction api

    const { Sendbotstats } = await transactioninfo;
    //function to add leaading zeros
    function pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }

    //loop through array asign a delay

    Sendbotstats.forEach(async (u, i) => {
      //construct message

      setTimeout(async () => {
        message = `Staff Name: ${u.MARKETER_NAME}\nDSS Name:${
          u.transformer
        }\nDSS ID:${u.transformer_code}\nBilled Population : ${
          u.billed_pop
        }\nPaid Population: ${u.paid_pop}\nCollection Coverage: ${Math.round(
          (u.paid_pop / u.billed_pop) * 100
        )}%\nBilled Amount: ${u.billed_amt
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}\nPaid Amount: ${u.paid_amt
          .toFixed(2)
          .replace(
            /\d(?=(\d{3})+\.)/g,
            "$&,"
          )}\nCollection Efficiency:${Math.round(
          (u.paid_amt / u.billed_amt) * 100
        )}% \nDate:${dateFormat(u.createdAt, " d,mmmm, yyyy")}  `;
        //adding zeros to make id 5 digit
        let staffid = pad(u.STAFF_ID, 5);
        //send transaction to telegram bolt

        let sentransaction = await sendtransactions({
          staffid,
          message,
        });
      }, i * 1000);
    });
  } catch (err) {
    console.log(err);
  }
};
