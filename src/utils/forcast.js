const request = require("postman-request");

const forcast = function (longitude, latitude, callback) {
  const forcastUrl = `http://api.weatherstack.com/current?access_key=aa5546799c3b19c2720c10f4babec7d8&query=${longitude},${latitude}`;
  request(
    {
      url: forcastUrl,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to access weather services", undefined);
      } else if (body.error) {
        callback(body.error.info, undefined);
      } else {
        callback(undefined, {
          weather_description: body.current.weather_descriptions[0],
          temperature: body.current.temperature,
          feelslike: body.current.feelslike,
        });
      }
    }
  );
};

module.exports = forcast;
