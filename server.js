const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const app = express();
const OktaJwtVerifier = require("@okta/jwt-verifier");
var cors = require("cors");

const port = process.env.PORT || 3001;

const config = {
  resourceServer: {
    port: port,
    oidc: {
      issuer: "https://dev-657184.oktapreview.com/oauth2/default"
    },
    assertClaims: {
      aud: "api://default",
      cid: "0oafvmim6lHM5UqLH0h7"
    }
  }
};

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: config.resourceServer.oidc.issuer,
  assertClaims: config.resourceServer.assertClaims
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken)
    .then(jwt => {
      req.jwt = jwt;
      next();
    })
    .catch(err => {
      res.status(401).send(err.message);
    });
}

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello From Express" });
});

app.get("/", function(req, res) {
  res.send("Hello from React Server");
});

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get("/secure", authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get("/api/messages", authenticationRequired, (req, res) => {
  res.json([
    {
      message: "This message is from an authenticated API!"
    }
  ]);
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// app.listen(port, () => console.log(`Listening on port ${port}`));
app.listen(config.resourceServer.port, () => {
  console.log(`Resource Server Ready on port ${config.resourceServer.port}`);
});
module.exports = { app };
