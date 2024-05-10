const availableLocation = require("../../data/availableLocation");
const getWeatherFromLocation = require("../utils/getWeatherFromLocation");
const getWeatherFromCity = require("../utils/getWeatherFromCity");
const getEarthquake = require("../utils/getEarthquake");
const reply = require("../handler/reply");
const url = require("../../data/publicURL");
require("dotenv").config();

// event handler
function handleEvent(event) {
  // 傳送位置訊息 -> 利用visual crossing
  if (event.type == "message" && event.message.type == "location") {
    console.log(event.message.address);
    getWeatherFromLocation(
      event.message.latitude,
      event.message.longitude,
      event.message.address
    )
      .then((data) => {
        reply(event.replyToken, [{ type: "text", text: data }]);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (event.type === "message" || event.message.type === "text") {
    const inputText = event.message.text;
    console.log(inputText);
    if (inputText === "天氣狀況") {
      reply(event.replyToken, [
        {
          type: "text",
          text: "請選擇查詢方式:\n1. 傳送位置訊息\n2. 輸入縣市名稱,例如:[臺北市]",
        },
      ]);
    } else if (inputText === "全臺累積雨量") {
      reply(event.replyToken, [
        {
          type: "image",
          originalContentUrl: url.accumulatedPrepURL,
          previewImageUrl: url.accumulatedPrepURL,
          animated: false,
        },
      ]);
    } else if (inputText === "最近一次有感地震") {
      const apiURL = url.earthquakeURL + process.env.CWA_API_KEY;
      getEarthquake(apiURL)
        .then((data) => {
          reply(event.replyToken, [
            {
              type: "text",
              text: data.text,
            },
            {
              type: "image",
              originalContentUrl: data.imageURL,
              previewImageUrl: data.imageURL,
              animated: false,
            },
          ]);
        })
        .catch((error) => {
          return console.log(error);
        });
    }
    // 使用者手動輸入縣市名稱
    else if (availableLocation.includes(inputText)) {
      const locationName = inputText.toString().replace(/台/g, "臺");
      const weatherUrl =
        url.cwaURL + process.env.CWA_API_KEY + "&locationName=" + locationName;

      getWeatherFromCity(weatherUrl, locationName)
        .then((data) => {
          reply(event.replyToken, [{ type: "text", text: data }]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // create an echoing text message
      reply(event.replyToken, [{ type: "text", text: inputText }]);
    }
  } else {
    // ignore non-text-message event
    console.log(event);
    return Promise.resolve(null);
  }
}

module.exports = handleEvent;
