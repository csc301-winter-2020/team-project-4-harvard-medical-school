// Require our dependencies.
import * as express from "express";
import * as path from "path";
import * as session from "express-session";
import * as passport from "passport";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as chalk from "chalk";
import apiRouter from "./routes/apiRouter";
import loginRegisterRouter from "./routes/loginRegisterRouter";
import {Pool, Client} from "pg";
import vision from "@google-cloud/vision";
import Any = jasmine.Any;
dotenv.config();

// Alias our types
type Application = express.Application;
type Request = express.Request;
type Response = express.Response;

// Database Connection
const pool: Pool = new Pool();
pool.query('SELECT NOW()').then((res, err) => {
    console.log(res, err);
    pool.end();
});

// Google Cloud vision API example usage
const vision_client: vision.ImageAnnotatorClient = new vision.ImageAnnotatorClient();
const fileName: string = "/Users/will/Downloads/20200208_173237.jpg";
vision_client.documentTextDetection(fileName).then((result) => {
    console.log(result);
}).catch((err: Error) => {
    console.log(err);
});



// Create our express app
const app: Application = express();

/* Bring the middleware in for our express app */
// Use the static directory "public" to deliver js, css, html, etc.
app.use(express.static(path.join(__dirname, "../public")));
// Use bodyparser middleware to tell parse HTTP request bodies in JSON. Needed to make HTTP requests in JSON to our API.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Initialize passport middleware for user authentication.
/* TODO: Enable passport local strategy */
// app.use(passport.initialize());
// app.use(passport.session());

// Bring in our routes.
app.use(apiRouter);
app.use(loginRegisterRouter);

// Setup default routes for the server.

// Catchall route for anything not caught in the above routes. Will load the corresponding react page if possible, otherwise will load the react 404 page.
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

// Listen on port 3000, or on process.env.PORT which will be set accordingly by heroku during deployment.
const port: string | number = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(
    chalk.white.bgCyan.bold(
      `Server listening on port ${port} in ${app.settings.env} mode.`
    )
  )
);
