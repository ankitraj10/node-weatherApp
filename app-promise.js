const yargs = require("yargs");
const axios = require("axios");
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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDb1zbvBi7vYy277ZQFys6QCcpjJYBH2J0`;
axios
  .get(geocodeUrl)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("unable to find Address");
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lang = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/c50a3e485e9bad8d56a33960b276d3fe/${lat},${lang}`;
    var Address = response.data.results[0].formatted_address;
    console.log("Address:", Address);

    return axios.get(weatherUrl);
  })
  .then(response => {
    var Tempreture = response.data.currently.temperature;
    console.log(`Cureent Temprature is:${Tempreture}`);
  })
  .catch(e => {
    if (e.code === "ENOTFOUND") {
      console.log("Unable to found API servers");
    } else {
      console.log(e.messege);
    }
  });
