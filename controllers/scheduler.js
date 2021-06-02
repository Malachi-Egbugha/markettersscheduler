const { stats, sendtransactions } = require("./../apicalls/callapi");
var dateFormat = require("dateformat");
exports.checktransactions = async () => {
  try {
    let staffid = "01020";
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
        message = `${i} Name: ${u.MARKETER_NAME}  Billed PoP : ${
          u.billed_pop
        } Paid Pop: ${u.paid_pop} CC: ${Math.ceil(
          (u.paid_pop / u.billed_pop) * 100
        )}%  Billed Amount: ${u.billed_amt
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")} Paid Amount: ${u.paid_amt
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")} CE:${Math.ceil(
          (u.paid_amt / u.billed_amt) * 100
        )}%   Date:${dateFormat(u.createdAt, " mmmm, yyyy")} `;
        //adding zeros to make id 5 digit
        //let staffid = pad(u.STAFF_ID, 5);

        console.log(staffid, message);
        /*
        //send transaction to telegram bolt

        let sentransaction = await sendtransactions({
          staffid,
          message,
        });
        */
      }, i * 1000);
    });
  } catch (err) {
    console.log(err);
  }
};
