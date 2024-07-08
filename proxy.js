const https = require("https");

module.exports = (req, res) => {
  const options = {
    hostname: "0tfuywkamf.execute-api.eu-west-1.amazonaws.com",
    path: "/default/SaveWorkoutData",
    method: req.method,
    headers: {
      ...req.headers,
      "Content-Type": "application/json",
    },
  };

  const proxy = https.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });
    response.on("end", () => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.status(response.statusCode).send(data);
    });
  });

  req.pipe(proxy);
};
