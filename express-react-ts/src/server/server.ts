// Require our dependencies.
import * as express from "express";
import apiRouter from "./routes/exampleroute";
import * as path from "path";
import * as session from "express-session";
import * as passport from "passport";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
dotenv.config();

// Alias our types
type Application = express.Application;
type Request = express.Request;
type Response = express.Response;

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
    saveUninitialized: false,
  })
);

// Initialize passport middleware for user authentication.
// app.use(passport.initialize());
// app.use(passport.session());

// Bring in our routes.
app.use(apiRouter);

// Setup default routes for the server.
app.get("/root", (req: Request, res: Response) => {
  res.send("Express example route");
});

// Catchall route for anything not caught in the above routes. Will load the corresponding react page if possible, otherwise will load the react 404 page.
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

// Listen on port 3000, or on process.env.PORT which will be set accordingly by heroku during deployment.
const port: string | number = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server listening on port ${port} in mode ${app.settings.env}`)
);
