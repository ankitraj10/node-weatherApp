const yargs = require("yargs");
const request = require("request");

var geocode = require("./geocode/geocode");
var weather = require("./weather/weather");
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(result.Address);

    weather.getWeather(
      result.Lattitude,
      result.Longitude,
      (errorMessage, wewatherResult) => {
        if (errorMessage) {
          console.log("Unable to print information");
        } else {
          console.log(`Current tempreture is :${wewatherResult.Temprature}`);
        }
      }
    );
  }
});

//c50a3e485e9bad8d56a33960b276d3fe
