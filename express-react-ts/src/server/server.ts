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
// import Any = jasmine.Any;
dotenv.config();

// Database Connection
// const pool: Pool = new Pool();
// pool.query('SELECT NOW()').then((res, err) => {
//     console.log(res, err);
//     pool.end();
// });

// Google Cloud vision API example usage
const vision_client: any = new vision.ImageAnnotatorClient();
const fileName: string = "/Users/will/Downloads/20200208_173237.jpg";
// vision_client.documentTextDetection(fileName).then((result) => {
//     console.log(result);
// }).catch((err: Error) => {
//     console.log(err);
// });

// AWS S3 Object Storage Examples
// const s3 = new aws.S3();
// aws.config.update({accessKeyId: process.env.AWSID, secretAccessKey: process.env.AWSKEY});

// const myBucket: string = 'csc301';
// const myKey: string = '20200208_173237.jpg';
// const signedUrlExpireSeconds: number = 100;

// // This limit the time the url is valid
// const url: string = s3.getSignedUrl('getObject', {
//     Bucket: myBucket,
//     Key: myKey,
//     Expires: signedUrlExpireSeconds
// });

// console.log(url);

// Replace your file name here
// const uploadFilename: string = "/Users/will/Desktop/737474.png";
// // Upload File
// fs.readFile(uploadFilename, (err, data) => {
//     if (err) throw err;
//     const params = {
//         Bucket: 'csc301', // pass your bucket name
//         Key: 'examplePhoto', // file will be saved as testBucket/contacts.csv
//         Body: JSON.stringify(data, null, 2)
//     };
//     s3.upload(params, function(s3Err, data) {
//         if (s3Err) throw s3Err;
//         console.log(`File uploaded successfully at ${data.Location}`)
//     });
// });

export interface User extends Express.User {
  id: number;
  username: string;
  password: string;
  default_sidebar: boolean;
  default_mode: string;
}

// Create our express app
const app: Application = express();

//Passport Authentication
const initializePassport = require("./auth/passport-config");
initializePassport(passport);

//Bring in our authentication check middleware functions.
const { checkAuthenticated, checkGuest } = require("./auth/authCheck");

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
app.use(passport.initialize());
app.use(passport.session());

// Bring in our routes.
app.use(apiRouter);
app.use(loginRegisterRouter);

// Setup default routes for the server.

// TODO: for some reason this isnt working!!!!!!!!! it should only let you go to '/' if you are not logged in already
app.get("/", checkGuest, (req, res) => {
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
