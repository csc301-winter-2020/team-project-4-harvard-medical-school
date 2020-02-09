// Require our dependencies.
import * as express from 'express';
import * as session from "express-session";
import * as path from "path";
import * as passport from "passport";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as chalk from "chalk";
import apiRouter from "./routes/apiRouter";
import loginRegisterRouter from "./routes/loginRegisterRouter";
dotenv.config();

// Alias our types
type Application = express.Application;
type Request = express.Request;
type Response = express.Response;

export interface User extends Express.User {
  id: number;
  username: string;
  password: string;
}

// Create our express app
const app: Application = express();

//Passport Authentication
const initializePassport = require('./auth/passport-config');
initializePassport(passport);

//Bring in our authentication check middleware functions.
const { checkAuthenticated, checkGuest } = require('./auth/authCheck');

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
app.use(passport.initialize());
app.use(passport.session());

// Bring in our routes.
app.use(apiRouter);
app.use(loginRegisterRouter);

// Setup default routes for the server.

// TODO: for some reason this isnt working!!!!!!!!! it should only let you go to '/' if you are not logged in already
app.get('/', checkGuest, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../public/index.html"))
});

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
