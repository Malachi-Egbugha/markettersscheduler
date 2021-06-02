const axios = require("axios");
const { TRANSACTIONRECORD, SENDTRANSACTIONS } = require("./apiconfig");
//statistics
exports.stats = async () => {
  try {
    const config = {
      headers: {
        accesstoken: `${process.env.ACCESSTOKEN}`,
      },
    };
    const body = {};
    let fetchtransactionapi = await axios.post(
      `${TRANSACTIONRECORD}`,
      body,
      config
    );
    return fetchtransactionapi.data;
  } catch (err) {
    console.log(err);
  }
};
//send transaction to email telegram
exports.sendtransactions = async (body) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "access-token": `${process.env.ACCESSTOKEN}`,
      },
    };
    //console.log(SENDTRANSACTIONS);
    let sentransactions = await axios.post(`${SENDTRANSACTIONS}`, body, config);
    console.log(sentransactions);
    return sentransactions;
  } catch (err) {
    console.log(err);
  }
};
