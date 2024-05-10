const { client } = require("../../config");

function reply(replyToken, messages) {
  // 一個request最多只能回覆五個message object
  client
    .replyMessage({
      replyToken,
      messages,
    })
    .catch((error) => {
      console.log(error.message, error.body);
    });
}

module.exports = reply;
