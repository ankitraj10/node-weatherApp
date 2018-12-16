var request = require("request");

var geoWeather = address => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDb1zbvBi7vYy277ZQFys6QCcpjJYBH2J0`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect to servers.");
        } else if (body.status === "ZERO_RESULTS") {
          reject("Unabble to find given address");
        } else if (body.status === "OK") {
          resolve({
            Address: body.results[0].formatted_address,
            Lattitude: body.results[0].geometry.location.lat,
            Longitude: body.results[0].geometry.location.lng
          });
        }
      }
    );
  });
};

geoWeather("841301").then(
  location => {
    console.log(JSON.stringify(location, undefined, 2));
  },
  errorMassage => {
    console.log("Unable to print location");
  }
);
