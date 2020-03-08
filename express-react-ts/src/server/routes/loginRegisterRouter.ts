import * as express from "express";
import { Router, Request, Response, NextFunction } from "express";
import * as passport from "passport";
import * as path from "path";

const { Pool, Client } = require("pg");
const pool: any = new Pool();

const router: Router = express.Router();

//Auth
const { checkAuthenticated, checkGuest } = require("../auth/authCheck");

/**
 * Route to accept login POST requests.
 * TODO: Redirect to home on success, send a HTTP error code on failure, instead of redirect again to root.
 */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
);

/**
 * TODO: Register a user
 */
router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  const body: any = req.body;
  pool
    .connect()
    .then((client: any) => {
      const query: string =
        "INSERT INTO csc301db.users (username, first_name, last_name, email, password, year, user_type, date_create) VALUES($1, $2, $3, $4, $5, $6, $7, NOW())";
      return client.query(query, [
        body.username,
        body.first_name,
        body.last_name,
        body.email,
        body.password,
        body.year,
        body.user_type,
      ]);
    })
    .then((result: any) => {
      console.log(result);
      res.status(200).json({message: "Successfully registered this user: " + body.username});
    })
    .catch((err:any) => {
      console.log(err);
      res.status(400).json({message: `The following error occurred while registering: ${err}`});
    });
});

/**
 * Logs out a user.
 */
router.get(
  "/logout",
  checkAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`A user has been logged out.`);
    req.logout();
    res.redirect("/");
  }
);

/**
 * TODO: Update user in the user table.
 */
router.patch("/:userId", (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  res.sendStatus(204);
});

export default router;
