const request = require("request");

var getWeather = (lat, lang, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/c50a3e485e9bad8d56a33960b276d3fe/${lat},${lang}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("unable to connect ro servers");
      } else if (response.statusCode === 400) {
        callback("unabble to fetch weather");
      } else if (response.statusCode === 200) {
        callback(undefined, {
          Temprature: body.currently.temperature
        });
      }
    }
  );
};
module.exports.getWeather = getWeather;
