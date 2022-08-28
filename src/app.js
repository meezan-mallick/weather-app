const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Meezan mallick",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Meezan mallick",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Meezan mallick",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  //check that the ?address query is not blank
  if (!address) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  //send address to get geo-coordinates
  geocode(address, (error, data = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    // If we get geo-coordinates then send it to forecast and get the weather details
    forecast(data, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      const temperature = forecastData.temperature;
      const location = data.place_name;
      res.send({
        forecast: temperature,
        location: location,
        address: address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", { title: "404", message: "Help article not found" });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "404 page not found",
    name: "meezan mallick",
  });
});

app.listen(3000, () => {
  console.log("server is up and running at 3000");
});
