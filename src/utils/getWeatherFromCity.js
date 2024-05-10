require("dotenv").config();
const axios = require("axios");

function getWeatherFromCity(url, locationName) {
  return axios
    .get(url)
    .then((response) => {
      const date =
        response.data.records.location[0].weatherElement[0].time[0].startTime;
      const weather =
        response.data.records.location[0].weatherElement[0].time[0].parameter
          .parameterName;
      const precipProbability =
        response.data.records.location[0].weatherElement[1].time[0].parameter
          .parameterName;
      const lowTemperature =
        response.data.records.location[0].weatherElement[2].time[0].parameter
          .parameterName;
      const highTemperature =
        response.data.records.location[0].weatherElement[4].time[0].parameter
          .parameterName;

      const result = `以下是[${locationName}]在${date}的天氣狀況：\n\n天氣狀況: ${weather}\n降雨機率: ${precipProbability}%\n最高溫: ${highTemperature}℃\n最低溫: ${lowTemperature}℃\n\n* 資料來源為中央氣象署，每12小時更新一次`;
      return result;
    })
    .catch((error) => {
      throw new Error("Error fetching cwa data", error.message);
    });
}

module.exports = getWeatherFromCity;
