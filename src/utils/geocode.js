const request = require("request");

const geocode = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(location) +
    ".json?access_token=pk.eyJ1IjoibWVlemFubWFsbGljayIsImEiOiJjbDcxZGRnbmowazY3M3NwNjJyaWc0cDJuIn0.6rgWYPDdswnWK981yaNMsg&limit=1";

  request.get({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect the Geolocation api..", undefined);
    } else {
      const responseData = response.body;
      if (responseData.features.length === 0) {
        callback("Invalid location cant find coordinates..", undefined);
      } else {
        callback(undefined, {
          longtitude: responseData.features[0].center[0],
          latitude: responseData.features[0].center[1],
          place_name: responseData.features[0].place_name,
        });
      }
    }
  });
};

module.exports = geocode;
