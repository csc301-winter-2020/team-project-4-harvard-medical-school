/**
 * This file represents an express server which listens on port 3000.
 */

// Require our dependencies.
import { Application, Response, Request } from "express";
import * as path from "path";
import * as passport from "passport";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import apiRouter from "./routes/apiRouter";
import loginRegisterRouter from "./routes/loginRegisterRouter";
const express = require("express");
const session = require("express-session");
const { Pool, Client } = require("pg");
const vision = require("@google-cloud/vision");
const aws = require("aws-sdk");
import * as fs from "fs";
dotenv.config();

//Locale Database Connection
const client = new Client({
  "user": "postgres",
  "password": "kang098",
  "host": "localhost",
  "port": 5432,
  "database": "csc301sk"
})
client.connect()

export interface User extends Express.User {
  id: number;
  username: string;
  password: string;
  default_sidebar: boolean;
  default_mode: string;
}

// Create our express app
const app: Application = express();

//Passport Authentication, for login/logout and permissions.
const initializePassport = require("./auth/passport-config");
initializePassport(passport);

//Bring in our authentication check middleware functions.
const { checkAuthenticated, checkAdmin, checkInstructor } = require("./auth/authCheck");

/* Bring the middleware in for our express app */
// Use the static directory "public" to deliver js, css, html, etc.
app.use(express.static(path.join(__dirname, "../public")));
// Use bodyparser middleware to tell parse HTTP request bodies in JSON. Needed to make HTTP requests in JSON to our API.
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport middleware for user authentication.
app.use(passport.initialize());
app.use(passport.session());

// Bring in our routes.
app.use(apiRouter);
app.use(loginRegisterRouter);

// Setup default routes for the server.

// These routes require the user to be logged in to access.
app.get(["/home", "/settings", "/templates", "/patient/*", "/template/*"], checkAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../public/index.html"));
});

// This route requires the user to be an instructor.
app.get("/instructor/*", checkAuthenticated, checkInstructor, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../public/index.html"));
});

//This route requires the user to be an admin.
app.get("/admin/*", checkAuthenticated, checkAdmin, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../public/index.html"));
});

// Catchall route for anything not caught in the above routes. Will load the corresponding react page if possible, otherwise will load the react 404 page.
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

// Listen on port 3000, or on process.env.PORT which will be set accordingly by heroku during deployment.
const port: string | number = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server listening on port ${port} in ${app.settings.env} mode.`)
);
