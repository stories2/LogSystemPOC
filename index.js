const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const winston = require("winston");
const { v4: uuidv4 } = require("uuid");
const os = require("os");
const hostname = os.hostname();

const apiVer = "v1";

const app = express();
const port = 3000;

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "api-service", hostname },
  transports: [new winston.transports.Console()],
});

/**
 * @param {*} req
 * @param {*} next
 * @param {string} featureId Unique feature id based on route path
 */
function setFeatureIdToHeaderMiddleware(req, next, featureId) {
  req.headers["X-Feature-ID"] = featureId;
  logger.info({
    traceId: req.headers["X-Request-ID"],
    featureId,
  });
  next();
}

/**
 * @summary Set trace id to tracking log messages.
 * @param {req}
 * @param {res}
 * @param {next}
 * It will set trace id to req.headers.X-Request-ID if it is not exist. Normally it sets by nginx.
 * And also it will write end of response.
 * https://www.nginx.com/blog/application-tracing-nginx-plus/
 */
app.use((req, res, next) => {
  if (!req.header("X-Request-ID")) req.headers["X-Request-ID"] = uuidv4();
  res.on("finish", () =>
    logger.info({
      featureId: req.headers["X-Feature-ID"],
      traceId: req.headers["X-Request-ID"],
    })
  );
  res.on("error", (err) =>
    logger.error({
      featureId: req.headers["X-Feature-ID"],
      traceId: req.headers["X-Request-ID"],
      err: err.message,
    })
  );
  next();
});

app.use(express.static("dist"));

app.get(
  `/oauth2/${apiVer}/authorize/callback`,
  (req, res, next) => setFeatureIdToHeaderMiddleware(req, next, "API001"),
  (req, res) => {
    res.send("ok");
  }
);

app.post(
  `/oauth2/${apiVer}/authorize/callback`,
  (req, res, next) => setFeatureIdToHeaderMiddleware(req, next, "API002"),
  (req, res) => {
    res.send("ok");
  }
);

app.get(
  `/oauth2/${apiVer}/myinfo`,
  (req, res, next) => setFeatureIdToHeaderMiddleware(req, next, "API003"),
  (req, res) => {
    res.send("ok");
  }
);

app.listen(port, () => {
  logger.info({
    runningPort: port,
  });
});
