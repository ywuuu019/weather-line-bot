const express = require("express");
const line = require("@line/bot-sdk");
const { config } = require("./config");
const handleEvent = require("./src/handler/handler");
require("dotenv").config();

const app = express();

// register a webhook handler with middleware
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

if (process.env.NODE_ENV == "dev") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
  });
} else {
  // for gcp cloud function
  exports.app = app;
}
