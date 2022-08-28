const request = require("request");

const forecast = (data, callback) => {
  url =
    "http://api.weatherstack.com/current?access_key=e5c2ad378b7054b8255151e81e71ae58&query=" +
    data.latitude +
    "," +
    data.longtitude +
    "";

  request.get({ url: url }, (error, response) => {
    if (error) {
      callback("Unable to connect the weather stack api..", undefined);
    }
    if (JSON.parse(response.body).error) {
      callback("Unable to connect the weather stack api..", undefined);
    } else {
      const data = JSON.parse(response.body);
      // data.current.feelslike

      callback(undefined, { temperature: data.current.temperature });
    }
  });
};

module.exports = forecast;
