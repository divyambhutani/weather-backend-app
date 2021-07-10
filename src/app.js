const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocoding.js");
const forcast = require("./utils/forcast.js");

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Divi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Divi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Divi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "No location entered",
      info: "Please enter a location",
    });
  }

  geocode(
    req.query.location,
    (error, { longitude, latitude, place_name } = {}) => {
      if (error) {
        res.send(error);
      } else {
        forcast(
          latitude,
          longitude,
          (error, { weather_description, temperature, feelslike }) => {
            if (error) {
              res.send(error);
            } else {
              res.send({
                location: place_name,
                forcast: `${weather_description}. Temperature outside is ${temperature} and feels like ${feelslike}.`,
                // weather_description: weather_description,
                // temperature: temperature,
                // feelslike: feelslike,
              });
              //   console.log(place_name);
              //   console.log(weather_description, temperature, feelslike);
            }
          }
        );
      }
    }
  );

  // res.send({
  //   forecast: "It is snowing",
  //   location: "Philadelphia",
  // });
});

// app.get("/products", (req, res) => {
//   console.log(req.query);
//   if (!req.query.search) {
//     return res.send({
//       error: "No product item entered",
//     });
//   }
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Divi",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Divi",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server started :-");
});
