const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const winston = require("winston");
const { v4: uuidv4 } = require("uuid");
const os = require("os");
const { StatusCodes } = require("http-status-codes");
const hostname = os.hostname();
require("dotenv").config();

const apiVer = "v1";

const app = express();
const port = 3000;

const failureRedirectUrl = "/#/login";
const successRedirectUrl = "/#/";

const E_NOT_AUTHORIZED = "e_not_authorized";

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
 * @param {*} req Should use this after log system's tracking feature already set
 * @returns {object}
 */
function getReqContext(req) {
  return {
    featureId: req.headers["X-Feature-ID"],
    traceId: req.headers["X-Request-ID"],
  };
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
      ...getReqContext(req),
    })
  );
  res.on("error", (err) =>
    logger.error({
      ...getReqContext(req),
      err: err.message,
    })
  );
  next();
});

/**
 * Load front-end page
 */
app.use(express.static("dist"));

/**
 * Setup session middleware
 */
app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
    }
  )
);

app.get(
  `/oauth2/${apiVer}/authorize/callback`,
  (req, res, next) => setFeatureIdToHeaderMiddleware(req, next, "API001"),
  passport.authenticate(["google"], {
    failureRedirect: failureRedirectUrl,
    successRedirect: successRedirectUrl,
  }),
  (req, res) => {
    res.send("ok");
  }
);

app.post(
  `/oauth2/${apiVer}/authorize/callback`,
  (req, res, next) => setFeatureIdToHeaderMiddleware(req, next, "API002"),
  passport.authenticate(["google"], {
    failureRedirect: failureRedirectUrl,
    successRedirect: successRedirectUrl,
  }),
  (req, res) => {
    res.send("ok");
  }
);

/**
 *
 * @param {*} req check req.user exist or redirect to login page
 * @param {*} res
 * @param {*} next
 * @returns
 */
function ensureLoggedIn(req, res, next) {
  if (req.user) {
    return next();
  }
  logger.warn({
    ...getReqContext(req),
    error: E_NOT_AUTHORIZED,
  });
  return res.redirect(failureRedirectUrl);
}

app.get(
  `/oauth2/${apiVer}/myinfo`,
  (req, res, next) => setFeatureIdToHeaderMiddleware(req, next, "API003"),
  ensureLoggedIn,
  (req, res) => {
    res.send("ok");
  }
);

app.route(`/oauth2/${apiVer}/logout`).all(
  (req, res, next) => setFeatureIdToHeaderMiddleware(req, next, "API004"),
  ensureLoggedIn,
  (req, res) => {
    res.send("ok");
  }
);

app.use(
  (req, res, next) => setFeatureIdToHeaderMiddleware(req, next, "API999"),
  (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND);
    res.send();
  }
);

app.listen(port, () => {
  logger.info({
    runningPort: port,
  });
});
