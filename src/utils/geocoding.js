const request = require("postman-request");

const geocode = function (location, callback) {
  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoiZGl2eWFtYmh1dGFuaSIsImEiOiJja3FtNmw4cDUwZmZyMm9xd29oZzFvNGZ2In0.CW8m585lauzY1Jp6VXJ0LQ&limit=1`;

  request(
    {
      url: geocodingUrl,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to location services", undefined);
      } else if (body.features.length === 0) {
        callback(body.error.type, undefined);
      } else {
        callback(undefined, {
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1],
          place_name: body.features[0].place_name,
        });
      }
    }
  );
};

module.exports = geocode;
