require("dotenv").config();
const axios = require("axios");
const url = require("../../data/publicURL");

function getWeatherFromLocation(latitude, longitude, address) {
  const api_key = process.env.VISUAL_CROSSING_API_KEY;
  const apiURL = `${url.visualCrossingURL}${latitude}%2C%20${longitude}?unitGroup=metric&key=${api_key}&contentType=json`;

  return axios
    .get(apiURL)
    .then((response) => {
      const date = response.data.days[0].datetime;
      const temp = response.data.days[0].temp;
      const feelslike = response.data.days[0].feelslike;
      const precipprob = `${response.data.days[0].precipprob}%`; // 降雨機率
      const tempmax = response.data.days[0].tempmax;
      const tempmin = response.data.days[0].tempmin;
      const humidity = `${response.data.days[0].humidity}%`; // 濕度
      const sunrise = response.data.days[0].sunrise;
      const sunset = response.data.days[0].sunset;

      const result = `以下是[${address}]在${date}的天氣狀況：\n\n現在溫度: ${temp}℃\n體感溫度: ${feelslike}℃\n降雨機率: ${precipprob}\n最高溫: ${tempmax}\n最低溫: ${tempmin}\n濕度: ${humidity}\n日出時間: ${sunrise}\n日落時間: ${sunset}`;
      return result;
    })
    .catch((error) => {
      throw new Error("Error fetching visual crossing data", error.message);
    });
}

module.exports = getWeatherFromLocation;
