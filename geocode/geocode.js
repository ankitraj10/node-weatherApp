const request = require("request");
geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDb1zbvBi7vYy277ZQFys6QCcpjJYBH2J0`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to servers.");
      } else if (body.status === "ZERO_RESULTS") {
        callback("Unabble to find given address");
      } else if (body.status === "OK") {
        callback(undefined, {
          Address: body.results[0].formatted_address,
          Lattitude: body.results[0].geometry.location.lat,
          Longitude: body.results[0].geometry.location.lng
        });
      }
    }
  );
};

module.exports.geocodeAddress = geocodeAddress;
