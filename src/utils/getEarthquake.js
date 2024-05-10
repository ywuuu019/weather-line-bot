const axios = require("axios");

function getEarthquake(apiURL) {
  return axios
    .get(apiURL)
    .then((response) => {
      const earthquakeReport =
        response.data.records.Earthquake[0].ReportContent;
      const epicenter =
        response.data.records.Earthquake[0].EarthquakeInfo.Epicenter.Location;
      const reportRemark = response.data.records.Earthquake[0].ReportRemark;
      const imageURL = response.data.records.Earthquake[0].ReportImageURI;

      const result = {
        text: `${earthquakeReport}\n\n震央位於${epicenter}\n\n * ${reportRemark}`,
        imageURL,
      };

      return result;
    })
    .catch((error) => {
      throw new Error("Failed to get earthquake data:", error.message);
    });
}

module.exports = getEarthquake;
